import "./Usuario.css"

import { useState, useEffect } from "react"
import { useApp } from "../../context/AppContext"
import { atualizarUsuario } from "../../services/api"

import TopBar from "../../components/TopBar/TopBar"
import SideBar from "../../components/SideBar/SideBar"
import LoginPage from "../login/LoginPage"

import { BiArrowBack } from "react-icons/bi"
import { BiShow } from "react-icons/bi"

export default function Usuario({ setPagina }) {
    const { usuario, loginUser, logout } = useApp();

    const [tela, setTela] = useState("menu")

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [data, setData] = useState("")

    const [senhaAtual, setSenhaAtual] = useState("")
    const [novaSenha, setNovaSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")

    const [mostrarModal, setMostrarModal] = useState(false)

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome || "");
            setEmail(usuario.email || "");
            setCpf(usuario.cpf || "");
            if (usuario.data_nascimento) {
                setData(usuario.data_nascimento.split("T")[0]);
            }
        }
    }, [usuario]);

    async function atualizarPerfil() {
        if (!nome || !email || !cpf || !data) {
            alert("Preencha todos os campos.");
            return;
        }
        try {
            const res = await atualizarUsuario({
                id_usuario: usuario.id_usuario,
                nome,
                email,
                cpf,
                data_nascimento: data
            });
            loginUser(res.usuario);
            setMostrarModal(true)

            setTimeout(() => {
                setMostrarModal(false)
                setTela("menu")
            }, 2000)
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            alert("Erro ao atualizar perfil: " + error.message);
        }
    }

    function excluirPerfil() {
        setMostrarModal(true)
        setTimeout(() => {
            setMostrarModal(false)
            setPagina("inicio")
        }, 2000)
    }

    async function alterarSenha() {
        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            alert("Preencha todos os campos de senha.");
            return;
        }
        if (novaSenha !== confirmarSenha) {
            alert("As senhas novas não coincidem.");
            return;
        }
        try {
            await atualizarUsuario({
                id_usuario: usuario.id_usuario,
                senha: novaSenha
            });
            setMostrarModal(true)
            setSenhaAtual("");
            setNovaSenha("");
            setConfirmarSenha("");

            setTimeout(() => {
                setMostrarModal(false)
                setTela("menu")
            }, 2000)
        } catch (error) {
            console.error("Erro ao alterar senha:", error);
            alert("Erro ao alterar senha: " + error.message);
        }
    }

    if (tela === "editar") {

        return (

            <div className="usuario-bg">

                <TopBar setPagina={setPagina} />

                <div className="usuario-content">

                    <button
                        className="voltar-button"
                        onClick={() => setTela("menu")}
                    >
                        <BiArrowBack size={24} />
                    </button>

                    <h1 className="usuario-title">
                        Editar perfil
                    </h1>

                    <div className="usuario-inputs">

                        <div className="usuario-input-group">

                            <label>Nome de Usuário</label>

                            <input
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />

                        </div>

                        <div className="usuario-input-group">

                            <label>E-mail</label>

                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>

                        <div className="usuario-input-group">

                            <label>CPF</label>

                            <input
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />

                        </div>

                        <div className="usuario-input-group">

                            <label>Data de Nascimento</label>

                            <input
                                type="date"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />

                        </div>

                    </div>

                    <button
                        className="principal-button"
                        onClick={atualizarPerfil}
                    >
                        Atualizar Perfil
                    </button>

                </div>

                {
                    mostrarModal && (

                        <div className="perfil-modal">

                            <div className="perfil-modal-top rosa">
                                ✓
                            </div>

                            <div className="perfil-modal-content">

                                <h1>
                                    Perfil atualizado
                                </h1>

                            </div>

                        </div>

                    )
                }

                <SideBar
                    paginaAtual="user"
                    setPagina={setPagina}
                />

            </div>

        )

    }

    if (tela === "excluir") {

        return (

            <div className="usuario-bg">

                <TopBar setPagina={setPagina} />

                <div className="usuario-content">

                    <button
                        className="voltar-button"
                        onClick={() => setTela("menu")}
                    >
                        <BiArrowBack size={24} />
                    </button>

                    <h1 className="usuario-title center">
                        Confirme sua senha para excluir o seu perfil.
                    </h1>

                    <div className="usuario-input-group">

                        <label>Senha</label>

                        <div className="senha-input">

                            <input
                                type="password"
                            />

                            <BiShow />

                        </div>

                    </div>

                    <button
                        className="principal-button"
                        onClick={excluirPerfil}
                    >
                        Excluir Perfil
                    </button>

                </div>

                {
                    mostrarModal && (

                        <div className="perfil-modal">

                            <div className="perfil-modal-top vermelho">
                                ⦿
                            </div>

                            <div className="perfil-modal-content">

                                <h1>
                                    Perfil Excluído
                                </h1>

                            </div>

                        </div>

                    )
                }

                <SideBar
                    paginaAtual="user"
                    setPagina={setPagina}
                />

            </div>

        )

    }

    if (tela === "senha") {

        return (

            <div className="usuario-bg">

                <TopBar setPagina={setPagina} />

                <div className="usuario-content">

                    <button
                        className="voltar-button"
                        onClick={() => setTela("menu")}
                    >
                        <BiArrowBack size={24} />
                    </button>

                    <h1 className="usuario-title">
                        Alterar Senha
                    </h1>

                    <div className="usuario-inputs">

                        <div className="usuario-input-group">

                            <label>Senha Atual</label>

                            <div className="senha-input">

                                <input
                                    type="password"
                                    value={senhaAtual}
                                    onChange={(e) => setSenhaAtual(e.target.value)}
                                />

                                <BiShow />

                            </div>

                        </div>

                        <div className="usuario-input-group">

                            <label>Nova Senha</label>

                            <div className="senha-input">

                                <input
                                    type="password"
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                />

                                <BiShow />

                            </div>

                        </div>

                        <div className="usuario-input-group">

                            <label>Confirmar Senha</label>

                            <div className="senha-input">

                                <input
                                    type="password"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                />

                                <BiShow />

                            </div>

                        </div>

                    </div>

                    <button
                        className="principal-button"
                        onClick={alterarSenha}
                    >
                        Alterar Senha
                    </button>

                </div>

                {
                    mostrarModal && (

                        <div className="perfil-modal">

                            <div className="perfil-modal-top rosa">
                                ✓
                            </div>

                            <div className="perfil-modal-content">

                                <h1>
                                    Senha atualizada
                                </h1>

                            </div>

                        </div>

                    )
                }

                <SideBar
                    paginaAtual="user"
                    setPagina={setPagina}
                />

            </div>

        )

    }

    if (tela === "logout") {

        return (

            <div className="usuario-bg">

                <TopBar setPagina={setPagina} />

                <div className="usuario-content">

                    <button
                        className="voltar-button"
                        onClick={() => setTela("menu")}
                    >
                        <BiArrowBack size={24} />
                    </button>

                    <div className="logout-card">

                        <div className="logout-top">
                            ⦿
                        </div>

                        <div className="logout-content">

                            <h1>
                                Deseja sair?
                            </h1>

                            <div className="logout-buttons">

                                <button onClick={() => { logout(); setPagina("inicio"); }}>
                                    SIM
                                </button>

                                <button
                                    onClick={() => setTela("menu")}
                                >
                                    NÃO
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                <SideBar
                    paginaAtual="user"
                    setPagina={setPagina}
                />

            </div>

        )

    }

    return (

        <div className="usuario-bg">

            <TopBar setPagina={setPagina} />

            <div className="usuario-content">

                <h1 className="usuario-title">
                    Tela usuário
                </h1>

                <div className="usuario-buttons">

                    <button
                        onClick={() => setTela("editar")}
                    >
                        Editar perfil
                    </button>

                    <button
                        onClick={() => setTela("excluir")}
                    >
                        Excluir perfil
                    </button>

                    <button
                        onClick={() => setTela("senha")}
                    >
                        Alterar senha
                    </button>

                    <button
                        onClick={() => setTela("logout")}
                    >
                        Sair
                    </button>

                </div>

            </div>

            <SideBar
                paginaAtual="user"
                setPagina={setPagina}
            />

        </div>

    )

}