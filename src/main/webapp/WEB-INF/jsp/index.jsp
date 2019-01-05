<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<title>U唱音乐</title>
<meta name="keywords" content="风车乐栈,播放器,播放器下载,音乐,音乐下载,音乐播放器,MV,MTV,高清MV,热门MV,MV下载,mv在线观看" />
<meta name="description" content="风车乐栈是风车乐栈公司推出的一款免费音乐服务，海量乐库在线试听、最流行新歌在线首发、高品质音乐试听、正版音乐下载、MV观看等，是互联网音乐播放和下载的首选" />

<link rel="stylesheet" type="text/css" href="../../static/index/css/style.css" />
<link rel="stylesheet" type="text/css" href="../../static/index/css/player.css" />
<link rel="Shortcut Icon" href="../../static/index/images/favicon.ico" />
<script type="text/javascript" src="../../static/index/js/modernizr.js"></script>
<script>
if ((!to3d()) || document.documentMode == 10 || document.documentMode == 11){ 
	window.location="error/error.html";
}
</script>
</head>
<body>

<!-- 头部模板调用 开始 -->

<!--头部 开始-->
<div id="header">
    <!--顶部bar 开始-->
    <div class="nav_topbar">
        <div class="nav_topbar_cont">
            <ul>
            	<li><a href="">我的主页</a></li><li><a href="">个人中心</a></li><li><a href="">帮助中心</a></li>
            </ul>
            <!--用户登录-->
            <a class="user_login" href="javascript:;"><em></em>用户登录<i class="arrow"></i></a>
            <div style="display:none;" class="user_login_box"> 
                <p class="shadow_cover"></p>
                <div class="user_login_inner">
                    <form class="signin_form"> 
                        <input class="ipt" type="text" value="用户名" name="log"> 
                        <input class="ipt" type="password" value="密码" name="pwd"> 
                        <input name="rememberme" id="rememberme" checked="checked" value="forever" type="checkbox">记住密码
                        <input class="login_btn" type="submit" name="submit" value="登录">
                    </form>
                    <p> 
                        <a href=""><i class="sign"></i>注册</a> | 
                        <a href=""><i class="lock"></i>忘记密码？</a>
                    </p>
                </div>
            </div>
            <!--用户登录-->
        </div>
    </div>
    <!--顶部bar 结束-->
  	<!--头部导航 开始-->
    <div id="headCont">
        <div class="main_nav">
			<!--LOGO-->
            <div class="logo"><a href=""><img src="../../static/index/images/logo.png" width="60" height="60" alt="logo"></a></div>
            <div class="logoName">
            	<a href=""><img src="../../static/index/images/logoName.png" width="120" height="60" alt="logoName"></a>
            </div>
            <!--主导航-->
            <ul class="navigation" id="main_nav">
                <li> <!--class="on" -->
                	<a href=""><span>音乐馆</span><span>音乐馆</span></a>
                </li>
                <li>
                	<a href="?cat=6"><span>MV</span><span>MV</span></a>
                </li>
                <li>
                	<a href="?cat=7"><span>我的音乐</span><span>我的音乐</span></a>
                </li>
                <li>
                	<a href="?cat=8"><span>下载客户端</span><span>下载客户端</span></a>
                </li>
                <audio id="audioPlayer"></audio>
            </ul>
            <div class="user_info">
				<div class="user_photo"><a href=""><img src="index/images/user_photo.png" /></a></div>
                <a class="nikeName" href="">哈哈哈</a>
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
                        <p class="active">
                        	<a href="?cat=9">独家首发</a><a href="?cat=10">歌单广场</a>
							<a href="?cat=11">歌手</a>
                            <a href="?cat=12">专辑</a><a href="?cat=13">电台</a>
                        </p>
                        <p>
                        	<a href="?cat=6">MV推荐</a><a href="?cat=6">MV库</a>
                            <a href="?cat=6">MV专题</a><a href="?cat=6">音乐现场</a>
                        </p>
                        <p>
                        	<a href="?cat=7">主页</a><a href="?cat=7">歌单</a>
                            <a href="?cat=7">收听</a><a href="?cat=7">听众</a>
                            <a href="?cat=7">MV收藏</a>
                        </p>
                        <p>
                        	<a href="?cat=8">电脑版本</a><a href="?cat=8">pad版本</a>
                            <a href="?cat=8">手机版本</a>
                        </p>
                    </div>
                    
                    <!--搜索框 开始-->
                    <div class="search_box">
                        <form role="search" method="get" id="searchform" class="searchform" action="">
							<input type="submit" value="" class="search_btn" id="searchsubmit" />
							<input type="text" class="search" value="搜索好音乐" name="s" id="s" />
						</form>
                        <!--搜索下拉菜单-->
                        <div class="hot_search" id="hot_search">
                            <div>
                                <span><a href="javascript:;">陈奕迅</a><font>171万</font></span>
                                <div>
                                    <span><a href="javascript:;">周杰伦</a><font>164万</font></span>
                                    <div>
                                        <span><a href="javascript:;">G.E.M. 邓紫棋</a><font>107万</font></span>
                                        <div>
                                            <span><a href="javascript:;">泡沫</a><font>90万</font></span>
                                            <div>
                                                <span><a href="javascript:;">林俊杰</a><font>62万</font></span>
                                                <div>
                                                    <span><a href="javascript:;">本兮</a><font>57万</font></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>             
                        </div>
                        <!--搜索下拉菜单-->        
                    </div>
                    <!--搜索框 结束-->
                </ul>
            </div>
        </nav>
    </div>
  	<!--头部导航  结束-->
