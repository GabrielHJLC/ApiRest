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
import { TextContainer, AlunoContainer, ProfilePicture } from './styled';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

export default function Alunos() {
    const [alunos, setAlunos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const response = await axios.get('/alunos');
            setAlunos(response.data);
            setIsLoading(false);
        }

        getData();
    }, []);

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
                <Link to={'/aluno'}>Adicionar Aluno</Link>
            </TextContainer>
            <AlunoContainer>
                {alunos.map((aluno, index) => (
                    <div key={String(aluno.id)}>
                        <ProfilePicture>
                            {get(aluno, 'fotos[0].url', false) ? (
                                <img src={aluno.fotos[0].url} alt="" />
                            ) : (
                                <FaUserCircle size={36} />
                            )}
                        </ProfilePicture>

                        <span>{aluno.nome}</span>
                        <span>{aluno.email}</span>

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
                            onClick={(e) => handleDelete(e, aluno.id, index)}
                            display={'none'}
                            cursor={'pointer'}
                        />
                    </div>
                ))}
            </AlunoContainer>
        </Container>
    );
}
