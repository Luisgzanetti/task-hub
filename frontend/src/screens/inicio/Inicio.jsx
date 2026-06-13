import '../../assets/style.css';
import logoImg from '../../assets/logo.jpeg'; 
import bordaImg from '../../assets/borda.jpeg';

export default function Inicio({ setPagina }) {
  return (
    <div className="fundo-roxo">
        <div id="telainicial">
            <div id="logo">
            <img src={logoImg} alt="foto da logo do TaskHub" />

            <div className="botoes-inicio">
                <a className="botao" onClick={() => setPagina("login")}>Login</a>
                <a className="botao" onClick={() => setPagina("cadastro")}>Cadastro</a>
            </div>
            </div>
        </div>
        
        <img src={bordaImg} className="borda-img" alt="Detalhe do rodapé" />
        
    </div>
    );
}
