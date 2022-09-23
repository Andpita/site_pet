import styled from 'styled-components';
import { color1 } from '../../config/colors';

export const Form = styled.form`

  label {
    width: 180px;
    height: 180px;
    background-color: ${color1};
    border: 5px dashed black;
    display: flex;
    margin: 20px auto;
    cursor: pointer;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    color: white;
    overflow: hidden;

    img {
      width: 180px;
      height: 180px;
    }
  }

  input {
    display: none;
  }
`;
