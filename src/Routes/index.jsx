import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Register from '../pages/Register';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import About from '../pages/About';
import Fotos from '../pages/Fotos';

export default function Routes() {
    return (
        <Switch>
            <MyRoute exact path="/" component={Alunos} isClosed />
            <MyRoute exact path="/about" component={About} isClosed={false} />
            <MyRoute exact path="/aluno/:id/edit" component={Aluno} isClosed />
            <MyRoute exact path="/aluno/" component={Aluno} isClosed />
            <MyRoute exact path="/fotos/:id" component={Fotos} isClosed />
            <MyRoute exact path="/login" component={Login} isClosed={false} />
            <MyRoute
                exact
                path="/register"
                component={Register}
                isClosed={false}
            />
            <MyRoute path="*" component={Page404} isClosed={false} />
        </Switch>
    );
}
