let express = require('express');
let router = express.Router();
let pool = require('../../pool')

router.get('/deleteArticles', (req, res) => {
    let id = req.query.id
    
    let sql = 'delete from articles where id=?;';
    pool.query(sql, [id], (err, results) => {
        console.log(id);
        
        if (err) {
            res.json({
                err
            })
            return;
        }
        res.json({
            code: 200,
            results,
            msg: '删除成功'
        })
    })
})
module.exports = router;