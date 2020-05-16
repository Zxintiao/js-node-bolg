let express = require('express');
let router = express.Router();
let pool = require('../../pool')

router.post('/userArticles', (req, res) => {
    let {userID} = req.fields;
    let sql = 'select * from articles where userID=?;';
    pool.query(sql, [userID], (err, results) => {
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