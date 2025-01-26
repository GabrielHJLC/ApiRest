import React from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/Auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.Auth.isLoading);
    const prevPath = get(props, 'location.state.prevPath', '/');

    const togglePassword = () => {
        const passwordInput = document.getElementById('passwordInput');
        const eye = document.querySelector('.l1');
        const eyeSlash = document.querySelector('.l2');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eye.classList.remove('actived-icon');
            eyeSlash.classList.add('actived-icon');
        } else {
            passwordInput.type = 'password';
            eye.classList.add('actived-icon');
            eyeSlash.classList.remove('actived-icon');
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        let formError = false;

        if (!isEmail(email)) {
            formError = true;
            toast.error('E-mail inválido');
        }

        if (password.length < 6 || password.length > 50) {
            formError = true;
            toast.error('Senha inválida');
        }

        if (formError) return;

        dispatch(actions.loginRequest({ email, password, prevPath }));
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />

            <h1>Login</h1>

            <Form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    E-mail:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu e-mail"
                    />
                </label>
                <label className="password-container" htmlFor="Password">
                    Senha:
                    <input
                        type="password"
                        id="passwordInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Sua senha"
                    />
                    <FaEye
                        onClick={togglePassword}
                        className="eyeIcon l1 actived-icon"
                        cursor={'pointer'}
                        display={'inline'}
                    />
                    <FaEyeSlash
                        onClick={togglePassword}
                        className="eyeIcon l2"
                        cursor={'Pointer'}
                        display={'none'}
                    />
                </label>
                <button type="submit">Fazer login</button>
            </Form>
        </Container>
    );
}
