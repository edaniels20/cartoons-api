const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('/', (req, res) => {
    const url = 'https://api.sampleapis.com/cartoons/cartoons2D';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let keyArray = [];
            let filterData = {};
            data.forEach(item => {
                item.genre.forEach(el => {
                    if(!keyArray.includes(el)) {
                        keyArray.push(el);
                    }
                });
            });
            keyArray.forEach(item => {
                filterData[item] = [];
            });

            data.forEach(item => {
                item.genre.forEach(el => {
                    filterData[el].push(item);
                })
            });
            
            res.render('pages/cartoons', {
                title: 'All Cartoons',
                name: 'Cartoon List',
                data: filterData
            });
            console.log(router.stack)
        })
        .catch(error => {
            console.log('ERROR: ', error);
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const url = `https://api.sampleapis.com/cartoons/cartoons2D/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/single-cartoon', {
                    title: data.title,
                    name: data.title,
                    data
                });
            } else {
                res.render('pages/404', {
                    title: 404,
                    name: 404,
                });
            }
            console.log(router.stack)
        })
        .catch(error => {
            console.log('Error: ', error)
        })
})

module.exports = router;
