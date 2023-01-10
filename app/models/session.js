const express = require('express');
const sessionModel = require('../models/session');

let router = express.Router();

//CREATE
router.post('/ajouter-sessions', async (request, response) => {
  const { date } = request.body;
  const { heuredebut } = request.body;
  const { heurefin } = request.body;
  const { cours } = request.body;

  if (date == "undefined" || date == "") {
    return response.status(500).json({
      msg: "Veuillez entrer une date"
    });
  }
  else if (heuredebut == "undefined" || heuredebut == "") {
    return response.status(500).json({
      msg: "Veuillez entrer une heure de debut"
    });
  }
  else if (heurefin == "undefined" || heurefin == "") {
    return response.status(500).json({
      msg: "Veuillez entrer une heure de fin"
    });
  }
  else if (cours == "undefined" || cours == "") {
    return response.status(500).json({
      msg: "Veuillez entrer une matière"
    });
  }
  try {
    let session = await sessionModel.create({
      date,
      heuredebut,
      heurefin,
      cours
    });
    // classes.push(classe);
    return response.status(200).json(session);
  } catch (error) {
    return response.status(500).json({
      msg: error
    });
  }
});
//Read//
router.get('/', async (req, res) => {

  const sessions = await sessionModel.find();

  if (sessions) {
    return res.status(200).json(sessions);
  } else {
    return res.status(500).json({ "msg": " Aucun Resultat : " + error });
  }

});

router.get('/:id', async (req, res) => {

  const { id } = req.params;
  if (typeof id !== 'string') { return res.status(500).json({ "msg": "Veuillez saisir un id ! " }); }

  const session = await sessionModel.findOne({ "_id": id });

  if (session) {
    return res.status(200).json(session);
  } else {
    return res.status(500).json({ "msg": " Aucun Resultat : " + error });
  }

});

//Delete//
router.delete('/:id', async (req, res) => {

  const { id } = req.params;
  if (typeof id !== 'string') { return res.status(500).json({ "msg": "Veuillez saisir un id ! " }); }

  try {
    const session = await sessionModel.findOneAndDelete({ _id: id });
    return res.status(200).json({ "msg": " La session a bien été supprimé ! " });
  }
  catch {
    return res.status(500).json({ "msg": " Il y a une erreur : " + error });
  }

});

//Update//
router.put('/:id', async (req, res) => {

  const { id } = req.params;
  const { date } = req.body;
  const { heuredebut } = req.body;
  const { heurefin } = req.body;
  if (typeof id !== 'string') { return res.status(500).json({ "msg": "Veuillez saisir un id ! " }); }

  try {
    const session = await sessionModel.findOneAndUpdate({ _id: id }, { date, heuredebut, heurefin }, { new: true });
    return res.status(200).json({ "msg": " La session a bien été mis-à-jour ! " });
  }
  catch {
    return res.status(500).json({ "msg": " Il y a une erreur : " + error });
  }

});


module.exports = router;