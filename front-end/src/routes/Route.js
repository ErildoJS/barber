import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Proptypes from 'prop-types'

import AuthLayout from '../pages/_layouts/auth'
import DefaultLayout from '../pages/_layouts/default'

import store from '../store'
export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const signed = store.getState().auth.signed

    if(!signed && isPrivate)  {//se o user nao extiver logado e o isPrivate for true, vou redirecionar pro Login
        return <Redirect to="/"/>
    }

    if(signed && !isPrivate) { //se estiver logoado e a rota nao ser privada , vou redirecionar pro dashboard
        return <Redirect to="/dashboard"/>
    }

    const Layout = signed ? DefaultLayout : AuthLayout

    //se ele ta logado, e esta acessando uma rota privada eu vou ...
    return (
        <Route 
        {...rest}
        render={props => (
            <Layout>
                <Component {...props}/>
            </Layout>
        )}
        />
    )
}

RouteWrapper.propTypes = {
    isPrivate: Proptypes.bool,
    component: Proptypes.oneOfType([Proptypes.element, Proptypes.func]).isRequired
}

RouteWrapper.defaultProps = {
    isPrivate: false,
}