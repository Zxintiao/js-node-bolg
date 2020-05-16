let express = require('express');
let router = express.Router();
let pool = require('../../pool')

router.post('/changeUser', (req, res) => {
    var { nickname, sex, account} = req.fields;

    let sql = 'update users set nickname=?, sex=? where account=?;';
    pool.query(sql, [nickname, sex, account], (err, results) => {
        if (err) {
            res.json({
                err
            })
            return;
        }
        console.log(results);
        
        res.json({
            code: 200,
            results,
            msg: '更新成功'
        })
    })
})
module.exports = router;