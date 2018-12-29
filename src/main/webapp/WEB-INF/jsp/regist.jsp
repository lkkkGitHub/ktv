<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>注册</title>
<link rel="shortcut icon" href="../../static/logo.png" />
<link type="text/css" rel="stylesheet"
	href="../../static/regist/css/bootstrap.min.css">
<link type="text/css" rel="stylesheet"
	href="../../static/regist/css/gloab.css">
<link type="text/css" rel="stylesheet"
	href="../../static/regist/css/index.css">
<link href="../../static/regist/pictureYanZheng/css/jquery.idcode.css"
	type="text/css" rel="stylesheet">
<link href="../../static/regist/css/style.css" rel="stylesheet"
	type="text/css" />
<script type="text/javascript"
	src="../../static/regist/js/jquery-1.11.1.min.js"></script>

<script type="text/javascript" src="../../static/regist/register.js"></script>

<script
	src="../../static/regist/pictureYanZheng/js/jquery-1.12.3.min.js"></script>
<script src="../../static/regist/pictureYanZheng/js/jquery.idcode.js"></script>
</head>

<script type="text/javascript">
	
</script>

<body class="bgf4">

	<div class="login-box f-mt10 f-pb50">
		<div class="main bgf">
			<div class="reg-box-pan display-inline">
				<div class="step">
					<ul>
						<li class="col-xs-4 on"><span class="num"><em
								class="f-r5"></em><i>1</i></span> <span class="line_bg lbg-r"></span>
							<p class="lbg-txt">填写账户信息</p></li>
						<%--<li class="col-xs-4"><span class="num"><em--%>
								<%--class="f-r5"></em><i>2</i></span> <span class="line_bg lbg-l"></span> <span--%>
							<%--class="line_bg lbg-r"></span>--%>
							<%--<p class="lbg-txt">验证账户信息</p></li>--%>
						<li class="col-xs-4"><span class="num"><em
								class="f-r5"></em><i>3</i></span> <span class="line_bg lbg-l"></span>
							<p class="lbg-txt">注册成功</p></li>
					</ul>
				</div>

				<div class="reg-box" id="verifyCheck" style="margin-top: 20px;">
					<div class="part1">
						<div class="item col-xs-12">
							<span class="intelligent-label f-fl"><b class="ftx04">*</b>用户名：</span>
							<div class="f-fl item-ifo">
								<input type="text" maxlength="20" class="txt03 f-r3 required"
									tabindex="1"
									data-valid="isNonEmpty||between:3-20||isUname||isUserNameYan"
									data-error="用户名不能为空||用户名长度3-20位||只能输入字母、数字、下划线，且以英文字母开头||用户名已注册"
									id="uname" /> <span class="ie8 icon-close close hide"></span>
								<label class="icon-sucessfill blank hide"></label> <label
									class="focus"><span>3-20位，英文字母、数字、下划线的组合，以英文字母开头</span></label>
								<label class="focus valid" id="xianshi"></label>
							</div>
						</div>

						<div class="item col-xs-12">
							<span class="intelligent-label f-fl"><b class="ftx04">*</b>手机号：</span>
							<div class="f-fl item-ifo">
								<input type="text" class="txt03 f-r3 required" keycodes="tel"
									   tabindex="3" data-valid="isNonEmpty||isPhone||isPhoneYan"
									   data-error="手机号码不能为空||手机号码格式不正确||手机号已被绑定，请更换" maxlength="11"
									   id="phone" /> <span class="ie8 icon-close close hide"></span>
								<label class="icon-sucessfill blank hide"></label> <label
									class="focus">请填写11位有效的手机号码</label> <label class="focus valid"></label>
							</div>
						</div>

						<%--<div class="item col-xs-12">--%>
							<%--<span class="intelligent-label f-fl"><b class="ftx04">*</b>邮箱：</span>--%>
							<%--<div class="f-fl item-ifo">--%>
								<%--<input type="text" class="txt03 f-r3 required" keycodes="email"--%>
									<%--tabindex="2"--%>
									<%--data-valid="isNonEmpty||isEmail||isEmailBindingYan"--%>
									<%--data-error="邮箱不能为空||邮箱格式不正确||邮箱已被绑定，请更换" id="email" /> <span--%>
									<%--class="ie8 icon-close close hide"></span> <label--%>
									<%--class="icon-sucessfill blank hide"></label> <label--%>
									<%--class="focus">请填写用户本人邮箱地址</label> <label class="focus valid"></label>--%>
							<%--</div>--%>
						<%--</div>--%>
						
						<div class="item col-xs-12">
							<span class="intelligent-label f-fl"><b class="ftx04">*</b>性别：</span>
							<div class="f-fl item-ifo">
								<!--  <input type="text" maxlength="10" class="txt03 f-r3 required" tabindex="1" data-valid="isNonEmpty||between:2-10||isZh" data-error="真实姓名不能为空||真实姓名长度2-10位||只能输入中文" id="adminNo2" />   
                           -->
								<input type='radio' name='sex' value='0' checked="checked" id='sex'> 男 <input
								 	id='sex' type='radio' name='sex' value='1' > 女 <input
									 id='sex' type='radio' name='sex' value='2' > 保密
									<span class="ie8 icon-close close hide"></span> <label
									class="icon-sucessfill blank hide"></label> <label
									class="focus"></label> <label class="focus valid"></label>
							</div>
						</div>
						
						<!-- <div class="item col-xs-12">
							<span class="intelligent-label f-fl"><b class="ftx04">*</b>手机号：</span>
							<div class="f-fl item-ifo">
								<input type="text" class="txt03 f-r3 required" keycodes="tel"
									tabindex="3" data-valid="isNonEmpty||isPhone||isPhoneYan"
									data-error="手机号码不能为空||手机号码格式不正确||手机号已被绑定，请更换" maxlength="11"
									id="phone" /> <span class="ie8 icon-close close hide"></span>
								<label class="icon-sucessfill blank hide"></label> <label
									class="focus">请填写11位有效的手机号码</label> <label class="focus valid"></label>
							</div>
						</div>
						-->
						<div class="item col-xs-12">
							<span class="intelligent-label f-fl"><b class="ftx04">*</b>密码：</span>
							<div class="f-fl item-ifo">
								<input type="password" id="password" maxlength="20"
									class="txt03 f-r3 required" tabindex="4"
									style="ime-mode: disabled;" onpaste="return  false"
									autocomplete="off"
									data-valid="isNonEmpty||between:6-20||level:2"
									data-error="密码不能为空||密码长度6-20位||该密码太简单，有被盗风险，建议字母+数字的组合" /> <span
									class="ie8 icon-close close hide" style="right: 55px"></span> <span
									class="showpwd" data-eye="password"></span> <label
									class="icon-sucessfill blank hide"></label> <label
									class="focus">6-20位英文（区分大小写）、数字、字符的组合</label> <label
									class="focus valid"></label> <span class="clearfix"></span> <label
									class="strength"> <span class="f-fl f-size12">安全程度：</span>
									<b><i>弱</i><i>中</i><i>强</i></b>
								</label>
							</div>
						</div>
						<div class="item col-xs-12">
							<span class="intelligent-label f-fl"><b class="ftx04">*</b>确认密码：</span>
							<div class="f-fl item-ifo">
								<input type="password" maxlength="20"
									class="txt03 f-r3 required" tabindex="5"
									style="ime-mode: disabled;" onpaste="return  false"
									autocomplete="off"
									data-valid="isNonEmpty||between:6-16||isRepeat:password"
									data-error="密码不能为空||密码长度6-16位||两次密码输入不一致" id="rePassword" /> <span
									class="ie8 icon-close close hide" style="right: 55px"></span> <span
									class="showpwd" data-eye="rePassword"></span> <label
									class="icon-sucessfill blank hide"></label> <label
									class="focus">请再输入一遍上面的密码</label> <label class="focus valid"></label>
							</div>
						</div>
						<div class="item col-xs-12">
							<span class="intelligent-label f-fl"><b class="ftx04">*</b>验证码：</span>
							<div class="f-fl item-ifo">
								<input type="text" maxlength="4"
									class="txt03 f-r3 f-fl required" tabindex="6"
									style="width: 167px" id="randCode"
									data-valid="isNonEmpty||isRandCode" data-error="验证码不能为空||验证码错误" />
								<span class="ie8 icon-close close hide"></span> <span
									id="idcode" style="margin-left: 5px"></span>
								<script>
									$.idcode.setCode();
									//加载生成验证码方法
									function yanzheng() {
										var IsBy = $.idcode.getCode();
										return IsBy;
									}
								</script>
								<label class="icon-sucessfill blank hide" style="left: 380px"></label>
								<label class="focusa">看不清？<a href="javascript:;"
									class="c-blue" onclick="$.idcode.setCode()">换一张</a></label> <label
									class="focus valid" style="left: 370px"></label>
							</div>
						</div>
						<div class="item col-xs-12" style="height: auto">
							<span class="intelligent-label f-fl">&nbsp;</span>
							<p class="f-size14 required" data-valid="isChecked"
								data-error="请先同意条款">
								<input type="checkbox" checked /><a
									href="javascript:showoutc();" class="f-ml5">我已阅读并同意条款</a>
							</p>
							<label class="focus valid"></label>
						</div>
						<div class="item col-xs-12">
							<span class="intelligent-label f-fl">&nbsp;</span>
							<div class="f-fl item-ifo">
								<a href="javascript:;" class="btn btn-blue f-r3" id="btn_part3">注册</a>
								<div class="go-regist">
									已有帐号,请<a href="/login" class="link">登录</a>
								</div>
							</div>
						</div>
					</div>

					<div class="part2" style="display: none">
						<div class="alert alert-info" style="width: 700px"
							id="successEmail"></div>
						<div class="item col-xs-12 f-mb10" style="height: auto">
							<span class="intelligent-label f-fl">邮箱：</span>
							<div class="f-fl item-ifo c-blue" id="xianshiEmail"></div>
						</div>
						<div class="item col-xs-12">
							<span class="intelligent-label f-fl"><b class="ftx04">*</b>验证码：</span>
							<div class="f-fl item-ifo">
								<input type="text" maxlength="6" id="verifyNo"
									class="txt03 f-r3 f-fl required" tabindex="7"
									style="width: 167px" data-valid="isNonEmpty||isEmailYan"
									data-error="验证码不能为空||验证码错误" /> <span
									class="btn btn-gray f-r3 f-ml5 f-size13" id="time_box" disabled
									style="width: 97px; display: none;" onclick="sentEmail()">发送验证码</span>
								<span class="btn btn-gray f-r3 f-ml5 f-size13" id="verifyYz"
									style="width: 97px;" onclick="sentPhone()">发送验证码</span> <span
									class="ie8 icon-close close hide" style="right: 130px"></span>
								<label class="icon-sucessfill blank hide"></label> <label
									class="focus"><span>请查收验证码，并填写邮件的验证码（此验证码3分钟内有效）</span></label>
								<label class="focus valid" id="yanzheng"></label>
							</div>
						</div>
						<div class="item col-xs-12">
							<span class="intelligent-label f-fl">&nbsp;</span>
							<div class="f-fl item-ifo">
								<a href="javascript:;" class="btn btn-blue f-r3" id="btn_part2">下一步</a>
							</div>
						</div>
					</div>
					<div class="part3" style="display: none">
						<!-- <div class="item col-xs-12">
							<span class="intelligent-label f-fl"><b class="ftx04">*</b>性别：</span>
							<div class="f-fl item-ifo">
								<input type="text" maxlength="10" class="txt03 f-r3 required" tabindex="1" data-valid="isNonEmpty||between:2-10||isZh" data-error="真实姓名不能为空||真实姓名长度2-10位||只能输入中文" id="adminNo2" />   
                           
								<input type='radio' name='sex' value='0' checked="checked" id='sex'> 男 <input
								 	id='sex' type='radio' name='sex' value='1' > 女 <input
									 id='sex' type='radio' name='sex' value='2' > 保密
									<span class="ie8 icon-close close hide"></span> <label
									class="icon-sucessfill blank hide"></label> <label
									class="focus"></label> <label class="focus valid"></label>
							</div>
						</div> -->
						
						<div class="item col-xs-12">
							<span class="intelligent-label f-fl"><b class="ftx04">*</b>手机号：</span>
							<div class="f-fl item-ifo">
								<input type="text" class="txt03 f-r3 required" keycodes="tel"
									tabindex="3" data-valid="isNonEmpty||isPhone||isPhoneYan"
									data-error="手机号码不能为空||手机号码格式不正确||手机号已被绑定，请更换" maxlength="11"
									id="phone" /> <span class="ie8 icon-close close hide"></span>
								<label class="icon-sucessfill blank hide"></label> <label
									class="focus">请填写11位有效的手机号码</label> <label class="focus valid"></label>
							</div>
						</div>
						
						<%--<div class="item col-xs-12">--%>
							<%--<span class="intelligent-label f-fl">&nbsp;</span>--%>
							<%--<div class="f-fl item-ifo">--%>
								<%--<a href="javascript:;" class="btn btn-blue f-r3" id="btn_part3">注册</a>--%>
							<%--</div>--%>
						<%--</div>--%>
					</div>
					<div class="part4 text-center" style="display: none">
						<h3 id="xianshisuccess"></h3>
						<p class="c-666 f-mt30 f-mb50" id="low">
							页面将在 <strong id="times" class="f-size18">5</strong> 秒钟后，跳转到登录界面，若未跳转 <a
								href="/login" class="c-blue">点击此处</a>手动跳转
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="m-sPopBg" style="z-index: 998;"></div>
	<div class="m-sPopCon regcon">
		<div class="m-sPopTitle">
			<strong>服务协议条款</strong><b id="sPopClose" class="m-sPopClose"
				onClick="closeClause()">×</b>
		</div>
		<div class="apply_up_content">
			<pre class="f-r0">
		<strong>同意以下服务条款，提交注册信息</strong>
		你是傻逼test
        </pre>
		</div>
		<center>
			<a
				class="btn btn-blue btn-lg f-size12 b-b0 b-l0 b-t0 b-r0 f-pl50 f-pr50 f-r3"
				href="javascript:closeClause();">已阅读并同意此条款</a>
		</center>
	</div>
	<script type="text/javascript">
		$(function() {
			//第一页的确定按钮
			$("#btn_part1").click(function() {

				if (!verifyCheck._click())
					return;
				$(".part1").hide();
				$(".part2").show();
				$(".step li").eq(1).addClass("on");
				GetTel();
			});
			//第二页的确定按钮
			$("#btn_part2").click(function() {
				if (!verifyCheck._click())
					return;
				//yanzhengma();
				$(".part2").hide();
				$(".part3").show();
			});
			//第三页的确定按钮
			$("#btn_part3").click(function() {
				if (!verifyCheck._click())
					return;
				$(".part1").hide();
				$(".part4").show();
				GetUserName();
				$(".step li").eq(2).addClass("on");
				saveData();

			});
		});
		function showoutc() {
			$(".m-sPopBg,.m-sPopCon").show();
		}
		function closeClause() {
			$(".m-sPopBg,.m-sPopCon").hide();
		}
	</script>
	<div id="footer">
		<div class="dblock">
			<div class="inline-block1">
				<img src="../../static/logo.png" width="75" height="50">
			</div>
			<div class="inline-block copyright" style="padding-top: 30px;">
				<p>
					<a href="#">关于我们</a><span>|</span><a href="#">帮助中心</a><span>|</span><a
						href="#">意见反馈</a><span>|</span><a href="#">独立音乐人合作</a><span>|</span><a
						href="#">音乐专栏</a><span>|</span><a href="#">校园小助手</a>
				</p>
				<p>© 2018 Qingdao University of Technology| LPJ</p>
				<p>
					<a href="http://www.miitbeian.gov.cn">鲁ICP备18010745号</a>
				</p>
			</div>
		</div>
	</div>
</body>
</html>
