$(function () {
    //进到页面就获取用户详情
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        success: function (backData) {
            if (backData.code == 200) {
                // console.log(backData);
                // $('input.email').val(backData.data.email);
                // $('input.username').val(backData.data.username);
                // $('input.nickname').val(backData.data.nickname);
                // $('input.password').val(backData.data.password);
                for (var key in backData.data) {
                    $('input.' + key).val(backData.data[key]);
                }
                $('.user_pic').attr('src', backData.data.userPic);
            }
        }
    });

    //图片预览
    $('#exampleInputFile').on('change', function () {
        var fileIcon = this.files[0];
        var imgUrl = URL.createObjectURL(fileIcon);
        $('.user_pic').attr('src', imgUrl);
    });
    //发送ajax请求，保存当前修改的用户信息
    $('button.btn-edit').on('click', function (e) {
        e.preventDefault();
        var fd = new FormData($('#form')[0]);
        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    alert('修改成功');
                    //第一种方法，刷新父页面
                    // parent.window.location.reload();
                    //第二种方法，重新发送请求
                    $.ajax({
                        type: 'get',
                        url: window.BigNew.user_info,
                        // headers:{
                        //     Authorization:window.localStorage.getItem('token')
                        // },
                        success: function (backData) {
                            if (backData.code == 200) {
                                parent.$('.user_info > img').attr('src', backData.data.userPic);
                                parent.$('.user_info > span > i').text(backData.data.nickname);
                                parent.$('.user_center_link > img').attr('src', backData.data.userPic);
                            }
                        }
                    });
                }
            }
        });
    });

});