<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>ktv后台   </title>
    <link rel="stylesheet" href="../../static/backstage/css/layui.css">
</head>

<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <div class="layui-header">
        <div class="layui-logo">欢迎来到ktv后台</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->

        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
                    <img src="../../static/backstage/images/1.gif" class="layui-nav-img"> 管理员
                </a>
                <dl class="layui-nav-child">
                    <dd>
                        <a href="">基本资料</a>
                    </dd>
                    <dd>
                        <a href="">安全设置</a>
                    </dd>
                </dl>
            </li>
            <li class="layui-nav-item">
                <a href="">退了</a>
            </li>
        </ul>
    </div>

    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree" lay-filter="test">
                <li class="layui-nav-item layui-nav-itemed">
                    <a class="" href="javascript:;">菜单栏</a>
                    <dl class="layui-nav-child">
                        <dd>
                            <a href="video.jsp" target="right">产品管理</a>
                        </dd>
                        <dd>
                            <a href="userType.jsp" target="right">用户管理</a>
                        </dd>
                        <dd>
                            <a href="course.html" target="right">课程管理</a>
                        </dd>
                        <dd>
                            <a href="link.html" target="right">友情链接</a>
                        </dd>
                        <dd>
                            <a href="message.html" target="right">留言管理</a>
                        </dd>
                        <dd>
                            <a href="message.html" target="right">用户管理</a>
                        </dd>
                        <dd>
                            <a href="javascript:void(0)"  onclick="updatePwd('修改密码',1)">修改密码</a>
                        </dd>
                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;">菜单栏</a>
                    <dl class="layui-nav-child">

                    </dl>
                </li>
                <li class="layui-nav-item">
                    <a href="javascript:;">菜单栏</a>
                    <dl class="layui-nav-child">

                    </dl>
                </li>

                <li class="layui-nav-item">
                    <a href="javascript:;">菜单栏</a>
                    <dl class="layui-nav-child">

                    </dl>
                </li>

                <li class="layui-nav-item">
                    <a href="javascript:;">菜单栏</a>
                    <dl class="layui-nav-child">

                    </dl>
                </li>

                <li class="layui-nav-item">
                    <a href="javascript:;">菜单栏</a>
                    <dl class="layui-nav-child">

                    </dl>
                </li>

            </ul>
        </div>
    </div>

    <div class="layui-body" style="z-index: 0;">
        <!-- 内容主体区域 -->
        <div style="padding: 15px;">
            <iframe src="video.jsp" name="right" frameborder="0" width="100%" height="1200"></iframe>

        </div>
    </div>

    <div class="layui-footer">
        <!-- 底部固定区域 -->
        底部固定区域
    </div>
</div>

<script type="text/javascript" src="../../static/backstage/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="../../static/backstage/myplugs/js/plugs.js">
</script>
<script type="text/javascript">
    //添加编辑弹出层
    function updatePwd(title, id) {
        $.jq_Panel({
            title: title,
            iframeWidth: 500,
            iframeHeight: 300,
            url: "updatePwd.html"
        });
    }
</script>
<script src="../../static/backstage/js/layui.js"></script>
<script>
    //JavaScript代码区域
    layui.use('element', function() {
        var element = layui.element;

    });
</script>
</body>
</html>