var account = getUrlSearch('account');
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
                    console.log(data);

                    $('.userLogin img')[0].src = data.results[0].photo;
                    $('.user_photo img')[0].src = data.results[0].photo;
                    $('.account')[0].innerHTML = data.results[0].account;
                    $('.nickname')[0].innerHTML = data.results[0].nickname;
                    if (data.results[0].sex == undefined) {
                        $('.sex')[0].innerHTML = ''
                    } else {
                        $('.sex')[0].innerHTML = data.results[0].sex;
                    }
                }
            },
            error: function (data) {
                alert("请求错误");
            }
        })
    }
    $('main').css({left:0})
})
$('.userLogin').on('mouseenter', () => {
    $('.userLogin>ul').fadeToggle(500)
})
$('.userLogin').on('mouseleave', () => {
    $('.userLogin>ul').fadeToggle(500)
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
// 修改个人信息
$('.ensure').on('click', () => {
    let nickname = $('.Anickname>input').val();
    let sex = $('.Asex>input').attr('class');
    if (sex == '') {
        sex = '女'
    } else if (sex === 'acac') {
        sex = '男'
    }

    if (sex != undefined) {
        $.ajax({
            method: "post",
            url: host + "/changeUser",
            dataType: 'json',
            data: {
                nickname: nickname,
                sex: sex,
                account: account
            },
            success: function (data) {
                if (data.code === 200) {
                    location.href = './user.html?account=' + account;
                }
            },
            error: function (data) {
                alert("请求错误");
            }
        })
    }
})
$('.Asex>input').on('click', (e) => {
    $('.Asex>input').attr('class', '')
    $('.Asex>.Asex_m').css({ color: '#000' })
    $('.Asex>.Asex_w').css({ color: '#000' })
    e.target.classList.add('acac');
    e.target.nextElementSibling.style.color = '#409eff';
})

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