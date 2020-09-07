import React from 'react';
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import {Form, Input} from '@rocketseat/unform'
import * as Yup from 'yup'
//import {Form, Input} from '@unform/web'

const schema = Yup.object().shape({//validacoes - passo 2
  name: Yup.string().required('O nome é obrigatorio'),
  email: Yup.string().email('Insira um email válido').required('O email é obrigatorio'),
  password: Yup.string().min(6, 'No minimo 6 caracteres').required('A senha é obrigatoria')
})

function SignUp() {
  function handleSubmit(data) {
    
  }

  return (
    <>
      <img src={logo} alt="Gobarber"/>

      <Form shema={schema} onClick={handleSubmit}>{/**validacoes - passo 3 */}
        <Input name="name"  placeholder="Nome completo"/>
        <Input name="email" type="email" placeholder="Seu E-mail"/>
        <Input name="password" type="password" placeholder="Sua senha secreta"/>

        <button type="submit">
          Criar conta
        </button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}

export default SignUp;