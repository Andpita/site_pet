import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as color from '../../config/colors';
import { BigHead } from '@bigheads/core';

export const AlunoContainer = styled.div`
margin-top: 20px;

  ul {
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

  ul + ul {
    border-top: 2px solid gray;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0px 5px;
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
