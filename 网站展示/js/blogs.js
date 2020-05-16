var account = getUrlSearch('account');
let userID = account;
let host = 'http://localhost:3000'
$('.home').on('click', () => {
    location.href = './index.html?account=' + account;
})
$('.blogs').on('click', () => {
    location.href = './blogs.html?account=' + account;
})
$('window').ready(function () {
    if (account === null || account === 'null') {
        $('.userinfo').css({ display: 'block' })
        $('.userLogin').css({ display: 'none' })
    } else {
        $('.userinfo').css({ display: 'none' })
        $('.userLogin').css({ display: 'block' })
        $.ajax({
            method: "get",
            url: host + "/user",
            dataType: 'json',
            data: {
                account: account,
            },
            success: function (data) {
                if (data.code === 200) {
                    $('.userLogin img')[0].src = data.results[0].photo;
                }
            },
            error: function (data) {
                alert("请求错误");
            }
        })
        console.log(userID);
        // 渲染文章
        $.ajax({
            method: 'post',
            url: host + '/userArticles',
            dataType: 'json',
            data: {
                userID
            },
            success: (data) => {
                if (data.code == 200) {
                    data = data.results;
                    console.log(data);
                    let str = '';
                    data.forEach((item, index) => {
                        str += `<li>
                        <div class="title">
                            <span name="${item.id}" onclick="change(this)">${item.title}</span>
                        </div>
                        <div class="info clearFix">
                            <div class="info_left">
                                <span>${item.createDate}</span>
                                <p class="iconfont icon-changyongicon-"></p>
                                <span>${item.readsNum}</span>
                                <p class="iconfont icon-liaotian"></p>
                                <span>0</span>
                            </div>
                            <div class="info_right" >
                                <span name="${item.id}" onclick="change(this)">更改</span>
                                <span name="${item.id}" onclick="del(this)">删除</span>
                            </div>
                        </div>
                    </li>`
                    })
                    $('.active_list').append(str)
                }
            },
            error: (data) => {
                console.log('请求失败！');
            }
        })
    }
})
// 登入
$('.write_blogs').on('click', () => {
    if (account == null || account == 'null') {
        location.href = './login.html'
    } else {
        location.href = './writeBlogs.html?account=' + account;
    }
})
$('.userinfo').on('click', () => {
    location.href = './login.html';
})
$('.userLogin').on('click', () => {
    location.href = './user.html?account=' + account;
})

$('.userLogin').on('mouseenter', () => {
    $('.userLogin>ul').fadeToggle(500)
})
$('.userLogin').on('mouseleave', () => {
    $('.userLogin>ul').fadeToggle(500)
})
// change
$('.change').on('click', () => {
    $('.user_right').css({ display: 'none' })
    $('.alter').css({ display: 'block' })
    $('.Anickname>input').val($('.nickname').text());
})
$('.cancel').on('click', () => {
    $('.user_right').css({ display: 'block' })
    $('.alter').css({ display: 'none' })
})
function del(e) {
    console.log(e.getAttribute('name'));
    let id = e.getAttribute('name');
    if (confirm("确定删除吗")) {
        $.ajax({
            url: host + "/deleteArticles",
            method: 'get',
            data: { id: id },
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    alert("删除成功")
                    location.href = './blogs.html?account=' + account;
                }
            },
            error: function (data) {
                alert('出错了')
            }
        })
    }
}
function change(e) {
    let id = e.getAttribute('name');
    location.href = './writeBlogs.html?account=' + account + '&id=' + id;
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