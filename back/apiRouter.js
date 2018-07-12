 // Umports
 var express = require('express');
 var userCtrl = require('./routes/userCtrl')
 var adminCtrl = require('./routes/adminCtrl')
 var etudiantCtrl = require('./routes/etudiantCtrl')
 var entrepriseCtrl = require('./routes/entrepriseCtrl')
 var nv_etudeCtrl = require ('./routes/nv_etudeCtrl')
 var specialiteCtrl = require ('./routes/specialiteCtrl')
 var user_etudiant_has_specialiteCtrl = require ('./routes/user_etudiant_has_specialiteCtrl.js')

 // Router
 exports.router = (function () {
   var apiRouter = express.Router();

   // Users routes
   apiRouter.route('/users/register/').post(userCtrl.register); // Inscription
   apiRouter.route('/users/login/').post(userCtrl.login); // Connexion

   apiRouter.route('/users/admin/').post(adminCtrl.add_admin); // ADD Admin
   apiRouter.route('/users/admins/').get(adminCtrl.list_admin); // LIST Admin
   apiRouter.route('/users/:userId/').put(adminCtrl.confirmAccount); // Confirm account

   apiRouter.route('/users/etudiant/').post(etudiantCtrl.add_etudiant); // ADD Etudiant
   apiRouter.route('/users/etudiants/').get(etudiantCtrl.list_etudiant); // LIST Etudiant
   apiRouter.route('/users/etudiant/:etudiantId').get(etudiantCtrl.get_etudiant); // LIST Etudiant
   apiRouter.route('/users/etudiant/').put(etudiantCtrl.put_etudiant); // MODIFY Etudiant

   apiRouter.route('/users/entreprise/').post(entrepriseCtrl.add_entreprise); // ADD Entreprise
   apiRouter.route('/users/entreprises/').get(entrepriseCtrl.list_entreprise); // LIST Entreprise
   apiRouter.route('/users/entreprise/:entrepriseId').get(entrepriseCtrl.get_entreprise); // LIST Entreprise
   apiRouter.route('/users/entreprise/').put(entrepriseCtrl.put_entreprise); // MODIFY Entreprise

   // nv_etude routes
   apiRouter.route('/nv_etude/').post(nv_etudeCtrl.add_nv_etude); // ADD nv_etude
   apiRouter.route('/nv_etudes/').get(nv_etudeCtrl.list_nv_etude); // LIST nv_etude

   // specialite routes
   apiRouter.route('/specialite/').post(specialiteCtrl.add_specialite); // ADD specialite
   apiRouter.route('/specialites/').get(specialiteCtrl.list_specialite); // LIST Specilaité

   // etudiant specialite routes
   apiRouter.route('/users/etudiant/specialite/:specialiteId').post(user_etudiant_has_specialiteCtrl.add_user_etudiant_specialite); // ADD user spe
   apiRouter.route('/users/etudiant/specialite/:specialiteId').delete(user_etudiant_has_specialiteCtrl.delete_etudiant_specialite); // DELETE user spé
   apiRouter.route('/users/etudiants/specialites/').get(user_etudiant_has_specialiteCtrl.list_etudiants_specialites); // LIST users Spés
   apiRouter.route('/users/etudiant/:userId/specialites/').get(user_etudiant_has_specialiteCtrl.list_etudiant_specialites); // LIST user's spés
   apiRouter.route('/users/specialite/:specaliteId/etudiants/').get(user_etudiant_has_specialiteCtrl.list_specialite_etudiants); // LIST spé's users'

   return apiRouter
 })();
