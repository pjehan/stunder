// Imports
var models   = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

// Constants
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
  add_nv_etude: function(req, res) {
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
          models.nv_etude.create({
            nom  : nom
          })
          .then(function(new_nv_etude) {
            done(new_nv_etude);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(new_nv_etude) {
      if (new_nv_etude) {
        return res.status(201).json(new_nv_etude);
      } else {
        return res.status(500).json({ 'error': 'cannot post nv_etude' });
      }
    });
  },
  list_nv_etude: function(req, res) {
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
          models.nv_etude.findAll({
            order: [(order != null) ? order.split(':') : ['nom', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null
          })
          .then(function(listNvEtude) {
            done(listNvEtude);
          });
        } else {
          res.status(404).json({ 'error': 'NvEtude not found' });
        }
      },
    ], function(listNvEtude) {
      if (listNvEtude) {
        return res.status(201).json(listNvEtude);
      } else {
        return res.status(500).json({ 'error': 'no etudiants' });
      }
    });
  }
}
