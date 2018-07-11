// Imports
var models   = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

// Constants
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
  add_entreprise: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var nom = req.body.nom;
    var adresse = req.body.adresse;
    var ville = req.body.ville;
    var cp = req.body.cp;
    var logo = req.body.logo;
    var domaine = req.body.domaine;
    var description = req.body.description;

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
          models.user_entreprise.create({
            id: userId,
            nom  : nom,
            adresse : adresse,
            ville : ville,
            cp : cp,
            logo : logo,
            domaine: domaine,
            description: description
          })
          .then(function(newEntreprise) {
            done(newEntreprise);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(newEntreprise) {
      if (newEntreprise) {
        return res.status(201).json(newEntreprise);
      } else {
        return res.status(500).json({ 'error': 'cannot post etudiant' });
      }
    });
  },
  list_entreprise: function(req, res) {
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
          models.user_entreprise.findAll({
            order: [(order != null) ? order.split(':') : ['id', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null
          })
          .then(function(listEntreprise) {
            done(listEntreprise);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(listEntreprise) {
      if (listEntreprise) {
        return res.status(201).json(listEntreprise);
      } else {
        return res.status(500).json({ 'error': 'no etudiants' });
      }
    });
  },
  put_entreprise: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var nom = req.body.nom;
    var adresse = req.body.adresse;
    var cp = req.body.cp;
    var ville = req.body.ville;
    var logo = req.body.logo;
    var domaine = req.body.domaine;
    var description = req.body.description;

    asyncLib.waterfall([
      function(done) {
        models.user_entreprise.findOne({
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
            adresse: (adresse ? adresse : userFound.adresse),
            cp: (cp ? cp : userFound.cp),
            ville: (ville ? ville : userFound.ville),
            logo: (logo ? logo : userFound.logo),
            domaine: (domaine ? domaine : userFound.domaine),
            description: (description ? description : userFound.description)
          }).then(function() {
            done(userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user_entreprise' });
          });
        } else {
          res.status(404).json({ 'error': 'user_entreprise not found' });
        }
      },
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update user_entreprise' });
      }
    });
  }
}
