// Imports
var models   = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

// Constants
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
  add_admin: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var nom = req.body.nom;

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
          models.user_admin.create({
            id: userId,
            nom  : nom,
          })
          .then(function(newAdmin) {
            done(newAdmin);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(newAdmin) {
      if (newAdmin) {
        return res.status(201).json(newAdmin);
      } else {
        return res.status(500).json({ 'error': 'cannot post etudiant' });
      }
    });
  },
  list_admin: function(req, res) {
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
        models.user_admin.findOne({
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
          models.user_admin.findAll({
            order: [(order != null) ? order.split(':') : ['id', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null
          })
          .then(function(listAdmin) {
            done(listAdmin);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(listAdmin) {
      if (listAdmin) {
        return res.status(201).json(listAdmin);
      } else {
        return res.status(500).json({ 'error': 'no etudiants' });
      }
    });
  },
  confirmAccount: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var adminId      = jwtUtils.getUserId(headerAuth);

    // Params
    var userId = parseInt(req.params.userId);

    if (userId <= 0) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.user_admin.findOne({
          where: { id: adminId }
        })
        .then(function(adminFound) {
          done(null, adminFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify admin' });
        });
      },
      function(adminFound, done) {
        if(adminFound) {
          models.user.findOne({
            where: { id: userId }
          })
          .then(function(userFound) {
            done(null, adminFound, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to verify user' });
          });
        } else {
          return res.status(500).json({ 'error': 'unable to find admin' });
        }
      },
      function(adminFound, userFound, done) {
        if(userFound) {
          userFound.update({
            active: 1,
          })
          .then(function(user_activate) {
            done(user_activate);
          });
        } else {
          res.status(404).json({ 'error': 'user_etudiant not found' });
        }
      },
    ], function(user_activate) {
      if (user_activate) {
        return res.status(201).json(user_activate);
      } else {
        return res.status(500).json({ 'error': 'cannot update user_etudiant' });
      }
    });
  }
}
