const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
router.use(express.static('public'));

const cartoonRoutes = require('./api/cartoonRoutes');

router.use('/cartoons', cartoonRoutes);

router.get('/', (req, res) => {
    const url = 'https://api.sampleapis.com/cartoons/cartoons2D';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'Home',
                name: 'Cartoons',
                data
            });
        })
        .catch(error => {
            console.log('Error: ', error)
        })
})

router.get('*', (req, res) => {
    if(req.url == '/favicon.ico') {
        res.end()
    } else {
        res.render('pages/404', {
            title: 404,
            name: 404,
        })
    }
})

module.exports = router;
