let express = require('express');
let router = express.Router();
let pool = require('../../pool')

router.post('/insertArticle', (req, res) => {
    var { title, createDate, nickname, content, kind, userID } = req.fields;
    let readsNum = 0;
    let likes = 0;
    let sql = 'insert into articles (title, createDate, readsNum, content, likes, kind, userID,nickname) values (?,?,?,?,?,?,?,?) ;'
    pool.query(sql, [title, createDate, readsNum, content, likes, kind, userID, nickname], (err, results) => {
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
        console.log('添加成功');
    })
})
module.exports = router;