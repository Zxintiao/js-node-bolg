let express = require('express');
let router = express.Router();
let path = require('path');
let pool = require('../../pool')

router.get('/articlesid', (req, res) => {
    var id = req.query.id;
    let sql = `select * from articles where id=?;`;
    pool.query(sql,[id], (err, results) => {
        if (err) {
            res.json({
                err
            })
            return;
        }
        res.json({
            code: 200,
            results
        })
        console.log('显示成功');
    })
})
module.exports = router;