const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  disciplina: { type: String, required: true },
  telefone: { type: String },
});

module.exports = mongoose.model('Professor', professorSchema);
