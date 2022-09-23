import React from 'react';

import { Container } from '../../styles/GlobalStyle';
import Loading from '../../components/Loading';
import { Form } from './styled';
import { get } from 'lodash';
import axios from '../../services/axios';
import history from '../../services/axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const id = get(match, 'params.id', '');
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);
  const [foto, setFoto] = React.useState('');

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error('Erro ao obter imagem.');
        history.push('/');
      }
    }
    getData();
  }, [id]);

  const handleChange = async (e) => {
    const fotoFile = e.target.files[0];
    const fotoURL = URL.createObjectURL(fotoFile);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', fotoFile);

    try {
      setIsLoading(true);
      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'miltipart/form-data',
        },
      });
      toast.success('Foto enviada com sucesso!');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);

      errors.map((error) => toast.error(error));

      toast.error('Erro ao enviar foto');

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Fotos Page</h1>

      <Form>
        <label htmlFor="foto">
          {foto ? (
            <img crossOrigin="" src={foto} alt="foto" />
          ) : (
            'Selecionar foto'
          )}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
