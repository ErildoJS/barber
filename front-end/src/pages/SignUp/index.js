import React from 'react';
import {Link} from 'react-router-dom'
import * as Yup from 'yup'

import {Form, Input} from '@rocketseat/unform'

import logo from '~/assets/logo.svg'

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatorio'),
  email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatorio'),
  password: Yup.string().min(6, 'No minimo 6 caracteres').required('A senha é obrigatoria')
})

function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data)
  }
  return (
    <>
      <img src={logo} alt="Gobarber"/>

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo"/>
        <Input name="email" type="email" placeholder="Seu e-mail"/>
        <Input name="password" type="password" placeholder="Sua senha secreta"/>

        <button type="submit">Criar conta</button>
        <Link to="/">já tenho login</Link>
      </Form>
    </>
  )
}

export default SignUp;
