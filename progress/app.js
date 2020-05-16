let express = require('express');
let path = require('path');
const cors = require('cors'); // 解决跨域拦截
let app = express();

// 解决跨域拦截
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
app.use(cors({
    origin: ['http://localhost:3000'], // 这是本地的默认地址和端口，vue启动的项目就是在这里，
    // 这样保证了等会我们在浏览器能访问服务器的数据
    methods: ["GET", "POST"],
    alloweHeaders: ["Content-Type", "Authorization"]
}))

// 导入路由文件
// 管理员
let routerLogin = require('./www/router/login');
let routerArticles = require('./www/router/articles');
let routerDeleteArticles = require('./www/router/deleteArticles');
let routerUpdateArticle = require('./www/router/updateArticle');
let routerInsertArticle = require('./www/router/insertArticle');
let routerDeleteArticlesMore = require('./www/router/deleteArticlesMore');

// 用户的
let routerUserLogin = require('./www/router/userLogin');
let routerRegister = require('./www/router/register');
let routerUser = require('./www/router/user');
let routerChangeUser = require('./www/router/changeUser');
let routerUserArticles = require('./www/router/userArticles');
let routerUpdateUserArticle = require('./www/router/updateUserArticle');
let routerArticlesid = require('./www/router/articlesid');

// 上传文件到哪里，和格式
const formidableMiddleware = require('express-formidable');
app.use(formidableMiddleware({
    // 配置文件上传到哪
    uploadDir: path.join(__dirname, 'www/imgs'),
    keepExtensions: true, //保持后缀，否则图片只有名字没有后缀例如：没有jpg，png
}));

// 管理员的操作
// 登入
app.use(routerLogin);
// 文章管理
app.use(routerArticles);
// 文章删除
app.use(routerDeleteArticles);
// 更新文章
app.use(routerUpdateArticle);
// 添加文章
app.use(routerInsertArticle);
// 批量删除
app.use(routerDeleteArticlesMore);

// 用户的操作
// 用户登入
app.use(routerUserLogin);
// 用户注册
app.use(routerRegister);
// 用户查询
app.use(routerUser);
// 用户信息更改
app.use(routerChangeUser);
// 用户的文章
app.use(routerUserArticles);
// 用户的文章更改
app.use(routerUpdateUserArticle);
// 根据查询文章
app.use(routerArticlesid);


app.listen(3000, () => {
    console.log('node is running');
})