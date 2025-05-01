import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Preencha todos os campos obrigatórios" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres" });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email já existe" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        
        if (newUser) {
            generateToken(newUser._id, res); //Gera o token JWT e o armazena em um cookie
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else {
            res.status(400).json({message: "Dados de usuário inválidos"});
        }

    } catch (error) {
        console.log("Erro no controle de Inscrição", error.message);
        res.status(500).json({ message: "Erro interno do servidor" })
    }
};
export const login = async (req,res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Email ou senha inválidos" });
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Senha inválida"});
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Erro no controle de Login", error.message);
        res.status(500).json({ message: "Erro interno do servidor"})
    }

};
export const logout = (req,res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logout realizado com sucesso"})
    } catch (error) {
        console.log("Erro no controle de Logout", error.message);
        res.status(500).json({ message: "Erro interno do servidor"})
    }

};