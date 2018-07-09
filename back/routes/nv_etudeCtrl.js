// Imports
var models   = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

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
  }
}
