let host = 'http://localhost:3000'
$('input').on('focus', (e) => {
    let pre = e.target.previousElementSibling;
    pre.className = 'pre'
    pre.style.transition = 'all 0.2s';
})
$('input').on('blur', (e) => {
    if (e.target.value != '') {
    } else {
        let pre = e.target.previousElementSibling;
        pre.className = ''
        pre.style.transition = 'all 0.2s';
    }
})

$('.Account>input').on('input', (e) => {
    var reg = /^[\w|']{1,10}$/g
    let username = e.target.value;
    let userHint = e.target.nextElementSibling;
    if (reg.test(username)) {
        userHint.innerHTML = '';
    } else {
        userHint.innerHTML = '账号格式不正确';
    }
    if (username == '') {
        userHint.innerHTML = '';
    }
})
$('.register').on('click', () => {
    location.href = './register.html'
})

$('button').on('click', (e) => {
    e.preventDefault();
    let username = $(".Account>input").val();
    let niname = $(".Name>input").val();
    let password = $(".Password>input").val();
    $.ajax({
        method: "post",
        url: host + "/userLogin",
        dataType: 'json',
        data: {
            account: username,
            password: password
        },
        success: function (data) {
            if (data.code === 200) {
                location.href = './index.html?account=' + data.item.account
            } else {
                alert('账号或密码错误')
                $(".Account>input").val('');
                $(".Name>input").val('');
                $(".Password>input").val('');
            }
        },
        error: function (data) {
            alert("请求错误");
        }
    })
})
