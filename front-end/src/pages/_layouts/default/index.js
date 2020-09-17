import React from 'react';
import PropTypes from 'prop-types'

import { Wrapper } from './styles';

export default function DefaultLayout({children}) {// children - todos components que vem como filho do authLayout
return <Wrapper>{children}</Wrapper>;
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired// element para mandar assim <children />
}
