let express = require('express');
let router = express.Router();
let path = require('path');
let pool = require('../../pool')

router.post('/userLogin', (req, res) => {
    var { account, password } = req.fields;
    let sql = 'select * from users;';
    pool.query(sql, [account, password], (err, results) => {
        if (err) {
            // console.log('出错了');
            res.json({
                err
            })
            return;
        }
        let flag = true
        results.forEach(function (item) {
            if (item.account === account && item.password === password) {
                if (item.status === 2) {
                    flag = false
                    res.json({
                        code: 200,
                        item: item,
                        msg: '登入成功'
                    })
                } 
                return;
            }
        })
        if (flag) {
            res.json({
                err: 0,
                string: '账号或密码错误'
            })
        }
    })
})
module.exports = router;