import React from 'react';
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Input} from '@rocketseat/unform'
import * as Yup from 'yup'
import logo from '~/assets/logo.svg'

import {signInRequest} from '../../store/modules/auth/actions'

const schema = Yup.object().shape({
  email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatorio'),
  password: Yup.string().required('A senha é obrigatoria')
})

function SignIn() {
  const dispatch = useDispatch()
  function handleSubmit({email, password}) {
    dispatch(signInRequest(email, password))
  }
  return (
    <>
      <img src={logo} alt="Gobarber"/>

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail"/>
        <Input name="password" type="password" placeholder="Sua senha secreta"/>

        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  )
}

export default SignIn;
