const express = require('express');
const router = express.Router();
const db = require('../helpers/dbConnection')

router.use(function timelog(req, res, next) {
    console.log(`Time: `, Date.now(), 'login.js router');
    next();
});

router.get('/login', async (req, res, next) => {
    return res.render('login')
    // const records = await db.Comment.findAll({include: [{model: db.User}]})
    // console.log(records);
})

router.post('/login', async (req, res, next) => {
    // console.log(User);
    const { username, password } = req.body;
    console.log(username);
    try {
        const records = await db.User.findAll({
            where: {username:username},include: [{
            model: db.Comment
        }] });
        console.log(records[0].dataValues);
        if (records !== null) {
            if (password === records[0].dataValues.password) {
                return res.send('issamatch')
            } else {
                console.log('password does not match');
                return res.render('login')
            }
        }
    } catch (error) {
        console.log(error);
        console.log('That username does not match any in our records.')
        res.redirect('login')
    }


});

module.exports=router