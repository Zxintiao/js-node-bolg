let express = require('express');
let router = express.Router();
let pool = require('../../pool')

router.get('/articles', (req, res) => {
    let sql = 'select * from articles;';
    pool.query(sql, '', (err, results) => {
        if (err) {
            res.json({
                err
            })
            return;
        }
        res.json({
            code: 200,
            results,
            msg: '返回数据成功'
        })
    })
})
module.exports = router;