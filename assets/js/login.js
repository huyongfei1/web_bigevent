$(function() {
    //点击注册账号事件
    $("#link-reg").on('click', function() {
            $(".login-box").hide()
            $(".reg-box").show()
        })
        //点击去登陆事件
    $("#link-login").on('click', function() {
            $(".reg-box").hide()
            $(".login-box").show()
        })
        //自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            repwd: function(value) {
                var pwd = $(".reg-box [name=password]").val()
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }
        })
        //监听注册表单的提交事件
    $("#form-reg").on('submit', function(e) {
        e.preventDefault()
        var data = { username: $('#form-reg [name = username]').val(), password: $('#form-reg [name = password]').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.staus !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功！')
            $("#link-login").click()
        })
    })
    $("#form-login").submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登陆成功')
                    //将token的值存入本地
                localStorage.setItem('token', res.token)
                    //跳转到后台
                location.href = '/index.html'
            }
        })

    })
})