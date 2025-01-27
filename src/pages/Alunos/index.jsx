import React from 'react';
import { get } from 'lodash';
import {
    FaUserCircle,
    FaEdit,
    FaWindowClose,
    FaExclamation,
} from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import history from '../../services/history';
import { TextContainer, AlunoContainer, ProfilePicture } from './styled';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

export default function Alunos() {
    const [alunos, setAlunos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                const response = await axios.get('/alunos');
                setAlunos(response.data);
                setIsLoading(false);
            } catch (err) {
                const status = get(err, 'response.status', 0);
                if (status === 401) {
                    toast.error('Você precisa fazer login.');
                    history.push('/login');
                }
            }
        }

        getData();
    }, []);

    const handleInput = async (e) => {
        const Input = e.target;
        try {
            setIsLoading(true);
            const response = await axios.post('/alunos/pesquisa', {
                pesquisa: Input.value,
            });
            console.log(response);
            setAlunos(response.data);
            setIsLoading(false);
        } catch (err) {
            const status = get(err, 'response.status', 0);
            if (status === 401) {
                toast.error('Você precisa fazer login.');
                history.push('/login');
            }
        }
    };

    const handleDeleteAsk = (e) => {
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute('display', 'block');
        e.currentTarget.remove();
    };

    const handleDelete = async (e, id, index) => {
        try {
            setIsLoading(true);
            await axios.delete(`/alunos/${id}`);
            const novosAlunos = [...alunos];
            novosAlunos.splice(index, 1);
            setAlunos(novosAlunos);
            setIsLoading(false);
        } catch (err) {
            const status = get(err, 'response.status', 0);
            if (status === 401) {
                toast.error('Você precisa fazer login.');
            }
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Loading isLoading={isLoading} />

            <TextContainer className="text-container">
                <h1>Alunos</h1>
                <div className="rightContainer">
                    <input type="text" onChange={handleInput} />
                    <Link to={'/aluno'}>Adicionar Aluno</Link>
                </div>
            </TextContainer>
            <AlunoContainer>
                {alunos.map((aluno, index) => (
                    <div className="aluno" key={String(aluno.id)}>
                        <ProfilePicture>
                            {get(aluno, 'fotos[0].url', false) ? (
                                <img src={aluno.fotos[0].url} alt="" />
                            ) : (
                                <FaUserCircle size={36} />
                            )}
                        </ProfilePicture>

                        <div className="fullname">
                            <span>{aluno.nome}</span>
                            <span>{aluno.sobrenome}</span>
                        </div>
                        <span>{aluno.email}</span>

                        <div className="linkContainer">
                            <Link to={`/aluno/${aluno.id}/edit`}>
                                <FaEdit />
                            </Link>
                            <Link
                                onClick={handleDeleteAsk}
                                to={`/aluno/${aluno.id}/delete`}
                            >
                                <FaWindowClose />
                            </Link>
                            <FaExclamation
                                onClick={(e) =>
                                    handleDelete(e, aluno.id, index)
                                }
                                display={'none'}
                                cursor={'pointer'}
                            />
                        </div>
                    </div>
                ))}
            </AlunoContainer>
        </Container>
    );
}
