import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
  FaUndo,
  FaTrashAlt,
  FaTrash,
  FaPlus,
} from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyle';
import axios from '../../services/axios';
import history from '../../services/history';
import { AlunoContainer, ProfilePicture, NovoAluno } from './styled';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import { BigHead } from '@bigheads/core';

const Example = () => (
  <BigHead
    accessory="shades"
    body="chest"
    circleColor="blue"
    clothing="tankTop"
    clothingColor="black"
    eyebrows="angry"
    eyes="wink"
    facialHair="mediumBeard"
    graphic="vue"
    hair="short"
    hairColor="black"
    hat="none"
    hatColor="green"
    lashes="false"
    lipColor="purple"
    mask="true"
    faceMask="true"
    mouth="open"
    skinTone="brown"
  />
);

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
    const targetLink = e.currentTarget.firstChild;

    const undo = e.currentTarget.nextSibling;
    const trash = undo.nextSibling;

    undo.setAttribute('display', 'block');
    trash.setAttribute('display', 'block');

    targetLink.setAttribute('display', 'none');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    const cancel = e.target.previousSibling.firstChild;

    cancel.setAttribute('display', 'block');
    const target = e.target;

    const trash = target.nextSibling;

    trash.setAttribute('display', 'none');
    target.setAttribute('display', 'none');
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

      <h1>Mascotes Page</h1>

      <NovoAluno to="/aluno/">
        <FaPlus /> Novo Aluno
      </NovoAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <ul key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img crossOrigin="" src={aluno.Fotos[0].url} alt="" />
              ) : (
                <BigHead width={60} height={50} />
              )}
            </ProfilePicture>

            <span className="nomes">{aluno.nome}</span>
            <span className="emails">{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit />
            </Link>

            {isLoggedIn && (
              <Link
                to={`/aluno/${aluno.id}/delete`}
                onClick={handleDelete}
                display="block"
              >
                <FaWindowClose />
              </Link>
            )}

            {isLoggedIn && (
              <FaUndo onClick={handleCancel} display="none" cursor="pointer" />
            )}

            {isLoggedIn && (
              <FaTrashAlt
                onClick={(e) => handleConfirm(e, aluno.id, index)}
                display="none"
                cursor="pointer"
              />
            )}
          </ul>
        ))}
      </AlunoContainer>
    </Container>
  );
}
