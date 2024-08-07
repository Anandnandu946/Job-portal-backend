//import express
const express = require('express')
const passport = require('passport');

//import usercontroller
const userController = require('../Controller/userController')
//import projeCtcontroller
const jobController = require("../Controller/jobController")
//import applycontroller
const applycontroller = require("../Controller/applyController")
//6.import jwtMiddleware
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
//7.import multiConfig
const multerConfig = require('../Middlewares/multerMiddleware')
//2.create  router object of express to define path
const router = express.Router()

//3.Register api call
router.post('/register',userController.register)

//4.login api call
router.post('/login',userController.login)

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    });
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

//5.add project api call
router.post('/jobs/add-job',jwtMiddleware,jobController.addJob)

//8.get a perticular project api call
router.get('/jobs/get-auser-jobs',jwtMiddleware,jobController.getAUserJobs)

//9.get 3 project details fot home api call
router.get('/jobs/home-jobs',jobController.gethomeJobs)//no need to check token

//10.get all project details  api call
router.get('/jobs/all-jobs',jwtMiddleware,jobController.getAllJobs)

//11.delete user jobs api call
router.delete('/jobs/delete-job/:jid',jwtMiddleware,jobController.deleteUserJob)

//12.update user project
router.put('/jobs/update-user-job/:jid',jwtMiddleware,jobController.updateUserJob)

//13. get all users
router.get('/users/all-users',jwtMiddleware,userController.allUsers)


//14.add apply details api call
router.post('/jobs/add-apply-jobs-details',jwtMiddleware,multerConfig.single('cvImage'),applycontroller.applyJob)
module.exports = router