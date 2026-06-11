import * as usuarioService from '../services/usuarioService.js';

/**
 * Controller responsável pelas funções relacionadas ao usuário.
 */
export async function login(req, res) {
    try {
        const { identificador, senha } = req.body;

        if (!identificador || !senha) {
            return res.status(400).json({ erro: 'Identificador (e-mail ou CPF) e senha são obrigatórios.' });
        }

        let usuario = null;
        if (identificador.includes('@')) {
            usuario = await usuarioService.findByEmail(identificador);
        } else {
            usuario = await usuarioService.findByCpf(identificador);
        }

        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        if (senha !== usuario.senha) {
            return res.status(401).json({ erro: 'Senha incorreta.' });
        }

        return res.status(200).json({
            mensagem: "Logado com sucesso!",
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf
            }
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        return res.status(500).json({ erro: 'Erro interno ao realizar login.' });
    }
}

export async function cadastrar(req, res) {
    try {
        const { nome, email, cpf, data_nascimento, senha, confirmar_senha } = req.body;

        if (!nome || !email || !cpf || !data_nascimento || !senha) {
            return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
        }

        if (senha !== confirmar_senha) {
            return res.status(400).json({ erro: 'As senhas digitadas não coincidem.' });
        }

        if (senha.length < 6 || senha.length > 20) {
            return res.status(400).json({ erro: 'A senha deve ter entre 6 e 20 caracteres.' });
        }

        const cleanedCpf = cpf.replace(/\D/g, '');
        if (cleanedCpf.length !== 11) {
            return res.status(400).json({ erro: 'O CPF deve conter exatamente 11 dígitos numéricos.' });
        }

        const usuarioExistenteEmail = await usuarioService.findByEmail(email);
        if (usuarioExistenteEmail) {
            return res.status(400).json({ erro: 'Este e-mail já está cadastrado.' });
        }

        const usuarioExistenteCpf = await usuarioService.findByCpf(cleanedCpf);
        if (usuarioExistenteCpf) {
            return res.status(400).json({ erro: 'Este CPF já está cadastrado.' });
        }

        const novoUsuario = await usuarioService.criarUsuario({
            nome,
            email,
            cpf: cleanedCpf,
            data_nascimento,
            senha
        });

        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            usuario: {
                id_usuario: novoUsuario.id_usuario,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                cpf: novoUsuario.cpf
            }
        });

    } catch (error) {
        console.error('Erro no cadastro do usuário:', error);
        return res.status(500).json({ erro: 'Erro interno ao processar o cadastro.' });
    }
}