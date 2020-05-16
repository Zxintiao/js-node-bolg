var account = getUrlSearch('account');
var id = getUrlSearch('id');
let userID = account;
let host = 'http://localhost:3000'


$('window').ready(function () {
    $.ajax({
        method: "get",
        url: host + "/user",
        dataType: 'json',
        data: {
            account: account,
        },
        success: function (data) {
            if (data.code === 200) {
                $('.photo img')[0].src = data.results[0].photo;
                $('.photo img')[0].name = data.results[0].nickname;
            }
        },
        error: function (data) {
            alert("请求错误");
        }
    })
    if (id != undefined) {
        $.ajax({
            method: "get",
            url: host + "/articlesid",
            dataType: 'json',
            data: {
                id,
            },
            success: function (data) {
                if (data.code === 200) {
                    data = data.results[0];
                    console.log(data);
                    $('input').val(data.title)
                    $('textarea').val(data.content)
                }
            },
            error: function (data) {
                alert("请求错误");
            }
        })
    }
})
// 上传
$('.up_blogs').on('click', () => {
    if (id != undefined) {
        alert('我们正在修改文章！')
    } else {
        if (confirm('确定提交吗？')) {
            let content = $('textarea').val();
            let title = $('input').val();
            let createDate = NowDate();
            let kind = $('option:selected').text();
            switch (kind) {
                case '科学': kind = 0;
                    break;
                case '娱乐': kind = 1;
                    break;
            }
            let nickname = $('.photo img')[0].name;

            if (title == '' && content == '') {
                alert('请输入完整信息！')
            } else {
                $.ajax({
                    method: 'post',
                    url: host + "/insertArticle",
                    dataType: 'json',
                    data: {
                        title,
                        content,
                        kind,
                        createDate,
                        userID,
                        nickname
                    },
                    success: (data) => {
                        if (data.code === 200) {
                            alert('添加成功')
                            location.href = './blogs.html?account=' + account
                        }
                    },
                    error: function (data) {
                        alert('出错了')
                    }
                })
            }
        }
    }


})

// 更改
$('.chang_blogs').on('click', () => {
    if (id == undefined) {
        alert('请先上传文件')
    } else {
        if (confirm('确定修改吗？')) {
            let content = $('textarea').val();
            let title = $('input').val();
            let kind = $('option:selected').text();
            switch (kind) {
                case '科学': kind = 0;
                    break;
                case '娱乐': kind = 1;
                    break;
            }
            if (title == '' && content == '') {
                alert('请输入完整信息！')
            } else {
                $.ajax({
                    method: 'post',
                    url: host + "/updateUserArticle",
                    dataType: 'json',
                    data: {
                        title,
                        content,
                        kind,
                        id
                    },
                    success: (data) => {
                        if (data.code === 200) {
                            alert('添加成功')
                            location.href = './blogs.html?account=' + account
                        }
                    },
                    error: function (data) {
                        alert('出错了')
                    }
                })
            }
        }
    }


})

















function NowDate() {
    function getNow(s) {
        return s < 10 ? '0' + s : s;
    }
    var myDate = new Date();

    var year = myDate.getFullYear();        //获取当前年
    var month = myDate.getMonth() + 1;   //获取当前月
    var date = myDate.getDate();            //获取当前日


    var h = myDate.getHours();              //获取当前小时数(0-23)
    var m = myDate.getMinutes();          //获取当前分钟数(0-59)
    var s = myDate.getSeconds();

    var now = year + '-' + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);
    return now;
}

function getUrlSearch(name) {
    // 未传参，返回空
    if (!name) return null;
    // 查询参数：先通过search取值，如果取不到就通过hash来取
    var after = window.location.search;
    after = after.substr(1) || window.location.hash.split('?')[1];
    // 地址栏URL没有查询参数，返回空
    if (!after) return null;
    // 如果查询参数中没有"name"，返回空
    if (after.indexOf(name) === -1) return null;

    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    // 当地址栏参数存在中文时，需要解码，不然会乱码
    var r = decodeURI(after).match(reg);
    // 如果url中"name"没有值，返回空
    if (!r) return null;

    return r[2];
}