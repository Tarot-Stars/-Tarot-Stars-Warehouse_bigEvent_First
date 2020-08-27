$(function () {
    // 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 获取裁剪区域的 DOM 元素，创建裁剪区域
    $('#image').cropper(options);
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    });
    var layer = layui.layer;
    // 为文件选择框绑定 change 事件
    $('#file').on('change', function (e) {
        // 拿到用户选择的文件
        var fileList = e.target.files;
        if (fileList.length === 0) return layer.msg('请选择要上传的文件');
        // 将文件，转化为路径
        var imgURL = URL.createObjectURL(fileList[0]);
        // 重新初始化裁剪区域
        // 销毁旧的裁剪区域，重新设置图片路径，重新初始化裁剪区域
        $('#image').cropper('destroy').attr('src', imgURL).cropper(options);
    });
    $('#confirmUpload').on('click', function () {
        var dataURL = $('#image').cropper(
            'getCroppedCanvas',
            // 创建一个 Canvas 画布
            {
                width: 100,
                height: 100
            }
        ).toDataURL('image/png,image/jpeg');
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('更换头像成功！');
                window.parent.getUserInfo();
            }
        })
    });
})