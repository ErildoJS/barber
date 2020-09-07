import React from 'react';
import Proptypes from 'prop-types'
import { Wrapper, Content } from './styles';

//children - sao todo conteudo colocado dentro do componente
export default function AuthLayout({children}) {
  return ( 
  <Wrapper>
    <Content>
      {children}
    </Content>
  </Wrapper>
  )
}

 AuthLayout.propTypes = {
     children: Proptypes.element.isRequired
 }