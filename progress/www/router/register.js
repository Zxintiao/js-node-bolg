let express = require('express');
let router = express.Router();
let path = require('path');
let pool = require('../../pool')

router.post('/register', (req, res) => {
    var { account, password, nikename } = req.fields;
    console.log(nikename);
    console.log(req.fields);
    
    if (account != '' && account != undefined && password != undefined && password != '') {
        let sql = 'select * from users where account=?'
        pool.query(sql, [account], (err, results) => {
            if (err) {
                res.json({
                    err
                })
                return;
            }
            if (results.length == 0) {
                let sql = 'insert into users (account, password, nickname) values (?,?,?);'
                pool.query(sql, [account, password, nikename], (err, results) => {
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
                })
                console.log('注册成功！');
            } else {
                res.json({
                    results: '账号已注册！'
                })
                console.log('账号已注册！');
            }
        })
    }
})

module.exports = router;