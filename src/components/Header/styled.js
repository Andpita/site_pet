import styled from 'styled-components';
import { color2 } from '../../config/colors';

export const Nav = styled.nav`
  background-color: ${color2};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
    background-color: ${color2};
  }
`;
