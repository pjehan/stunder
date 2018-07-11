 // Umports
 var express = require('express');
 var userCtrl = require('./routes/userCtrl')
 var etudiantCtrl = require('./routes/etudiantCtrl')
 var entrepriseCtrl = require('./routes/entrepriseCtrl')
 var nv_etudeCtrl = require ('./routes/nv_etudeCtrl')

 // Router
 exports.router = (function () {
   var apiRouter = express.Router();

   // Users routes
   apiRouter.route('/users/register/').post(userCtrl.register);
   apiRouter.route('/users/login/').post(userCtrl.login);

   apiRouter.route('/users/etudiant/').post(etudiantCtrl.add_etudiant);
   apiRouter.route('/users/etudiants/').get(etudiantCtrl.list_etudiant);

   apiRouter.route('/users/entreprise/').post(entrepriseCtrl.add_entreprise);
   apiRouter.route('/users/entreprises/').get(entrepriseCtrl.list_entreprise);

   // nv_etude routes
   apiRouter.route('/nv_user/').post(nv_etudeCtrl.add_nv_etude);

   return apiRouter
 })();
