let express = require('express');
let router = express.Router();
let pool = require('../../pool')

router.get('/user', (req, res) => {
    let account = req.query.account
    let sql = 'select * from users where account=?';
    pool.query(sql, [account], (err, results) => {
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