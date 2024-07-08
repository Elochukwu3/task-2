const express = require('express');
const authMiddleWare = require('../middleware/auth');
const {getOrganisation, getOrgId, postOrg, getUserById, orgUsers} = require('../controllers/orgController')

const router = express.Router();

// [GET] /api/users/:id 
//  [GET] /api/organisations 
//  [GET] /api/organisations/:orgId
//  [POST] /api/organisations
// [POST] /api/organisations/:orgId/users]
router.use(authMiddleWare)
router.route('/users/:id').get(getUserById);
router.route('/organisations').get(getOrganisation);
router.route('/organisations/:orgId').get(getOrgId);
router.route('/organisations').post(postOrg);
router.route('/organisations/:orgId/users').post(orgUsers);

module.exports = router;

