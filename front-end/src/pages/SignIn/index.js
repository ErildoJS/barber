import React from 'react';
import {useDispatch} from 'react-redux'

import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import {Form, Input} from '@rocketseat/unform'
// import { Container } from './styles';
import * as Yup from 'yup'
import {signInRequest} from '../../store/modules/auth/actions'

const schema = Yup.object().shape({
  email: Yup.string().email('Insira um email válido').required('O email é obrigatorio'),
  password: Yup.string().required('A senha é obrigatoria')
})


export default function SignIn() {
  const dispatch = useDispatch()
  function handleSubmit({email, password}) {
    dispatch(signInRequest(email ,password))
  }

  return (
    <>
      <img src={logo} alt="Gobarber"/>

      <Form schema={schema} onClick={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu E-mail"/>
        <Input name="password" type="password" placeholder="Sua senha secreta"/>

        <button type="submit">
          Acessar
        </button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
