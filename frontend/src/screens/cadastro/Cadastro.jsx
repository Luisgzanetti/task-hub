import '../../assets/style.css';
import goBackImg from '../../assets/Go Back.png'; 
import invisibleImg from '../../assets/Invisible.png';

export default function Cadastro({ setPagina }) {
  return (
    <div className="fundo-bege">
        <main className="tela-app">
            <div className="cabecalho">
                <a className="seta-voltar" onClick={() => setPagina("inicio")}>
                    <img src={goBackImg} alt="Seta de voltar" />
                </a>
            </div>
            <h1>Cadastro</h1>

            <form className="formulario">
                <div className="digitar">
                <label>Nome de Usuário</label>
                <input type="text" placeholder="****************" />
                </div>

                <div className="digitar">
                <label>E-mail</label>
                <input type="text" placeholder="****************" />
                </div>

                <div className="digitar">
                <label>CPF</label>
                <input type="text" placeholder="****************" />
                </div>

                <div className="digitar">
                <label>Data de Nascimento</label>
                <input type="text" placeholder="****************" />
                </div>

                <div className="digitar">
                <label>Defina uma Senha</label>
                <input type="password" placeholder="****************" />
                <img
                    src={invisibleImg} 
                    alt="Mostrar Senha"
                    className="icone-olho"
                />
                </div>

                <div className="digitar">
                <label>Confirmar a Senha</label>
                <input type="password" placeholder="****************" />
                <img
                    src={invisibleImg} 
                    alt="Mostrar Senha"
                    className="icone-olho"
                />
                </div>

                <a className="botao-logar botao-cadastro" onClick={() => setPagina("login")}>Criar Conta</a>
            </form>
        </main>
            
    </div>
    );
}
