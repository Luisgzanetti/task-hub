import * as usuarioService from '../services/usuarioService.js';

function formatarData(data) {
    if (!data) return null;
    let dataFormatada = data;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
        const [dia, mes, ano] = data.split('/');
        dataFormatada = `${ano}-${mes}-${dia}`;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataFormatada)) {
        throw new Error('Data de nascimento inválida. Use o formato DD/MM/AAAA ou AAAA-MM-DD.');
    }
    const parsedDate = new Date(dataFormatada);
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Data de nascimento inválida.');
    }
    return dataFormatada;
}

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
                cpf: usuario.cpf,
                data_nascimento: usuario.data_nascimento
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

        let dataNascimentoFormatada;
        try {
            dataNascimentoFormatada = formatarData(data_nascimento);
        } catch (err) {
            return res.status(400).json({ erro: err.message });
        }

        const novoUsuario = await usuarioService.criarUsuario({
            nome,
            email,
            cpf: cleanedCpf,
            data_nascimento: dataNascimentoFormatada,
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

export async function atualizarUsuario(req, res) {
    try {
        const { id_usuario, nome, email, cpf, data_nascimento, senha } = req.body

        let dataNascimentoFormatada = undefined;
        if (data_nascimento !== undefined) {
            try {
                dataNascimentoFormatada = formatarData(data_nascimento);
            } catch (err) {
                return res.status(400).json({ erro: err.message });
            }
        }

        const usuarioEditado = await usuarioService.atualizarUsuario({
            id_usuario: id_usuario,
            nome: nome,
            email: email,
            cpf: cpf,
            data_nascimento: dataNascimentoFormatada,
            senha: senha
        })

        return res.status(200).json({
            mensagem: 'Usuário atualizado com sucesso!',
            usuario: {
                id_usuario: usuarioEditado.id_usuario,
                nome: usuarioEditado.nome,
                email: usuarioEditado.email,
                cpf: usuarioEditado.cpf,
                data_nascimento: usuarioEditado.data_nascimento,
                senha: usuarioEditado.senha
            }
        })
    } catch (error) {
        console.error('Erro ao editar usuário:', error);
        return res.status(500).json({ erro: 'Erro interno ao editar usuário.' })
    }
}

export async function deletarUsuario(req, res) {
    try {
        const { id_usuario } = req.params; // requisicoes do tipo delete por padrao nao devem enviar um body com dados
        const sucesso = await usuarioService.deletarUsuario(id_usuario);

        if (!sucesso) {
            return res.status(404).json({
                erro: 'Usuário não encontrado.'
            });
        }

        return res.status(200).json({
            mensagem: 'Usuário deletado com sucesso!',
            id_deletado: id_usuario
        });

    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return res.status(500).json({ erro: 'Erro interno ao deletar usuário.' });
    }
}