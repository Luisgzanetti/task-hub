import { useState } from "react"
import { useApp } from "../../context/AppContext"
import { fazerLogin } from "../../services/api"
import logo2Img from '../../assets/logo-2.jpeg'
import goBackImg from '../../assets/Go Back.png'; 
import invisibleImg from '../../assets/Invisible.png';
import '../../assets/style.css';

export default function LoginPage({ setPagina }) {
    const { loginUser } = useApp();
    const [identificador, setIdentificador] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleLogin(e) {
        if (e) e.preventDefault();
        if (!identificador || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }
        setErro("");
        setCarregando(true);
        try {
            const data = await fazerLogin(identificador, senha);
            loginUser(data.usuario);
        } catch (err) {
            console.error("Erro no login:", err);
            setErro(err.message || "E-mail/CPF ou senha incorretos.");
        } finally {
            setCarregando(false);
        }
    }

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

                <form className="formulario" onSubmit={handleLogin}>
                    {erro && <p style={{ color: 'red', textAlign: 'center', margin: '0 0 10px 0', fontWeight: 'bold' }}>{erro}</p>}
                    <div className="digitar">
                        <label>E-mail ou CPF</label>
                        <input 
                            type="text" 
                            placeholder="Digite seu e-mail ou CPF" 
                            value={identificador}
                            onChange={(e) => setIdentificador(e.target.value)}
                            disabled={carregando}
                        />
                    </div>

                    <div className="digitar">
                        <label>Senha</label>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Digite sua senha" 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            disabled={carregando}
                        />
                        <img 
                            src={invisibleImg} 
                            alt="Mostrar Senha" 
                            className="icone-olho" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <a className="esqueceu-senha" onClick={() => setPagina("recuperar")}>Esqueceu a senha?</a>

                    <button 
                        type="submit" 
                        className="botao-logar" 
                        disabled={carregando}
                    >
                        {carregando ? "Carregando..." : "Logar"}
                    </button>
                </form>
            </main>
        </div>
    )
}
