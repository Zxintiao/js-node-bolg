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


// $('.Password>input').on('input', (e) => {
//     let span = e.target.nextElementSibling;
//     let ipt = e.target;

//     var regN = /\d/g
//     var regW = /[a-zA-Z]/g
//     var regM = /[\W_]/g
//     if (ipt.value.length > 12) {
//         span.innerText = '密码位数不能高于12位'
//         span.style.color = 'red'
//     } else if (ipt.value.length >= 9) {
//         if (regN.test(ipt.value) && regW.test(ipt.value) && regM.test(ipt.value)) {
//             span.innerText = '密码安全系数高'
//             span.style.color = 'green'
//         }
//         else if ((regN.test(ipt.value) && regW.test(ipt.value)) || (regN.test(ipt.value) && regM.test(ipt.value)) || (regW.test(ipt.value) && regM.test(ipt.value))) {
//             span.innerText = '密码安全系数正常'
//             span.style.color = 'green'
//         } else {
//             span.innerText = '密码安全系数过低'
//             span.style.color = 'rgb(255, 217, 0)'
//         }
//     } else if (ipt.value.length >= 6) {
//         if ((regN.test(ipt.value) && regW.test(ipt.value)) || (regN.test(ipt.value) && regM.test(ipt.value)) || (regW.test(ipt.value) && regM.test(ipt.value))) {
//             span.innerText = '密码安全系数正常'
//             span.style.color = 'green'
//         } else {
//             span.innerText = '密码安全系数过低'
//             span.style.color = '#ffd900'
//         }
//     } else if (ipt.value.length < 6 && ipt.value.length > 0) {
//         span.innerText = '密码位数不能低于6位'
//         span.style.color = 'red'
//     } else if (ipt.value.length == 0) {
//         span.innerHTML = ''
//         span.style.color = ''
//     }
// })

// $('button').on('click', (e) => {

//     let user = $('.Account>p').val();
//     let pass = $('.Password>p')[0].style.color;
//     if (user == '' && pass == 'rgb(255, 217, 0)' || pass == 'green') {
//         e.preventDefault();
//         let username = $(".Account>input").val();
//         let niname = $(".Name>input").val();
//         let password = $(".Password>input").val();
//         console.log(username);
//         console.log(password);

//         $.ajax({
//             method: "post",
//             url: "http://192.168.0.110:3000/login",
//             dataType: 'json',
//             data: {
//                 account: username,
//                 password: password
//             },
//             success: function (data) {
//                 console.log('11111111111');
//                 if (data.code === 200) {
//                     location.href = './index.html'
//                 } else {
//                     alert('账号或密码错误')
//                     $(".Account>input").val('');
//                     $(".Name>input").val('');
//                     $(".Password>input").val('');
//                 }
//             },
//             error: function (data) {
//                 alert("请求错误");
//             }
//         })
//     } else {
//         e.preventDefault();
//     }
// })
$('button').on('click', (e) => {
    e.preventDefault();
    let username = $(".Account>input").val();
    let niname = $(".Name>input").val();
    let password = $(".Password>input").val();
    $.ajax({
        method: "post",
        url: "http://192.168.0.110:3000/login",
        dataType: 'json',
        data: {
            account: username,
            password: password
        },
        success: function (data) {
            if (data.code === 200) {
                location.href = './index.html'
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
