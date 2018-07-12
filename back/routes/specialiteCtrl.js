// Imports
var models   = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

// Constants
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
  add_specialite: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var nom   = req.body.nom;

    if (nom == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
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
          models.specialite.create({
            nom  : nom
          })
          .then(function(new_specialite) {
            done(new_specialite);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(new_specialite) {
      if (new_specialite) {
        return res.status(201).json(new_specialite);
      } else {
        return res.status(500).json({ 'error': 'cannot post specialite' });
      }
    });
  },
  list_specialite: function(req, res) {
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
          models.specialite.findAll({
            order: [(order != null) ? order.split(':') : ['nom', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null
          })
          .then(function(listSpecialite) {
            done(listSpecialite);
          });
        } else {
          res.status(404).json({ 'error': 'Specialite not found' });
        }
      },
    ], function(listSpecialite) {
      if (listSpecialite) {
        return res.status(201).json(listSpecialite);
      } else {
        return res.status(500).json({ 'error': 'no etudiants' });
      }
    });
  }
}
