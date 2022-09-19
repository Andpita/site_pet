import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyle';
import axios from '../../services/axios';
import history from '../../services/history';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

export default function Alunos() {
  const [alunos, setAlunos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    // console.log(e.currentTarget); Link
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleConfirm = async (e, id, index) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);

      setIsLoading(false);

      toast.success('Aluno apagado com sucesso');
      history.push('/');
    } catch (e) {
      const errors = get(e, 'response.data.errors', []);
      const status = get(e, 'response.status', 0);
      errors.map((error) => toast.error('error'));

      if (status === 401) {
        toast.error('Você precisa fazer login novamente.');
      } else {
        toast.error('Erro desconhecido.');
      }
    }
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos Page</h1>

      <NovoAluno to="/aluno/">Novo Aluno</NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img crossOrigin="" src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={40} />
              )}
            </ProfilePicture>

            <span className="nomes">{aluno.nome}</span>
            <span className="emails">{aluno.email}</span>

            {isLoggedIn && (
              <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit />
              </Link>
            )}

            {isLoggedIn && (
              <Link to={`/aluno/${aluno.id}/delete`} onClick={handleDelete}>
                <FaWindowClose />
              </Link>
            )}

            {isLoggedIn && (
              <FaExclamation
                onClick={(e) => handleConfirm(e, aluno.id, index)}
                display="none"
                cursor="pointer"
              />
            )}
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
