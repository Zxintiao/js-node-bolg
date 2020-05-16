let express = require('express');
let router = express.Router();
let path = require('path');
let pool = require('../../pool')

router.get('/deleteArticlesMore', (req, res) => {
    // console.log(req.query.IDs);
    var IDs = req.query.IDs;
    // console.log(IDs);
    // IDs = IDs.split(',');
    // console.log(IDs);

    // var ID = '';
    // for(var i = 0;i < IDs.length;i++){
    //     ID += IDs[i] + ','
    // }
    // console.log(ID);
    
    // aaa = ID.slice(0,ID.length-1);

    // console.log(aaa);
    
    let sql = `delete from articles where id in (${IDs})`;;

    pool.query(sql, [IDs], (err, results) => {
        console.log(err);
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
        console.log('删除成功');
    })
})
module.exports = router;