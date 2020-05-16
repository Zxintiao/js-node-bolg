let express = require('express');
let router = express.Router();
let pool = require('../../pool')

router.get('/updateArticle', (req, res) => {
    var { title, content, kind, createDate, id } = req.query;

    let sql = 'update articles set title=?, content=?, kind=?, createDate=? where id=?;';
    pool.query(sql, [title, content, kind, createDate, id], (err, results) => {
        if (err) {
            res.json({
                err
            })
            return;
        }
        res.json({
            code: 200,
            results,
            msg: '更新成功'
        })
    })
})
module.exports = router;