import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as color from '../../config/colors';

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
  border: 2px solid ${color.color1};
  border-radius: 6px;
  max-width: 150px;
  height: 40px;
  margin: 15px 5px 5px;
  padding: 5px 10px 5px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  background-color: lightblue;

  svg {
    font-size: 16px;
    margin: 0 0 0 7px;
  }
`;
