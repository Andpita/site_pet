import styled from 'styled-components';

export const Title = styled.h1`
  small {
    color: yellow;
    margin-left: 15px;
  }

  color: ${(props) => (props.isRed ? 'red' : 'blue')};
  background-color: paleturquoise;
`;

export const Paragrago = styled.p`
  font-size: 50px
`;
