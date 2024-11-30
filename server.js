const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Modelo do banco de dados
const ProfessorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    disciplina: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
});

const Professor = mongoose.model('Professor', ProfessorSchema);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error(err));

// Rotas
app.post('/api/professores', async (req, res) => {
    try {
        const professor = new Professor(req.body);
        await professor.save();
        res.status(201).json(professor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/professores', async (req, res) => {
    try {
        const professores = await Professor.find();
        res.json(professores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/professores/:id', async (req, res) => {
    try {
        const professor = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(professor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/professores/:id', async (req, res) => {
    try {
        await Professor.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

