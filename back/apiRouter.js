 // Umports
 var express = require('express');
 var userCtrl = require('./routes/userCtrl')
 var etudiantCtrl = require('./routes/etudiantCtrl')
 var entrepriseCtrl = require('./routes/entrepriseCtrl')
 var nv_etudeCtrl = require ('./routes/nv_etudeCtrl')
 var specialiteCtrl = require ('./routes/specialiteCtrl')
 var user_etudiant_has_specialiteCtrl = require ('./routes/user_etudiant_has_specialiteCtrl.js')

 // Router
 exports.router = (function () {
   var apiRouter = express.Router();

   // Users routes
   apiRouter.route('/users/register/').post(userCtrl.register);
   apiRouter.route('/users/login/').post(userCtrl.login);

   apiRouter.route('/users/etudiant/').post(etudiantCtrl.add_etudiant);
   apiRouter.route('/users/etudiants/').get(etudiantCtrl.list_etudiant);
   apiRouter.route('/users/etudiant/').put(etudiantCtrl.put_etudiant);

   apiRouter.route('/users/entreprise/').post(entrepriseCtrl.add_entreprise);
   apiRouter.route('/users/entreprises/').get(entrepriseCtrl.list_entreprise);
   apiRouter.route('/users/entreprise/').put(entrepriseCtrl.put_entreprise);

   // nv_etude routes
   apiRouter.route('/nv_etude/').post(nv_etudeCtrl.add_nv_etude);
   apiRouter.route('/nv_etudes/').get(nv_etudeCtrl.list_nv_etude);

   // specialite routes
   apiRouter.route('/specialite/').post(specialiteCtrl.add_specialite);
   apiRouter.route('/specialites/').get(specialiteCtrl.list_specialite);

   // etudiant specialite routes
   apiRouter.route('/users/etudiant/specialite/:specialiteId').post(user_etudiant_has_specialiteCtrl.add_user_etudiant_specialite);
   apiRouter.route('/users/etudiants/specialites/').get(user_etudiant_has_specialiteCtrl.list_etudiants_specialites);
   apiRouter.route('/users/etudiant/:userId/specialites/').get(user_etudiant_has_specialiteCtrl.list_etudiant_specialites);

   return apiRouter
 })();
