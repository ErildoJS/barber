import styled from 'styled-components'
import {darken} from 'polished'

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;/**logo center */

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px; /** distancia da logo */

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #FFF;
      margin: 0 0 10px;

      &::placeholder {/** texto interno do input */
        color: rgba(255,255,255,0.7);
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: backgroun 0.2s;

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