// Imports
var models   = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

// Constants
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
  add_etudiant: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var date_naissance = req.body.date_naissance;
    var tel = req.body.tel;
    var nv_etude_id = req.body.nv_etude_id;

    asyncLib.waterfall([
      function(done) {
        models.user.findOne({
          where: { id: userId }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          models.user_etudiant.create({
            id: userId,
            nom  : nom,
            prenom : prenom,
            date_naissance : date_naissance,
            tel : tel,
            dispo : 1,
            nv_etude_id: nv_etude_id
          })
          .then(function(newEtudiant) {
            done(newEtudiant);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(newEtudiant) {
      if (newEtudiant) {
        return res.status(201).json(newEtudiant);
      } else {
        return res.status(500).json({ 'error': 'cannot post etudiant' });
      }
    });
  }
}
