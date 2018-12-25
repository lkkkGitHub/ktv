<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户登录</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<link rel="shortcut icon" href="../../static/logo.png" />
<link href="../../static/css/style/style.css" rel="stylesheet"
	type="text/css" />
<style>
/*滚动条*/
::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}

::-webkit-scrollbar-track-piece {
	background-color: #ccc;
}

body::-webkit-scrollbar-track-piece {
	background-color: #ccc;
}

::-webkit-scrollbar-track-piece:no-button {
	
}

::-webkit-scrollbar-thumb {
	background-color: #F5B5B6;
	border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
	background-color: #F5B5B6;
}

::-webkit-scrollbar-thumb:active {
	background-color: #F5B5B6;
}
/*/滚动条*/
</style>

<script type="text/javascript" src="../../static/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="../../static/js/jquery.js"></script>
<script type="text/javascript"
	src="../../static/js/jquery.i18n.properties-1.0.9.js"></script>
<script type="text/javascript"
	src="../../static/js/jquery-ui-1.10.3.custom.js"></script>
<script type="text/javascript" src="../../static/js/jquery.validate.js"></script>
<script type="text/javascript"
	src="../../static/js/page_regist2.js"></script>
<script src="../../static/js/jquery.cookie.js"></script>
<script src="../../static/js/jquery.base64.js"></script>

<script language="javascript" type="text/javascript">
	function setCookie() { //设置cookie    
		var loginCode = $("#username").val(); //获取用户名信息    
		var pwd = $("#password").val(); //获取登陆密码信息    
		var checked = $("input[type='checkbox']").is(':checked');//获取“是否记住密码”复选框  
		if (checked) { //判断是否选中了“记住密码”复选框    
			$.cookie("username", loginCode);//调用jquery.cookie.js中的方法设置cookie中的用户名    
			$.cookie("pwd", $.base64.encode(pwd));//调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密    
		} else {
			$.cookie("pwd", null);
		}
	}
	function getCookie() { //获取cookie    
		var loginCode = $.cookie("username"); //获取cookie中的用户名    
		var pwd = $.cookie("pwd"); //获取cookie中的登陆密码    
		var pwdlength = $.base64.decode(pwd).length;
		if (pwdlength != 0) {//密码存在的话把“记住用户名和密码”复选框勾选住    
			//alert("123");
			$("[type='checkbox']").attr("checked", "true");
		}
		if (loginCode) {//用户名存在的话把用户名填充到用户名文本框    
			$("#username").val(loginCode);
		}
		if (pwd) {//密码存在的话把密码填充到密码文本框    
			$("#password").val($.base64.decode(pwd));
		}
	}

	/**
	 * 检查并登陆，登陆跳转的地址在from表单上;   149行 from表单，action=“/xxx” 表示成功后跳转的页面；同是会将数据添加到cookie中
	 */
	function checkUserNamePass() {
		if ($("input[type='checkbox']").is(':checked')) {
			//添加cookie    
			setCookie();
		}
		$.ajax({
			url : "/user/login", //(默认: 当前页地址) 发送请求的地址
			type : "post", //(默认: "get") 请求方式 ("post" 或 "get")， 默认为 "get"。注意：其它 http请求方法，如 put和 delete也可以使用，但仅部分浏览器支持。
			async : true,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
			contentType : "application/x-www-form-urlencoded",//(默认: "application/x-www-form-urlencoded") 发送信息至服务器时内容编码类型。默认值适合大多数应用场合。
			data : {
				phone : $("#phone").val(), // 冒号前面 是传回后台的名字，后台以这个接受，冒号后面 是需要传回去的值
				passWord : $("#password").val()
			},
			dataType : 'json',
			success : function(json) {//如果调用servlet成功，响应200。请求成功后回调函数。这个方法有两个参数：服务器返回数据，返回状态(可以缺省)。
				var flag = json;
				if (flag == true) {
					$(".login-error").hide();
					$("#signupForm").submit();
				} else if (flag == false) {
					$(".login-error").show();
					$(".login-error").html($.i18n.prop("用户名或密码错误"));
				} else if (flag == null) {
					$(".login-error").show();
					$(".login-error").html($.i18n.prop("账号异常，请联系管理员"));
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {//如果调用servlet出现问题，响应非200（这里响应405）。通常情况下textStatus和errorThown只有其中一个有值 。(默认: 自动判断 (xml 或 html)) 请求失败时将调用此方法。这个方法有三个参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
				console.log(textStatus);
				$(".login-error").show();
				$(".login-error").html($.i18n.prop("请求失败"));
			}
		});
	}
	function regist(validate) {
		//校验Email, password，校验如果失败的话不提交
		if (validate.form()) {
			checkUserNamePass();
		}
	}
</script>
<body class="loginbody" onload="getCookie();">
	<div id="All-Content2">
		<div class="dataEye">

			<div class="contentleft">
				<a href="/"><img
					src="../../static/img/logo.png"></a>
			</div>
			<div
				style="background: url(../../static/img/bg.png) no-repeat; background-size: cover; width: 1345px;">
				<div class="loginbox registbox"
					style="padding-top: 50px; margin-right: 45px;">
					<div class="login-content reg-content">
						<div class="loginbox-title">
							<h3>登录</h3>
						</div>
						<form id="signupForm" action="/home" method="post">
							<div class="login-error"></div>
							<div class="row" style="margin-left: 25px;">
								<label class="field">号 &nbsp;&nbsp;码：</label> <input
									style="width: 235px; margin-left: 65px;" type="text" value=""
									class="input-text-user noPic input-click" name="phone"
									id="phone" placeholder="请输入号码">
							</div>
							<div class="row">
								<label class="field">密 &nbsp;&nbsp;码：</label> <input
									style="width: 235px; margin-left: 65px;" type="password"
									value="" class="input-text-password noPic input-click"
									name="password" id="password" placeholder="设置的账号登陆密码">
							</div>
							<div style="float: left; margin-left: 32px;">
								<input type="checkbox" /> <span
									style="color: blue; vertical-align: middle;">记住密码</span>
							</div>
							<div>
								<a href="/forgetPassword"
									style="float: right; margin-right: 40px; text-decoration: none;">忘记密码？</a>
							</div>
							
							<div class="row btnArea">
								<a style="background-color: #1969B1;" class="login-btn" id="submit" onclick="regist(validate)">登录</a>
							</div>
						</form>
					</div>
					<div class="go-regist">
						没有帐号,请<a href="/regist" class="link">注册</a>
					</div>
				</div>
			</div>
			<div id="footer">
				<div class="dblock">
					<div class="inline-block1" style="padding-top: 6px;">
						<img src="../../static/logo.png" width="75" height="50">
					</div>
					<div class="inline-block copyright" style="padding-top: 30px;">
						<a href="#" style="text-decoration: none">关于我们</a> | <a href="#"
							style="text-decoration: none">QQ</a> | <a href="#"
							style="text-decoration: none">隐私政策</a> | <a href="#"
							style="text-decoration: none">说明</a>
						<p>Copyright © 2018 LoveMusic</p>
						<p>
							<a href="http://www.miitbeian.gov.cn"
								style="text-decoration: none">鲁ICP备18010745号</a>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="loading">
			<div class="mask"></div>
		</div>
	</div>
</body>
</html>