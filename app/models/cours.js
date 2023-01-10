const express = require('express');
const coursModel = require('../models/cours')

let router = express.Router();

//LIRE 
router.get('/', async (request, response) => {
  try {
    let cours = await coursModel.find()
    return response.status(200).json(cours);
  } catch (error) {
    return response.status(500).json({
      msg: error
    })
  }

});
//CREATE
router.post('/ajouter-cours', async (request, response) => {
  const { label } = request.body;

  if (label == "undefined" || label == "") {
    return response.status(500).json({
      msg: "Veuillez entrer un cours"
    });
  }
  try {
    let cours = await coursModel.create({
      label,
    });
    // classes.push(classe);
    return response.status(200).json(cours);
  } catch (error) {
    return response.status(500).json({
      msg: error
    });
  }
});
module.exports = router;