const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor');

// Criar um novo professor (POST)
router.post('/', async (req, res) => {
  try {
    const novoProfessor = await Professor.create(req.body);
    res.status(201).json(novoProfessor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obter todos os professores (GET)
router.get('/', async (req, res) => {
  try {
    const professores = await Professor.find();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter um professor específico (GET)
router.get('/:id', async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) return res.status(404).json({ error: 'Professor não encontrado' });
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um professor (PUT)
router.put('/:id', async (req, res) => {
  try {
    const professorAtualizado = await Professor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!professorAtualizado) return res.status(404).json({ error: 'Professor não encontrado' });
    res.json(professorAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar um professor (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const professorDeletado = await Professor.findByIdAndDelete(req.params.id);
    if (!professorDeletado) return res.status(404).json({ error: 'Professor não encontrado' });
    res.json({ message: 'Professor removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
