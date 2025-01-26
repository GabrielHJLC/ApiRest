import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/Auth/actions';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Fotos({ match }) {
    const id = get(match, 'params.id', '');
    const [isLoading, setIsLoading] = React.useState(false);
    const [foto, setFoto] = React.useState('');

    const dispatch = useDispatch();

    React.useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`/alunos/${id}`);
                setFoto(get(data, 'fotos[0].url', ''));
                setIsLoading(false);
            } catch {
                toast.error('Erro ao obter imagem');
                setIsLoading(false);
                history.push('/');
            }
        };
        getData();
    }, [id]);

    const changeImage = async (e) => {
        const foto = e.target.files[0];
        const fotoURL = URL.createObjectURL(foto);

        setFoto(fotoURL);

        const formData = new FormData();

        formData.append('aluno_id', id);
        formData.append('foto', foto);

        try {
            setIsLoading(true);

            await axios.post('/fotos/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Foto enviada com sucesso!');

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);

            const status = get(err, 'response.status', 0);

            if (status === 401) dispatch(actions.loginFailure());

            toast.error('Erro ao enviar a foto');
        }
    };

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <Title>Fotos</Title>

            <Form>
                <label htmlFor="foto">
                    {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
                    <input type="file" id="foto" onChange={changeImage} />
                </label>
                <Link to={`/aluno/${id}/edit`}>Voltar</Link>
            </Form>
        </Container>
    );
}

Fotos.propTypes = {
    match: PropTypes.shape({}).isRequired,
};
