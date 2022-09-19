import styled from 'styled-components';

export const Container = styled.div`
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
z-index: 1;
display: flex;
justify-content: center;
align-items: center;
color: whitesmoke;
font-size: 15px;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 30px;
  }

  img {
    width: 40px;
    height: 40px;
  }

  span {
    z-index: 2;
  }
`;
