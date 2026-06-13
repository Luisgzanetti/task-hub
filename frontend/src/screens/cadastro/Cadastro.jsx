import { useState } from 'react';
import '../../assets/style.css';
import goBackImg from '../../assets/Go Back.png';
import invisibleImg from '../../assets/Invisible.png';
import { cadastrarUsuario } from '../../services/api';

export default function Cadastro({ setPagina }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Formata o CPF
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 9) {
      value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
    }
    setCpf(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // Validações básicas de frontend
    if (!nome || !email || !cpf || !dataNascimento || !senha || !confirmarSenha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas digitadas não coincidem.');
      return;
    }

    if (senha.length < 6 || senha.length > 20) {
      setErro('A senha deve ter entre 6 e 20 caracteres.');
      return;
    }

    const cleanedCpf = cpf.replace(/\D/g, '');
    if (cleanedCpf.length !== 11) {
      setErro('O CPF deve conter exatamente 11 dígitos.');
      return;
    }

    setCarregando(true);

    try {
      // Envia os dados estruturados para o backend
      await cadastrarUsuario({
        nome,
        email,
        cpf: cleanedCpf,
        data_nascimento: dataNascimento,
        senha,
        confirmar_senha: confirmarSenha
      });

      setSucesso('Conta criada com sucesso! Redirecionando para o login...');

      // Limpa os campos após sucesso
      setNome('');
      setEmail('');
      setCpf('');
      setDataNascimento('');
      setSenha('');
      setConfirmarSenha('');

      // Aguarda 2 segundos e redireciona para a página de login
      setTimeout(() => {
        setPagina('login');
      }, 2000);

    } catch (err) {
      setErro(err.message || 'Erro ao realizar o cadastro. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="fundo-bege">
      <main className="tela-app">
        <div className="cabecalho">
          <a className="seta-voltar" onClick={() => setPagina("inicio")}>
            <img src={goBackImg} alt="Seta de voltar" />
          </a>
        </div>
        <h1>Cadastro</h1>

        {/* Alerta de erro com o layout .caixa-aviso do projeto */}
        {erro && (
          <div className="caixa-aviso">
            <div className="aviso-topo">Aviso</div>
            <div className="aviso-corpo">{erro}</div>
          </div>
        )}

        {/* Alerta de sucesso similar ao caixa-aviso, usando verde no cabeçalho */}
        {sucesso && (
          <div className="caixa-aviso">
            <div className="aviso-topo" style={{ backgroundColor: '#2ec4b6' }}>Sucesso</div>
            <div className="aviso-corpo">{sucesso}</div>
          </div>
        )}

        <form className="formulario" onSubmit={handleSubmit}>
          <div className="digitar">
            <label>Nome de Usuário</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="digitar">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="digitar">
            <label>CPF</label>
            <input
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleCpfChange}
              required
            />
          </div>

          <div className="digitar">
            <label>Data de Nascimento</label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>

          <div className="digitar">
            <label>Defina uma Senha</label>
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha de 6 a 20 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <img
              src={invisibleImg}
              alt="Mostrar Senha"
              className="icone-olho"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            />
          </div>

          <div className="digitar">
            <label>Confirmar a Senha</label>
            <input
              type={mostrarConfirmarSenha ? "text" : "password"}
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
            <img
              src={invisibleImg}
              alt="Mostrar Senha"
              className="icone-olho"
              onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
            />
          </div>

          <button
            type="submit"
            className="botao-logar botao-cadastro"
            disabled={carregando}
          >
            {carregando ? 'Criando Conta...' : 'Criar Conta'}
          </button>
        </form>
      </main>

    </div>
  );
}
