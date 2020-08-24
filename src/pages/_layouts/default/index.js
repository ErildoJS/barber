import React from 'react';
import Proptypes from 'prop-types'
import { Wrapper } from './styles';

//children - sao todo conteudo colocado dentro do componente
export default function DefaultLayout({children}) {
  return ( 
  <Wrapper>
      {children}
  </Wrapper>
  )
}

 DefaultLayout.propTypes = {
     children: Proptypes.element.isRequired
 }