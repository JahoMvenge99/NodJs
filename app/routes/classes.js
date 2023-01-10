const { response } = require('express');
const express = require('express');
const { request } = require('http');
const { v4: uuidv4 } = require('uuid');
const classe = require('../models/classe');
const classeModel = require('../models/classe');
const student = require('../models/student');

let router = express.Router();

//CREATE
router.post('/', async (request, response) => {
  const { name } = request.body;

  if (name == "undefined" || name == "") {
    return response.status(500).json({
      msg: "Veuillez entrer un nom"
    });
  }

  try {
    let classe = await classeModel.create({
      name
    });
    // classes.push(classe);
    return response.status(200).json(classe);
  } catch (error) {
    return response.status(500).json({
      msg: error
    });
  }
});
router.post('/add-student', async (request, response) => {

  const { studentId, classeId } = request.body;
  try {
    classes = await classeModel.findOneAndUpdate({
      _id: classeId
    }, {
      "$push": { "students": studentId }
    },
      {
        new: true
      }).populate('students');
    await studentModel.findOneAndUpdate({
      _id: studentId
    }, {
      classe: classe
    });
    return response.status(200).json(classes);
  } catch (error) {
    return response.status(500)({
      msg: error
    });
  }
});
//LIRE 
router.get('/', async (request, response) => {
  try {
    let classes = await classeModel.find()
    return response.status(200).json(classes);
  } catch (error) {
    return response.status(500).json({
      msg: error
    })
  }

}),
  //LIRE MAIS AVEC UN ID PRECIS
  router.get('/:id', async (request, response) => {
    const { id } = request.params;
    try {
      let classe = await classeModel.findById(id);
      return response.status(200).json(classe);
    } catch (error) {
      return response.status(500).json({
        msg: error
      })
    }
  }),
  //SUPPRIMER UN ID
  router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    try {
      let classe = await classeModel.findByIdAndRemove(id);
      return response.status(200).json(classe);
    } catch (error) {
      return response.status(500).json({
        msg: error
      })
    }
    // let classe = classes.filter(object => object.id !== id);

    // response.status(200).json(classe);
  }),

  //MODIFIER UN NOM DANS UN ID
  router.put('/:id', async (request, response) => {
    const { id } = request.params;
    const { name } = request.body;

    try {
      let classe = await classeModel.findByIdAndUpdate(id,
        {
          name
        }, {
        new: true
      })
      return response.status(200).json({
        msg: "Classe bien modifiée !"
      })
    } catch (error) {
      return response.status(500).json(error)
    }
    // let classe = classes.find(item => item.id === id);

    // classe.name = name;

    // response.status(200).json(classe);
  })

module.exports = router;