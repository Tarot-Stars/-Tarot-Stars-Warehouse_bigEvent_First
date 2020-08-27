// 开发环境服务器地址
var developmentURL = 'http://ajax.frontend.itheima.net';
// 测试环境服务器地址
var testURL = 'http://ajax.frontend.itheima.net';
// 生产环境服务器地址
var productionURL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = developmentURL + options.url;
    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 不论成功还是失败，最终都会调用 complete 回调函数
    options.complete = function (res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token');
            // 2. 强制跳转到登录页面
            location.href = '/login.html';
        }
    }
});
