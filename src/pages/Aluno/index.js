import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmail, isFloat, isInt } from 'validator';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { Container } from '../../styles/GlobalStyle';
import { Form } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const id = get(match, 'params.id', '');
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [sobrenome, setSobrenome] = React.useState('');
  const [idade, setIdade] = React.useState('');
  const [peso, setPeso] = React.useState('');
  const [altura, setAltura] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();

  if (id === undefined) id = 0;

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setIdade(data.idade);
        setEmail(data.email);
        setAltura(data.altura);
        setPeso(data.peso);

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        const status = get(e, 'response.status', 0);
        const errors = get(e, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 4 || nome.length > 30) {
      formErrors = true;
      toast.error('Nome precisa ter entre 4 e 30 caracteres.');
    }

    if (sobrenome.length < 4 || sobrenome.length > 30) {
      formErrors = true;
      toast.error('Sobrenome precisa ter entre 4 e 30 caracteres.');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (!isInt(String(idade))) {
      formErrors = true;
      toast.error('Idade precisa ser um número inteiro.');
    }

    if (!isFloat(String(peso))) {
      formErrors = true;
      toast.error('Peso precisa ser um número.');
    }

    if (!isFloat(String(altura))) {
      formErrors = true;
      toast.error('Altura precisa ser um número.');
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado(a) com sucesso!');
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) criado(a) com sucesso!');
        history.push(`/aluno/${data.id}/edit`);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      errors.map((error) => toast.error(error));

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar Aluno' : 'Criar Aluno'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            name="nome"
            id="nome"
            value={nome}
            placeholder="Seu nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label htmlFor="sobrenome">
          Sobrenome:
          <input
            type="text"
            name="sobrenome"
            id="sobrenome"
            value={sobrenome}
            placeholder="Seu sobrenome"
            onChange={(e) => setSobrenome(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Seu email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="idade">
          Idade:
          <input
            type="number"
            name="idade"
            id="idade"
            value={idade}
            placeholder="Seu idade"
            onChange={(e) => setIdade(e.target.value)}
          />
        </label>

        <label htmlFor="peso">
          Peso:
          <input
            type="number"
            name="peso"
            id="peso"
            value={peso}
            placeholder="Seu peso"
            onChange={(e) => setPeso(e.target.value)}
          />
        </label>

        <label htmlFor="altura">
          Altura:
          <input
            type="number"
            name="altura"
            id="altura"
            value={altura}
            placeholder="Seu altura"
            onChange={(e) => setAltura(e.target.value)}
          />
        </label>

        <button type="Submit">{!id ? 'Criar Usuário' : 'Salvar Dados'}</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
