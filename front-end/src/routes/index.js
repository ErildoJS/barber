import React from 'react'
import {Switch, BrowserRouter} from 'react-router-dom'
import Route from './Route'//onde estao as rotas privadas, toda config

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'


export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={SignIn}/>
            <Route path="/register" exact component={SignUp}/>

            <Route path="/dashboard" exact component={Dashboard} isPrivate/>
            <Route path="/profile" exact component={Profile} isPrivate/>
        </Switch>
        </BrowserRouter>
    )
}