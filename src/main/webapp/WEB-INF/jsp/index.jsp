<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>

    <!--可无视-->
    <link rel="stylesheet" type="text/css" href="../../static/index/css/reset.css">

    <!--响应式框架-->
    <link rel="stylesheet" type="text/css" href="../../static/index/css/bootstrap-grid.min.css"/>

    <!--图标调用-->
    <link rel="stylesheet" href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../../static/musicIndex/css/style.css" />
    <link rel="stylesheet" type="text/css" href="../../static/musicIndex/css/player.css" />

    <!--主要样式-->
    <style>
        .demo {
            padding: 2em 0;
        }

        :root {
            --color_1: #fff;
            --main-color: #1dd1a1;
        }

        .box {
            font-family: 'Niramit', sans-serif;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .box:before,
        .box:after,
        .box-content:before,
        .box-content:after {
            content: '';
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
            height: 100%;
            width: 25%;
            transform: translateY(-100%);
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            transition: all 0.3s;
        }

        .box:hover:before,
        .box:hover:after,
        .box:hover .box-content:before,
        .box:hover .box-content:after {
            transform: translateY(0);
        }

        .box:after {
            left: 25%;
        }

        .box .box-content:before {
            left: 50%;
        }

        .box .box-content:after {
            left: 75%;
        }

        .box:hover:before {
            transition-delay: 0.225s;
        }

        .box:hover:after {
            transition-delay: 0.075s;
        }

        .box:hover .box-content:before {
            transition-delay: 0.15s;
        }

        .box:hover .box-content:after {
            transition-delay: 0s;
        }

        .box img {
            width: 100%;
            height: auto;
            transition: all 0.3s ease 0s;
        }

        .box:hover img {
            filter: grayscale(100%);
        }

        .box .box-content {
            width: 100%;
            height: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            transition: all 0.2s;
        }

        .content {
            width: 100%;
            padding: 7px 0;
            opacity: 0;
            position: absolute;
            left: 0;
            bottom: -30px;
            z-index: 2;
            transition: all 0.3s ease 0.1s;
        }

        .box:hover .content {
            opacity: 1;
            bottom: 5px;
        }

        .box .title {
            color: #fff;
            font-size: 25px;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin: 0;
        }

        .box .post {
            color: var(--main-color);
            font-size: 16px;
            font-style: italic;
            text-transform: capitalize;
            letter-spacing: 1px;
            margin-bottom: 10px;
            display: block;
        }

        .box .icon {
            padding: 0;
            margin: 0;
            list-style: none;
            transform: translateX(-50%);
            position: absolute;
            top: 15px;
            right: -10px;
            z-index: 2;
            transition: all 0.5s ease 0.3s;
        }

        .box .icon li {
            opacity: 0;
            transform: scale(0) rotate(360deg);
            transition: all 400ms;
        }

        .box:hover .icon li {
            opacity: 1;
            transform: scale(1) rotate(0);
        }

        .box .icon li a {
            color: var(--color_1);
            background-color: var(--main-color);
            font-size: 20px;
            line-height: 40px;
            height: 40px;
            width: 40px;
            margin-bottom: 10px;
            border-radius: 50%;
            display: block;
            position: relative;
            transition: all 0.3s;
        }

        .box .icon li a:hover {
            text-decoration: none;
            color: var(--main-color);
            background-color: var(--color_1);
            border-radius: 0 20px 0 20px;
        }

        @media only screen and (max-width: 990px) {
            .box {
                margin-bottom: 30px;
            }
        }

        @media only screen and (max-width: 479px) {
            .box .title {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>

<div class="demo">
    <div id="headCont">
        <div class="main_nav">
            <!--LOGO-->
            <div class="logo"><a href=""><img src="../../static/musicIndex/images/logo.png" width="60" height="60"
                                              alt="logo"></a></div>
            <div class="logoName">
                <a href=""><img src="../../static/musicIndex/images/logoName.png" width="120" height="60"
                                alt="logoName"></a>
            </div>
            <!--主导航-->
            <ul class="navigation" id="main_nav">
                <li> <!--class="on" -->
                    <a href=""><span>音乐馆</span><span>音乐馆</span></a>
                </li>
                <li>
                    <a href="?cat=6" class=""><span>MV</span><span>MV</span></a>
                </li>
                <li>
                    <a href="?cat=7" class=""><span>我的音乐</span><span>我的音乐</span></a>
                </li>
                <li>
                    <a href="?cat=8" class="on"><span>下载客户端</span><span>下载客户端</span></a>
                </li>
                <audio id="audioPlayer" src="/wp-content/uploads/2015/01/3.mp3"></audio>
            </ul>
            <div class="user_info">
                <%--<div class="user_photo"><a href=""><img src="../../static/musicIndex/images/user_photo.png"></a></div>--%>
                <a class="nikeName" href="">${sessionScope.user.userName}</a>
                <a class="user_info_list" href=""><span>8</span><span>歌单</span></a>
                <a class="user_info_list" href=""><span>3</span><span>收听</span></a>
                <a class="user_info_list" href=""><span>0</span><span>听众</span></a>
            </div>
        </div>
        <!--二级导航-->
        <nav class="sub_nav">
            <div class="nav_list">
                <ul>
                    <li>
                        <a href="" class="smallogo">
                            <span class="mini_logo"></span>
                        </a>
                    </li>
                    <li><a href="" class="home">首页</a></li>

                    <div class="sub_list" id="sub_list">
                        <p class="active" style="display: none;">
                            <a href="?cat=9">独家首发</a><a href="?cat=10">歌单广场</a>
                            <a href="?cat=11">歌手</a>
                            <a href="?cat=12">专辑</a><a href="?cat=13">电台</a>
                        </p>
                        <p style="display: none;">
                            <a href="?cat=6">MV推荐</a><a href="?cat=6">MV库</a>
                            <a href="?cat=6">MV专题</a><a href="?cat=6">音乐现场</a>
                        </p>
                        <p style="display: none;">
                            <a href="?cat=7">主页</a><a href="?cat=7">歌单</a>
                            <a href="?cat=7">收听</a><a href="?cat=7">听众</a>
                            <a href="?cat=7">MV收藏</a>
                        </p>
                        <p style="display: block;">
                            <a href="?cat=8">电脑版本</a><a href="?cat=8">pad版本</a>
                            <a href="?cat=8">手机版本</a>
                        </p>
                    </div>
                </ul>
            </div>
        </nav>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-sm-6">
                <div class="box">
                    <img src="../../static/index/images/img-1.jpg" alt="">
                    <div class="box-content">
                        <div class="content">
                            <%--<span class="post">包房预定</span>--%>
                            <a href="/">
                                <h3 class="title">预定</h3>
                            </a>
                        </div>
                        <ul class="icon">
                            <li><a href="#"><i class="fa fa-search"></i></a></li>
                            <li><a href="#"><i class="fa fa-link"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-6">
                <div class="box">
                    <img src="../../static/index/images/img-2.jpg" alt="">
                    <div class="box-content">
                        <div class="content">
                            <%--<span class="post">Web designer</span>--%>
                            <a href="/musicIndex">
                                <h3 class="title">点歌</h3>
                            </a>
                        </div>
                        <ul class="icon">
                            <li><a href="#"><i class="fa fa-search"></i></a></li>
                            <li><a href="#"><i class="fa fa-link"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-6">
                <div class="box">
                    <img src="../../static/index/images/img-3.jpg" alt="">
                    <div class="box-content">
                        <div class="content">
                            <%--<span class="post">Web designer</span>--%>
                            <h3 class="title">没作用</h3>
                        </div>
                        <ul class="icon">
                            <li><a href="#"><i class="fa fa-search"></i></a></li>
                            <li><a href="#"><i class="fa fa-link"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer" id="footer">
        <div class="footer_cont">
            <div class="footer_cont_left">
                <p>
                    <a href="">关于我们</a>|<a href="">版权声明</a>|<a href="">诚聘英才</a>|
                    <a href="">联系我们</a>|<a href="">历史合作</a>|<a href="">唱片公司</a>|
                    <a href="">广告服务</a>|<a href="">友情链接</a>|<a href="">帮助中心</a>
                </p>
                <p>
                    Copyright © 2 pic5-2 pic6 <a href="">www.xxffcc.com</a> All Rights Reserved
                </p>
            </div>
            <div class="footer_cont_right">
                <span>关注我们</span>
                <ul>
                    <li><a href=""><span></span></a></li><li><a href=""><span></span></a></li>
                    <li>
                        <a href="" class="twoCode">
                            <span></span>
                            <img class="tCode" src="../../static/musicIndex/images/twoCode.jpg" width="100" height="100" alt="二维码">
                        </a>
                    </li>
                    <li><a href=""><span></span></a></li><li><a href=""><span></span></a></li>
                </ul>
            </div>
            <div id="toTop"></div>
        </div>

    </div>
</div>

</body>
</html>