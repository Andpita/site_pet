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

export default function Users() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/users');
      setUsers(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos Page</h1>

      <AlunoContainer>
        {users.map((user, index) => (
          <div key={String(user.id)}>
            <ProfilePicture>
              {get(user, 'Fotos[0].url', false) ? (
                <img crossOrigin="" src={user.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={40} />
              )}
            </ProfilePicture>

            <span className="nomes">{user.nome}</span>
            <span className="emails">{user.id}</span>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
