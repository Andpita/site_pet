import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunoContainer = styled.div`
margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    padding: 3px 0;

    justify-content: space-around;

    .emails {
      min-width: 50%;
    }

    .nomes {
      min-width: 20%;
    }
  }

  div + div {
    border-top: 2px solid gray;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

export const NovoAluno = styled(Link)`
  display: block;
  padding: 20px 0 10px;
`;
