import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from '../../store/modules/Auth/actions';
import history from '../../services/history';
import axios from '../../services/axios';
import { NavBar } from './styled';
import Loading from '../Loading';

export default function Header() {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.Auth.token);

    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
    const username = useSelector((state) => state.Auth.user.nome);

    const [isLoading, setIsloading] = React.useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(actions.loginFailure());
        history.push('/');
    };

    const handleDelete = (e) => {
        e.preventDefault();
        const confirmButton = e.currentTarget.nextSibling;
        confirmButton.style.display = 'block';
        e.currentTarget.remove();
    };

    async function handleDeleteAccount(e) {
        setIsloading(true);
        e.preventDefault();
        try {
            await axios.delete('/users/', {
                token,
            });
            toast.success('Conta deletada com sucesso!');
            setIsloading(false);
            dispatch(actions.loginFailure());
            history('/login');
        } catch (err) {
            setIsloading(false);
            const errors = get(err, 'response.data.errors', []);

            errors.map((error) => toast.error(error));
        }
    }

    return (
        <NavBar>
            <Loading isLoading={isLoading} />
            <div className="start-Content">
                <Link to="/">API REST</Link>
            </div>

            <div className="center-Content">
                <Link to="/">Home</Link>
            </div>

            {isLoggedIn ? (
                <div className="end-Content">
                    <div className="dropdown">
                        <button className="dropbtn">
                            <FaCaretDown />
                            {username}
                            <FaUserCircle size={24} />
                        </button>
                        <div className="dropdown-content">
                            <Link to="/register">Editar conta</Link>
                            <Link to="/logout" onClick={handleLogout}>
                                Sair da conta
                            </Link>
                            <Link to="/delete" onClick={handleDelete}>
                                Excluir conta
                            </Link>
                            <Link
                                className="confirm-button"
                                to="/delete"
                                onClick={handleDeleteAccount}
                            >
                                Confirmar
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="end-Content">
                    <Link to="/register">Criar conta</Link>
                    <Link to="/login">Entrar</Link>
                </div>
            )}
        </NavBar>
    );
}
