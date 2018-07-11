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
  },
  list_etudiant: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    var fields  = req.query.fields;
    var limit   = parseInt(req.query.limit);
    var offset  = parseInt(req.query.offset);
    var order   = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

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
          models.user_etudiant.findAll({
            order: [(order != null) ? order.split(':') : ['id', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null
          })
          .then(function(listEtudiants) {
            done(listEtudiants);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(listEtudiants) {
      if (listEtudiants) {
        return res.status(201).json(listEtudiants);
      } else {
        return res.status(500).json({ 'error': 'no etudiants' });
      }
    });
  },
  put_etudiant: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var date_naissance = req.body.date_naissance;
    var tel = req.body.tel;
    var dispo = req.body.dispo;
    var nv_etude_id = req.body.nv_etude_id;

    asyncLib.waterfall([
      function(done) {
        models.user_etudiant.findOne({
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
          userFound.update({
            nom: (nom ? nom : userFound.nom),
            prenom: (prenom ? prenom : userFound.prenom),
            date_naissance: (date_naissance ? date_naissance : userFound.date_naissance),
            tel: (tel ? tel : userFound.tel),
            dispo: (dispo ? dispo : userFound.dispo),
            nv_etude_id: (nv_etude_id ? nv_etude_id : userFound.nv_etude_id)
          }).then(function() {
            done(userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user_etudiant' });
          });
        } else {
          res.status(404).json({ 'error': 'user_etudiant not found' });
        }
      },
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update user_etudiant' });
      }
    });
  }
}
