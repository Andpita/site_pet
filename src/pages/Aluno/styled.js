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
    border-radius: 5px;
    margin-top: 5px;

    &:focus {
     border: 1px solid ${colors.color1};
    }
  }
`;

export const Picture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 0 10px 0;


  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: white;
    background-color: ${colors.color1};
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }

  svg {
    width: 220px;
  }

`;