</div>
<!--头部 结束-->
<!-- 头部模板调用 结束 -->

<!-- 音乐馆 模块 开始  default-->
<section class="section_cont">
    <!--轮播图 开始 -->
    <div class="main_banner">
        <div class="main_banner_bg"></div>
        <div class="main_banner_wrap">
			<canvas id="myCanvas" width="150" height="150"></canvas>
            <div class="main_banner_box" id="m_box">
                <a href="javascript:void(0)" class="banner_btn js_pre">
                    <span class="banner_btn_arrow"><i></i></span>
                </a>
                <a href="javascript:void(0)" class="banner_btn btn_next js_next">
                    <span class="banner_btn_arrow"><i></i></span>
                </a>
                <ul>
                    <li id="imgCard0">
                        <a href=""><span style="opacity:0;"></span></a>      
                        <img src="../../static/index/main_banner/big0020150102211033.jpg" alt="">
                        <p style="bottom:0">周杰伦粉丝版MV</p>
                    </li> 
                    <li id="imgCard1">
                        <a href=""><span style="opacity:0.4;"></span></a>      
                        <img src="../../static/index/main_banner/big0120150101183428.jpg" alt="">
                        <p>乐侃有声节目第二期</p>
                    </li> 
                    <li id="imgCard2">
                        <a href=""><span style="opacity:0.4;" ></span></a>        
                        <img src="../../static/index/main_banner/big0320150101183351.jpg" alt="">
                        <p>乐见大牌：”荣“耀之声，”维“我独尊</p>
                    </li> 
                    <li id="imgCard3">
                        <a href=""><span style="opacity:0.4;"></span></a>      
                        <img src="../../static/index/main_banner/big0420150101224343.jpg" alt="">
                        <p>王力宏四年心血结晶</p>
                    </li> 
                    <li id="imgCard4">
                        <a href=""><span style="opacity:0.4;"></span></a>      
                        <img src="../../static/index/main_banner/big0720150102210934.jpg" alt="">
                        <p>MV精选：《武媚》女神团美艳大比拼</p>
                    </li> 
                </ul>
                <!--火狐倒影图层-->
                <p id="rflt"></p>
                <!--火狐倒影图层-->
            </div>
            <!--序列号按钮-->
            <div class="btn_list">
                <span class="curr"></span><span></span><span></span><span></span><span></span>        
            </div>
        </div>
    </div>
    <!--轮播图 结束 -->
    <!--新歌推荐 开始-->
    <!--标题 开始-->
    <div class="songs_rcmd_title">
        <div class="rcmd_left_title rcmd_title">
            <span></span>
            <a href="" class="play_btn"></a>
            <a href="" class="add_btn"></a>
            <a href="" class="more"></a>
        </div>
        <div class="rcmd_center_title rcmd_title">
            <span></span>
            <a href="" class="play_btn"></a>
            <a href="" class="add_btn"></a>
            <a href="" class="more"></a>
        </div>
        <div class="rcmd_right_title rcmd_title">
            <span></span>
            <a href="" class="play_btn"></a>
            <a href="" class="add_btn"></a>
            <a href="" class="more"></a>
        </div>
    </div>
    <!--标题 结束-->
    <!--推荐内容 开始-->
    <div class="songs_rcmd" id="songs_rcmd">
        <div class="songs_rcmd_cont">
            <ul class="rcmd_left rcmd_cont" id="latest">
								                <li>
                    <a href="?p=196" class="musicName">爱情大师 &#8211; 崔子格</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=194" class="musicName">就是现在 &#8211; 王力宏</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=192" class="musicName">爱与诚 &#8211; 古巨基</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=190" class="musicName">野子 &#8211; 苏运莹</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=188" class="musicName">闹啥子嘛闹 &#8211; 张杰</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=186" class="musicName">冬天的树 &#8211; 戚薇</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=184" class="musicName">我笑到都哭了 &#8211; A-Lin</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=181" class="musicName">你是如此的难以忘记 &#8211; 李宇春</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=180" class="musicName">千秋 &#8211; 孙楠</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                            </ul>
            <ul class="rcmd_center rcmd_cont" id="popular">
								                <li>
                    <a href="?p=216" class="musicName">可惜没如果 &#8211; 林俊杰</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=214" class="musicName">一切安好 &#8211; 莫文蔚</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=212" class="musicName">算什么男人 &#8211; 周杰伦</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=210" class="musicName">独行 &#8211; 苏醒</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=207" class="musicName">Play 我呸 &#8211; 蔡依林</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=205" class="musicName">帽子戏法 &#8211; 魏晨</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=203" class="musicName">沧浪之歌 &#8211; 汪峰</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=2 pic" class="musicName">失忆的金鱼 &#8211; 杨丞琳</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                                <li>
                    <a href="?p=199" class="musicName">说走就走的旅行 &#8211; 李行亮</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
                            </ul>
            <ul class="rcmd_right rcmd_cont" id="rank">
								                <li>
                    <a href="?p=234" class="musicName">手写着从前 &#8211; 周杰伦</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
				                <li>
                    <a href="?p=232" class="musicName">手心的蔷薇 &#8211; 林俊杰</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
				                <li>
                    <a href="?p=230" class="musicName">阳明山 &#8211; 周杰伦</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
				                <li>
                    <a href="?p=228" class="musicName">让初恋像昨天 &#8211; 游鸿明</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
				                <li>
                    <a href="?p=226" class="musicName">罪恶感 &#8211; A-Lin</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
				                <li>
                    <a href="?p=224" class="musicName">两个人的回忆一个人过 &#8211; 庄心妍</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
				                <li>
                    <a href="?p=222" class="musicName">蓝色圣诞节 &#8211; 徐若瑄</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
				                <li>
                    <a href="?p=220" class="musicName">突然好想你(Live) &#8211; 古巨基</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
				                <li>
                    <a href="?p=218" class="musicName">这一次我绝不放手(Live) &#8211; 孙楠</a>
                    <a class="shareIcon" href="javascript:;"></a>
                    <a class="playIcon" href="javascript:;"></a>
                </li>
				            </ul>
        </div>
    </div>
    <!--推荐内容 结束-->
    
    <!--精选集 开始-->
    <div class="omnibus hot_singer">
        <div class="omnibus_cont new_common">
            <div class="omnibus_title new_common_title">
                <span></span>
                <a href="" class="more"></a>
            </div>
            <ul id="omnibus_list">
                <li class="post_big">
                    <a href="">
                        <img src="../../static/index/images/20141010110027.jpg.jpg" alt="" width="305" height="290">
                        <i></i>
                    </a>
                    <a href="">神曲虐我千百遍，我待神曲如初恋</a>
                </li>
                <li class="post_small">
                    <a href="">
                        <img src="../../static/index/images/20141010110103.jpg" alt="" width="130" height="130">
                        <span></span>
                    </a>
                    <a href="">孤单的时候有二次元</a>
                </li>
                <li class="post_small">
                    <a href="">
                        <img src='../../static/index/images/20141010110157.jpg' alt="" width="130" height="130">
                        <span></span>
                    </a>
                    <a href="">萌娃爱唱歌</a>
                </li>
                <li class="post_small">
                    <a href="">
                        <img src="../../static/index/images/20141010110216.jpg" alt="" width="130" height="130">
                        <span></span>
                    </a>
                    <a href="">不疯狂,不青春</a>
                </li>
                <li class="post_small">
                    <a href="">
                        <img src='../../static/index/images/20141010110239.jpg' alt="" width="130" height="130">
                        <span></span>
                    </a>
                    <a href="">00后出没，请注意！</a>
                </li>
                <li class="post_small">
                    <a href="">
                        <img src='../../static/index/images/20141013142335.jpg' alt="" width="130" height="130">
                        <span></span>
                    </a>
                    <a href="">让节操碎一会儿</a>
                </li>
                <li class="post_small">
                    <a href="">
                        <img src="../../static/index/images/20141013142414.jpg" alt="" width="130" height="130">
                        <span></span>
                    </a>
                    <a href="">笑多了会怀孕哦</a>
                </li>
            </ul>
        </div>
        <div class="hot_singer_cont new_common">
            <div class="hot_singer_title new_common_title">
                <span></span>
                <a href="" class="more"></a>
            </div>
            <ul class="singer_list">
                <li>
                    <a href="?p=369" class="singerPhoto">
                        <img src="../../static/index/images/0025NhlN2yWrP4.jpg" alt="" width="70" height="70"></a>
                    <a href="?p=369" class="singer">周杰伦</a>
                </li>
                <li>
                    <a href="?p=357" class="singerPhoto">
                        <img src="../../static/index/images/001BLpXF2DyJe2.jpg" alt="" width="70" height="70"></a>
                    <a href="?p=357" class="singer">林俊杰</a>
                </li>
                <li>
                    <a href="?p=363" class="singerPhoto">
                        <img src="../../static/index/images/003Nz2So3XXYek.jpg" alt="" width="70" height="70"></a>
                    <a href="?p=363" class="singer">陈奕迅</a>
                </li>
                <li>
                    <a href="?p=367" class="singerPhoto">
                        <img src="../../static/index/images/002azErJ0UcDN6.jpg" alt="" width="70" height="70"></a>
                    <a href="?p=367" class="singer">张杰</a>
                </li>
                <li>
                    <a href="?p=360" class="singerPhoto">
                        <img src='../../static/index/images/001fNHEf1SFEFN.jpg' alt="" width="70" height="70"></a>
                    <a href="?p=360" class="singer">邓紫棋</a>
                </li>
                <li>
                    <a href="?p=345" class="singerPhoto">
                        <img src="../../static/index/images/000CK5xN3yZDJt.jpg" alt="" width="70" height="70"></a>
                    <a href="?p=345" class="singer">许嵩</a>
                </li>
                <div style="clear:both;"></div>
            </ul>
            <ul class="singer_classify">
                <li><a href="" class="singer">华语男歌手</a></li>
                <li><a href="" class="singer">华语女歌手</a></li>
                <li><a href="" class="singer">华语女组合</a></li>
                <li><a href="" class="singer">日韩男歌手</a></li>
                <li><a href="" class="singer">日韩女歌手</a></li>
                <li><a href="" class="singer">日韩组合</a></li>
                <li><a href="" class="singer">欧美男歌手</a></li>
                <li><a href="" class="singer">欧美女歌手</a></li>
                <li><a href="" class="singer">欧美组合</a></li>
            </ul>
        </div>
    <div style="clear:both"></div></div>
    <!--精选集 结束-->
</section>
<!-- 音乐馆 模块 结束 -->


<!--底部 开始 -->
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
						<img class="tCode" src="../../static/index/images/twoCode.jpg" width="100" height="100" alt="二维码" />
					</a>
				</li>
                <li><a href=""><span></span></a></li><li><a href=""><span></span></a></li>
            </ul>
        </div>
        <div id="toTop"></div>
    </div>

</div>
<!--底部 结束 -->
 
 
  
<script type="text/javascript" src="../../static/index/js/jquery.js"></script>
<script type="text/javascript" src="../../static/index/js/index.js"></script>
<!--播放器js-->
<script type="text/javascript" src="../../static/index/js/player.js"></script>
<script type="text/javascript" src="../../static/index/js/playlist.js"></script>
<script type="text/javascript" src="../../static/index/js/player_database.js"></script>
<!--播放器js-->
<!-- 底部模板调用 结束 -->


</body>
</html>


