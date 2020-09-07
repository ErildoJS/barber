import styled from 'styled-components';
import {darken} from 'polished'

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;/**distancia da img */

    input {
      background: rgba(0 ,0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #FFF;
      margin: 0 0 10px;

      &::placeholder {/**texto de dentro do input */
        color: rgba(225,225,225,0.7)
      }
    }

    span {/**o texto de erro do Yup */
      color: #fb6f91;
      align-self: flex-start;/**fica no lado esquerdo no inicio */
      margin: 0 0 10px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #FFF;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#3b9eff')}
      }
    }

    a {
      color: #FFF;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`


