var account = getUrlSearch('account');
let host = 'http://localhost:3000'
$('.home').on('click', () => {
    location.href = './index.html?account=' + account;
})
// 页面判断
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
    }
    // ajax请求，渲染页面
    $.ajax({
        method: 'get',
        url: host + '/articles',
        dataType: 'json',
        data: {},
        success: (data) => {
            if (data.code == 200) {
                data = data.results;
                let str = '';
                data.forEach((item, index) => {
                    console.log(item.photo);
                    
                    str += ` <li>
            <div class="title">
                <h2>${item.title}</h2>
                <span onclick="btn_del(this)">x</span>
            </div>
            <div class="summary">
            ${item.content}
            </div>
            <div class="user_list">
                <div class="clearFix">
                    <dt>
                        <img src="${item.photo}" alt="">
                    </dt>
                    <div class="user_name">${item.nickname}</div>
                </div>

                <div class="clearFix">
                    <section class="likes">
                        <span class="iconfont icon-zan"></span>
                        <p>${item.likes}</p>
                    </section>
                    <section>|</section>
                    <section class="reads">
                        <span class="iconfont icon-changyongicon-"></span>
                        <p>${item.readsNum}</p>
                    </section>
                    <section>|</section>
                    <section class="talk">
                        <span class="iconfont icon-liaotian"></span>
                        <p>0</p>
                    </section>
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
})
// 页面特效
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

// 搜索
let searchArr = ['android', 'java', 'python', 'html', 'react']
$('.search').on('click', (e) => {
    e.stopPropagation();
    e.cancelBubble = true;
    $('.searchList')[0].innerHTML = ''
    $('.searchList')[0].style.display = 'block'
    searchArr.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = item;
        li.onclick = function () {
            console.log(123);
            $('.search').val(item)
        }
        $('.searchList')[0].appendChild(li);
    })
})

document.onclick = function () {
    $('.searchList')[0].style.display = 'none'
};



// 轮播
let box = $('.round>ul')[0]
let imgList = $('.round>ul>li');
let btns = $('.btn_control>p');
var index = 0;
var flag = true
function nextShow() {
    if (flag) {
        flag = false
        index++;
        if (index >= imgList.length - 1) {
            btns.attr('class', '')
            btns.children().css({ display: 'none' })
            btns[0].className = 'active';
            btns[0].children[0].style.display = 'block';
        } else {
            btns.attr('class', '')
            btns.children().css({ display: 'none' })
            btns[index].className = 'active';
            btns[index].children[0].style.display = 'block';
        }
        let timer = setInterval(() => {
            box.style.left = parseInt(window.getComputedStyle(box, null).left) - 10 + 'px'
            if (parseInt(box.style.left) <= -(index * 508)) {
                clearInterval(timer)
                box.style.left = -(index * 508) + 'px'
                if (index >= imgList.length - 1) {
                    index = 0;
                    box.style.left = 0;
                }
                flag = true
            }
        }, 16.7)
    }
}
function prevShow() {
    if (flag) {
        flag = false
        index--;
        if (index < 0) {
            index = imgList.length - 1;
            box.style.left = (-index * 508 + 'px');
            index--
        }
        btns.attr('class', '')
        btns.children().css({ display: 'none' })
        btns[index].className = 'active';
        btns[index].children[0].style.display = 'block';
        let timer = setInterval(() => {
            box.style.left = parseInt(window.getComputedStyle(box, null).left) + 10 + 'px'
            if (parseInt(box.style.left) >= -(index * 508)) {
                clearInterval(timer)
                box.style.left = -(index * 508) + 'px'
                flag = true
            }
        }, 16.7)
    }
}
$('.btn_prv').on('click', () => {
    prevShow();
});
$('.btn_next').on('click', () => {
    nextShow()
});
btns.on('click', (e) => {
    btns.attr('class', '')
    btns.children().css({ display: 'none' })
    e.target.classList.add('active');
    e.target.children[0].style.display = 'block';
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].className == 'active') {
            index = i;
            box.style.left = - (index * 508) + 'px';
            return
        }
    }
})
// 阻止事件委托
$('.btn_control a').on('click', (e) => {
    e.stopPropagation();
    e.cancelBubble = true;
})

var timer = setInterval(function show() {
    nextShow()
}, 4000);

$('.round').on('mouseenter', () => {
    clearInterval(timer)
})
$('.round').on('mouseleave', () => {
    timer = setInterval(function show() {
        nextShow()
    }, 4000);
})



function btn_del(e) {
    let ul = e.parentElement.parentElement.parentElement;
    let li = e.parentElement.parentElement;
    $(li).slideUp(600);
}
// picture_ad 消失轮播
let Pbtns = $('.picture_btn>li');
let pindex = 0
$('.picture_btn>li').on('click', (e) => {
    Pbtns.attr('class', '')
    e.target.classList.add('active_picture');
    for (var i = 0; i < Pbtns.length; i++) {
        if (Pbtns[i].className == 'active_picture') {
            pindex = i;
            $('.picture_ad>li').attr('class', '');
            $('.picture_ad>li')[pindex].setAttribute('class', 'pshow');
            var li = $('.picture_ad>li')[pindex];
            li.style.opacity = 0.3
            var timer = setInterval(() => {
                li.style.opacity = parseFloat(window.getComputedStyle(li, null).opacity) + 0.05
                if (li.style.opacity >= 1) {
                    clearInterval(timer)
                    li.style.opacity = 1;
                }
            }, 80)
        }
    }
})

function pictureShow() {
    pindex++;
    if (pindex >= 4) {
        pindex = 0
    }
    Pbtns.attr('class', '');
    Pbtns[pindex].classList.add('active_picture');
    $('.picture_ad>li').attr('class', '');
    $('.picture_ad>li')[pindex].setAttribute('class', 'pshow');
    var li = $('.picture_ad>li')[pindex];
    li.style.opacity = 0.3
    var timer = setInterval(() => {
        li.style.opacity = parseFloat(window.getComputedStyle(li, null).opacity) + 0.05
        if (li.style.opacity >= 1) {
            clearInterval(timer)
            li.style.opacity = 1;
        }
    }, 80)
}
var Ptimer = setInterval(() => {
    pictureShow()
}, 5000);
$('.picture_ad').on('mouseenter', () => {
    clearInterval(Ptimer)
})
$('.picture_ad').on('mouseleave', () => {
    Ptimer = setInterval(() => {
        pictureShow()
    }, 5000);
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