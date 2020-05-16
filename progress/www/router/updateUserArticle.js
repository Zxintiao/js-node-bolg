let express = require('express');
let router = express.Router();
let pool = require('../../pool')

router.post('/updateUserArticle', (req, res) => {
    var { title, content, kind, id } = req.fields;
    let sql = 'update articles set title=?, content=?, kind=? where id=?;';
    pool.query(sql, [title, content, kind, id], (err, results) => {
        console.log(err);
        
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