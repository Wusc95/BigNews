$(function () {
    $.ajax({
        type: 'get',
        url: window.BigNew.user_info,
        // headers:{
        //     Authorization:window.localStorage.getItem('token')
        // },
        success: function (backData) {
            if (backData.code == 200) {
                $('.user_info > img').attr('src', backData.data.userPic);
                $('.user_info > span > i').text(backData.data.nickname);
                $('.user_center_link > img').attr('src', backData.data.userPic);
            }
        }
    });
    /*原生js发送带token的请求*/
    // var xhr = new XMLHttpRequest();
    // xhr.open('get','http://localhost:8080/api/v1/admin/user/info');
    // xhr.setRequestHeader('Authorization',window.localStorage.getItem('token'));
    // xhr.onload = function(){
    //     console.log(xhr.response);
    // }
    // xhr.send();

    //退出，给退出按钮设置一个点击事件，清除token,并返回登录页
    $('.logout').on('click', function (e) {
        e.preventDefault();
        window.localStorage.removeItem('token');
        window.location.href = './login.html';
    });

    // console.log($('.level01 '));
    
    //点击每一个导航栏的时候切换背景色
    $('.level01 ').on('click',function(e){
        // console.log($(this));
        $(this).addClass('active').siblings('div').removeClass('active');
         //小三角旋转
         $(this).find('b').toggleClass('rotate0');
       
        if($(this).next().hasClass('level02')){
            //点击第二个导航条的时候，显示隐藏的ul
            $(this).next().slideToggle(500);
            //显示出来之后默认触发ul中的第一个li
            $('.level02 > li > a')[0].click();
           
        }else{
            $('.level02 > li').removeClass('active');
        }
    });
    //点击文章列表里的选项的时候，切换背景色
    $('.level02 > li').on('click',function(){
        $(this).addClass('active').siblings('li').removeClass('active');
    });
});