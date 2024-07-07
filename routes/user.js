const express = require('express');

const router = express.Router();

// [GET] /api/users/:id 
//  [GET] /api/organisations 
//  [GET] /api/organisations/:orgId
//  [POST] /api/organisations
// [POST] /api/organisations/:orgId/users]
router.route('/users/:id').get();
router.route('/organisations').get();
router.route('/organisations/:orgId').get();
router.route('/organisations').post();
router.route('/organisations/:orgId/users').post();

module.exports = router;

