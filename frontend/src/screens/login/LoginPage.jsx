import { useState } from "react"
import Home from "../home/HomePage"
import logo2Img from '../../assets/logo-2.jpeg'
import goBackImg from '../../assets/Go Back.png'; 
import invisibleImg from '../../assets/Invisible.png';
import '../../assets/style.css';

export default function LoginPage({ setPagina }) {

    return (
        <div className="fundo-bege">
            <main className="tela-app">
                <div className="cabecalho">
                    <a className="seta-voltar" onClick={() => setPagina("inicio")}>
                        <img src={goBackImg} alt="Seta de voltar" />
                    </a>
                    <img src={logo2Img} alt="Logo Taskhub" className="logo-2" />
                </div>

                <h1>Login</h1>

                <form className="formulario">
                    <div className="digitar">
                    <label>E-mail ou CPF</label>
                    <input type="text" placeholder="****************" />
                    </div>

                    <div className="digitar">
                    <label>Senha</label>
                    <input type="password" placeholder="****************" />
                    <img src={invisibleImg} alt="Mostrar Senha" className="icone-olho" />
                    </div>

                    <a className="esqueceu-senha" onClick={() => setPagina("recuperar")}>Esqueceu a senha?</a>

                    <a className="botao-logar" onClick={() => setPagina("home")}>Logar</a>
                </form>
            </main>
        </div>
    )
}
