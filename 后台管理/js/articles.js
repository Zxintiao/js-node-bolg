let host = 'http://192.168.0.110:3000'
$.ajax({
    method: 'get',
    url: host + '/articles',
    dataType: 'json',
    data: {},
    success: (data) => {
        if (data.code === 200) {
            let articles = data.results;
            let str = '';
            data.results.forEach((data, index) => {
                str += `
                <tr>
                <td class="one">
                <input type="checkbox" id="${articles[index].id}a" name="false" value="">
                </td>
                <td class="two">${articles[index].title}</td>
                <td class="three">${articles[index].createDate}</td>
                <td class="four">${articles[index].readsNum}</td>
                <td class="five">${articles[index].likes}</td>
                <td class="six">${articles[index].content}</td>
                <td class="seven">${articles[index].kind}</td>
                <td class="eight">${articles[index].userID}</td>
                <td class="nine">
                <button class="${articles[index].id}" onclick="btn_del(this)">删除</button>
                <button id="${articles[index].id}" onclick="update(this)">更新</button>
                </td>
                </tr>
                `
            })
            $('.articles_list>tbody').append(str);
        }
    },
    error: (data) => {
        alert('请求失败')
    }
})

// 删除
function btn_del(e) {
    var id = $(e)[0].getAttribute('class');
    if (confirm("确定删除吗")) {
        $.ajax({
            url: host + "/deleteArticles",
            method: 'get',
            data: { id: id },
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    alert("删除成功")
                    location.href = "./articles.html"
                }
            },
            error: function (data) {
                alert('出错了')
            }
        })
    }
}
// 更新
function update(e) {
    var id = $(e)[0].getAttribute('id');
    var title = $(e).parent().parent().children()[1].innerHTML;
    var content = $(e).parent().parent().children()[5].innerHTML;
    var kind = $(e).parent().parent().children()[6].innerHTML;
    var createDate = $(e).parent().parent().children()[2].innerHTML;
    $('.layer').css({ display: 'block' });
    $('#uparticle').css({ display: 'block' });
    title = $('#articlename').val(title);
    content = $('#articlecontent').val(content);
    kind = $('#articlekind').val(kind);
    createDate = $('#articletimedata').val(createDate);
    $('.upPutIn').on('click', (e) => {
        e.preventDefault();
        title = $('#articlename').val();
        content = $('#articlecontent').val();
        kind = $('#articlekind').val();
        createDate = $('#articletimedata').val();
        $.ajax({
            method: 'get',
            url: host + "/updateArticle",
            dataType: 'json',
            data: {
                id,
                title,
                content,
                kind,
                createDate
            },
            success: (data) => {
                if (data.code === 200) {
                    alert('更新成功')
                    location.href = "./articles.html"
                }
            },
            error: function (data) {
                alert('出错了')
            }

        })
    })
}
$('.noIn').on('click', () => {
    $('.layer').css({ display: '' });
    $('.articleAdd').css({ display: '' });
})

// 添加
$('.btn_push').on('click', (e) => {
    e.preventDefault();
    $('.layer').css({ display: 'block' });
    $('#articleAdd').css({ display: 'block' });

    // console.log(title,content,kind,userID);


    $('.addPutIn').on('click', () => {
        var title = $('#title').val();
        var content = $('#content').val();
        var kind = $('#kind').val();
        var userID = $('#userID').val();
        var createDate = NowDate();

        $.ajax({
            method: 'post',
            url: host + "/insertArticle",
            dataType: 'json',
            data: {
                title,
                content,
                kind,
                createDate,
                userID
            },
            success: (data) => {
                if (data.code === 200) {
                    alert('添加成功')
                    location.href = "./articles.html"
                }
            },
            error: function (data) {
                alert('出错了')
            }
        })
    })
})

// 批量删除
$('.delete_more').on('click', function () {
    if (confirm('确定删除吗?')) {
        var IDs = '';
        for (var i = 0; i < $('input:checked').length; i++) {
            var ids = $('input:checked')[i].getAttribute('id');
            ids = ids.slice(0, ids.length - 1);
            IDs += ids + ','
        }
        IDs = IDs.slice(0, IDs.length - 1);
        console.log(IDs);
        $.ajax({
            method: 'get',
            url: host + "/deleteArticlesMore",
            dataType: 'json',
            data: { IDs },
            success: function (data) {
                console.log('删除成功');
                location.href = "./articles.html"
            },
            error: function (data) {
                alert('出错了')
            }
        })
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


