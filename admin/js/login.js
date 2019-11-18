$(function () {
    $('.input_sub').on('click', function (e) {
      e.preventDefault();
      var userName = $('.input_txt').val().trim();
      var userPass = $('.input_pass').val().trim();
      if (userName == "" || userPass == "") {
        // alert('用户名密码不能为空！！！')
        $('.modal-body').text('用户名密码不能为空！！！');
        $('#myModal').modal({
          keyboard: true
        });
        return;
      }
      $.ajax({
        type: 'post',
        url: window.BigNew.user_login,
        data: {
          username: userName,
          password: userPass
        },
        success: function (backData) {
          console.log(backData);
          $('.modal-body').text(backData.msg);
          $('#myModal').modal({
            keyboard: true
          });
          if (backData.code == 200) {
            window.localStorage.setItem('token',backData.token);
            $('#myModal').on('hidden.bs.modal', function (e) {
              window.location.href = './index.html';
            })
          }
        }
      });
    });
  });