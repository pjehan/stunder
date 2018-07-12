// Imports
var models   = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.utils');

// Constants
const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
  add_user_etudiant_specialite: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    // Params
    var specialiteId = parseInt(req.params.specialiteId);

    if (specialiteId <= 0) {
      return res.status(400).json({ 'error': 'invalid parameters' });
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
          models.specialite.findOne({
            where: { id: specialiteId }
          })
          .then(function(specialiteFound) {
            done(null, userFound, specialiteFound);
          });
        } else {
          res.status(404).json({ 'error': 'specialite not found' });
        }
      },
      function(userFound, specialiteFound, done)  {
        if(specialiteFound) {
          models.user_etudiant_has_specialite.findOne({
            where: {
              user_id: userId,
              specialite_id: specialiteId
            }
          })
          .then(function(etudiant_specialiteFound) {
            done(null, userFound, specialiteFound, etudiant_specialiteFound);
          });
        } else {
          res.status(404).json({ 'error': 'user_etudiant_has_specialiteFoundFound not found' });
        }
      },
      function(userFound, specialiteFound, etudiant_specialiteFound, done) {
        if(!etudiant_specialiteFound) {
          models.user_etudiant_has_specialite.create({
            user_id: userId,
            specialite_id: specialiteId
          })
          .then(function(etudiant_specialiteAdd) {
            done(etudiant_specialiteAdd);
          });
        } else {
          res.status(404).json({ 'error': 'user_etudiant_has_specialiteFoundFound not found' });
        }
      },
    ], function(etudiant_specialiteAdd) {
      if (etudiant_specialiteAdd) {
        return res.status(201).json(etudiant_specialiteAdd);
      } else {
        return res.status(500).json({ 'error': 'cannot post nv_etude' });
      }
    });
  },
  delete_etudiant_specialite: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var userId      = jwtUtils.getUserId(headerAuth);

    var specialiteId = parseInt(req.params.specialiteId);
    if (specialiteId <= 0) {
      return res.status(400).json({ 'error': 'invalid parameters' });
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
          models.specialite.findOne({
            where: { id: specialiteId }
          }).then(function (specialiteFound) {
            done(null, userFound, specialiteFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to find specialite' });
          });
        } else {
          return res.status(500).json({ 'error': 'unable to find user' });
        }
      },
      function(userFound, specialiteFound, done) {
        if(specialiteFound) {
          models.user_etudiant_has_specialite.findOne({
            where: { user_id: userId, concert_id: concertId }
          })
          .then(function (etudiant_specialiiteFound) {
            done(null, userFound, specialiteFound, etudiant_specialiiteFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to find concert' });
          });
        } else {
          res.status(404).json({ 'error': 'place not found' });
        }
      },
      function(userFound, specialiteFound, etudiant_specialiiteFound, done) {
        if(etudiant_specialiiteFound) {
          user_etudiant_has_specialite.destroy()
          .then(function(etudiant_specialiiteDelete) {
            done(etudiant_specialiiteDelete);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot delete concert' });
          });
        } else {
          res.status(404).json({ 'error': 'concert not found' });
        }
      },
    ], function(etudiant_specialiiteDelete) {
      if (etudiant_specialiiteDelete) {
        return res.status(201).json(etudiant_specialiiteDelete);
      } else {
        return res.status(500).json({ 'error': 'cannot delete concert' });
      }
    });
  },
  list_etudiants_specialites: function(req, res) {
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
          models.user_etudiant_has_specialite.findAll({
            order: [(order != null) ? order.split(':') : ['user_id', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null
          })
          .then(function(listEtudiantSpecialite) {
            done(listEtudiantSpecialite);
          });
        } else {
          res.status(404).json({ 'error': 'user_etudiant not found' });
        }
      },
    ], function(listEtudiantSpecialite) {
      if (listEtudiantSpecialite) {
        return res.status(201).json(listEtudiantSpecialite);
      } else {
        return res.status(500).json({ 'error': 'no etudiants' });
      }
    });
  },
  list_etudiant_specialites: function(req, res) {
    // Params
    var userId = parseInt(req.params.userId);

    if (userId <= 0) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

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
        if (userFound) {
          models.user_etudiant_has_specialite.findAll({
            where: { user_id: userId },
            order: [(order != null) ? order.split(':') : ['user_id', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null
          })
          .then(function(listEtudiantSpecialite) {
            done(listEtudiantSpecialite);
          });
        } else {
          return res.status(500).json({ 'error': 'user not found' });
        }
      },
    ], function(listEtudiantSpecialite) {
      if (listEtudiantSpecialite) {
        return res.status(201).json(listEtudiantSpecialite);
      } else {
        return res.status(500).json({ 'error': 'no etudiants' });
      }
    });
  },
  list_specialite_etudiants: function(req, res) {
    // Params
    var specialiteId = parseInt(req.params.userId);

    if (specialiteId <= 0) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    var fields  = req.query.fields;
    var limit   = parseInt(req.query.limit);
    var offset  = parseInt(req.query.offset);
    var order   = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    asyncLib.waterfall([
      function(done) {
        models.specialite.findOne({
          where: { id: specialiteId }
        })
        .then(function(specialiteFound) {
          done(null, specialiteFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(specialiteFound, done) {
        if (specialiteFound) {
          models.user_etudiant_has_specialite.findAll({
            where: { specialite_id: specialiteId },
            order: [(order != null) ? order.split(':') : ['user_id', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null
          })
          .then(function(listSpecialiteEtudiants) {
            done(listSpecialiteEtudiants);
          });
        } else {
          return res.status(500).json({ 'error': 'user not found' });
        }
      },
    ], function(listSpecialiteEtudiants) {
      if (listSpecialiteEtudiants) {
        return res.status(201).json(listSpecialiteEtudiants);
      } else {
        return res.status(500).json({ 'error': 'no etudiants' });
      }
    });
  }
}
