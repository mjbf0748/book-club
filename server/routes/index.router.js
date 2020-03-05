const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const {User, Book} = require('../models/user.model');

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

// Call to register new user
router.post('/register', ctrlUser.register);

// Call to authenticate user with appropriate credentials
router.post('/authenticate', ctrlUser.authenticate);

// Call to retrieve user and verify token
router.get('/userprofile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.get('/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No User Found');
});



module.exports = router;