import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt } from 'validator';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/Auth/actions';

export default function Aluno({ match }) {
    const id = get(match, 'params.id', '');
    const [nome, setNome] = React.useState('');
    const [sobrenome, setSobrenome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [idade, setIdade] = React.useState('');
    const [foto, setFoto] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!id) return;

        async function getData() {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`/alunos/${id}`);
                const Foto = get(data, 'fotos[0].url', '');

                setNome(data.nome);
                setSobrenome(data.sobrenome);
                setEmail(data.email);
                setIdade(data.idade);

                setFoto(Foto);

                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                const status = get(err, 'response.status', 0);
                const errors = get(err, 'response.data.errors', []);

                if (status === 400) {
                    errors.map((error) => toast.error(error));
                    history.push('/');
                }
            }
        }

        getData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = false;

        if (nome.length < 3 || nome.length > 255) {
            toast.error('Nome deve ter entre 3 e 255 caracteres.');
            formErrors = true;
        }

        if (sobrenome.length < 3 || sobrenome.length > 255) {
            toast.error('Sobrenome deve ter entre 3 e 255 caracteres.');
            formErrors = true;
        }

        if (!isEmail(email)) {
            toast.error('Email inválido.');
            formErrors = true;
        }

        if (!isInt(String(idade))) {
            toast.error('idade deve ser um número inteiro.');
            formErrors = true;
        }

        if (formErrors) return;

        try {
            setIsLoading(true);

            if (id) {
                await axios.put(`/alunos/update/${id}`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                });

                toast.success('Aluno(a) editado(a) com sucesso!');
                history.push('/');
            } else {
                await axios.post('/alunos/store', {
                    nome,
                    sobrenome,
                    email,
                    idade,
                });

                toast.success('Aluno(a) criado(a) com sucesso!');
                history.push('/');
            }

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            const status = get(err, 'response.status', 0);
            const errors = get(err, 'response.data.errors', []);
            console.log(err);

            if (errors.length > 0) {
                errors.map((error) => toast.error(error));
            } else {
                toast.error('Ocorreu um erro, tente novamente mais tarde.');
            }

            if (status === 401) {
                dispatch(actions.loginFailure());
            }
        }
    };

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <Title>{id ? 'Editar aluno' : 'Adicionar aluno'}</Title>

            {id && (
                <ProfilePicture>
                    {foto ? (
                        <img src={foto} alt={nome} />
                    ) : (
                        <FaUserCircle size={150} />
                    )}
                    <Link to={`/fotos/${id}`}>
                        <FaEdit size={20} />
                    </Link>
                </ProfilePicture>
            )}

            <Form onSubmit={handleSubmit}>
                <label htmlFor="nome">
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome"
                    />
                </label>
                <label htmlFor="Sobrenome">
                    Sobrenome:
                    <input
                        type="text"
                        value={sobrenome}
                        onChange={(e) => setSobrenome(e.target.value)}
                        placeholder="Sobrenome"
                    />
                </label>
                <label htmlFor="email">
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </label>
                <label htmlFor="Idade">
                    Idade:
                    <input
                        type="number"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                        placeholder="Idade"
                    />
                </label>
                <button type="submit">{id ? 'Editar' : 'Adicionar'}</button>
            </Form>
        </Container>
    );
}

Aluno.propTypes = {
    match: PropTypes.shape({}).isRequired,
};
