const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Entrez votre adress mail'],
    unique: {
      msg: "l'utilisateur exist"
    },
    trim: true
  },
  password: {
    type: String,
    require: [true, 'Entrez votre adress mot de passe'],
    trim: true
  },
  firstname: {
    type: String,
    require: [true, 'Entrez un prenom'],
    trim: true
  },

  lastname: {
    type: String,
    require: [true, 'Entrez un nom de famille'],
    trim: true
  },
  // students: [{ type: this.schema.types.ObjectId, ref: 'Student' }]
  classe: { type: mongoose.Schema.Types.ObjectId, ref: 'classe' }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: "updatedAt"
  }
}
);

module.exports = mongoose.model('Student', studentSchema);