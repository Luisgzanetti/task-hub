import '../../assets/style.css';
import { useState } from "react";
import goBackImg from '../../assets/Go Back.png'; 
import invisibleImg from '../../assets/Invisible.png';

export default function RecuperarSenha({ setPagina }) {
    const [etapa, setEtapa] = useState("email");

    if (etapa === "email"){
        return (
            <div className="fundo-bege">
                <main className="tela-app">
                    <div className="cabecalho">
                        <a  className="seta-voltar" onClick={() => setPagina("login")}>
                        <img src={goBackImg} alt="Seta de voltar"/> </a>
                    </div>

                    <h1>Recuperar Senha</h1>

                    <form className="formulario">
                        <div className="digitar">
                        <label>E-mail</label>
                        <input type="text" placeholder="****************" />
                        </div>

                        <div className="digitar">
                        <label>Código enviado por e-mail</label>
                        <input type="text" placeholder="****************" />
                        </div>

                        <a className="botao-logar botao-cadastro" onClick={() => setEtapa("nova-senha")}>
                        Confirmar
                        </a>
                    </form>
                </main>
            </div>
        )
    }

    if (etapa === "nova-senha"){
        return (
            <div className="fundo-bege">
                <main className="tela-app">
                <div className="cabecalho">
                    <a className="seta-voltar" onClick={() => setEtapa("email")}>
                    <img src={goBackImg} alt="Seta de voltar"/> 
                    </a>
                </div>

                <h1>Recuperar Senha</h1>

                <form className="formulario">
                    <div className="digitar">
                    <label>Senha Nova</label>
                    <input type="password" placeholder="****************" />
                    <img src={invisibleImg} alt="Mostrar Senha" className="icone-olho"/>
                    </div>

                    <div className="digitar">
                    <label>Confirmar Senha</label>
                    <input type="password" placeholder="****************" />
                    <img src={invisibleImg} alt="Mostrar Senha" className="icone-olho"/>
                    </div>

                    <a className="botao-logar botao-cadastro" onClick={() => setPagina("login")}>
                    Confirmar
                    </a>
                </form>
                
                <div className="caixa-aviso">
                    <div className="aviso-topo">
                    <span>!</span>
                    </div>
                    <div className="aviso-corpo">
                    <p>A nova senha não pode ser igual a anterior!</p>
                    </div>
                </div>
                </main>
            </div>
        )
    }
}