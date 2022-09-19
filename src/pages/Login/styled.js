import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
display: flex;
flex-direction: column;
margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    max-width: 70%;
    border-radius: 5px;
    margin-top: 5px;

    &:focus {
    border: 1px solid ${colors.color1};
  }

}

`;
