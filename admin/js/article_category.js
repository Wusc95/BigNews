$(function () {
    //进入页面，获取所有文章类别

    getData();
    function getData() {
        $.ajax({
            type: 'get',
            url: BigNew.category_list,
            success: function (backData) {
                if (backData.code == 200) {
                    // console.log(backData);
                    var NewHtml = template('category_list', backData);
                    $('tbody').html(NewHtml);
                }
            }
        });
    }
    //判断点击的是编辑框还是新增框
    $('#exampleModal').on('shown.bs.modal', function (e) {
        if (e.relatedTarget == $('#xinzengfenlei')[0]) {
            $('#exampleModalLabel').text('新增类别');
            $('button.edit').text('新增').removeClass('btn-success').addClass('btn-primary');
            $('.modal-body form')[0].reset();
        } else {
            $('#exampleModalLabel').text('修改类别');
            $('button.edit').text('编辑').removeClass('btn-primary').addClass('btn-success');
            //点击编辑按钮的时候，需要把当前内容放到编辑框内
            $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text());
            $('#message-text').val($(e.relatedTarget).parent().prev().text());
            $('#category_id').val($(e.relatedTarget).attr('data-id'));
        }
    })
    //给取消按钮注册点击事件
    $('#cancle').on('click', function () {
        $('.modal-body form')[0].reset();
    });
    //点击 新增/编辑 按钮注册点击事件
    $('.edit').on('click', function () {
        if ($(this).text() == '编辑') {
            // alert('编辑');
            var name = $('#recipient-name').val().trim();
            var slug = $('#message-text').val().trim();
            var id = $('#category_id').val().trim();
            //如果表单数据过多的话，一个一个获取太麻烦
            var data = $('form').serialize();
            $.ajax({
                type: 'post',
                url: BigNew.category_edit,
                // data: {
                //     id: id,
                //     name: name,
                //     slug: slug
                // },
                data: data,
                success: function (backData) {
                    if (backData.code == 200) {
                        $('#cancle').trigger('click');
                        getData();
                    }
                    console.log(backData);
                }

            })
        } else {
            // alert('新增');
            var name = $('#recipient-name').val().trim();
            var slug = $('#message-text').val().trim();
            if (name == '' || slug == '') {
                alert('名称或别名不能为空');
                return;
            }
            $.ajax({
                type: 'post',
                url: BigNew.category_add,
                data: {
                    name: name,
                    slug: slug
                },
                success: function (backData) {
                    // console.log(backData);
                    if (backData.code == 201) {
                        $('#cancle').trigger('click');
                        getData();
                    }
                }
            })
        }
    });
    //点击删除按钮，删除当前数据
    $('tbody').on('click', '#delete', function () {
        // console.log($(this).attr('data-id'));
        var id = $(this).attr('data-id');
        var that = $(this);
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: id
            },
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 204) {
                    //移出删除的数据
                    // that.parent().parent().remove();
                    //也可以重新发送请求
                    getData();
                }

            }
        });

    });
})