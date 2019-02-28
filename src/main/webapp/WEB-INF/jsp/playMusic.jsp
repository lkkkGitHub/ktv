<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>歌曲列表</title>
    <meta charset="utf-8">

    <link rel="stylesheet" type="text/css" href="../../static/playmusic/css/scroll.css">
    <link rel="stylesheet" type="text/css" href="../../static/playmusic/css/playMusic.css">
    <script type="text/javascript" src="../../static/playmusic/js/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="../../static/playmusic/js/jquery-ui.js"></script>
    <script type="text/javascript" src="../../static/playmusic/js/canvas.js"></script>
    <script type="text/javascript" src="../../static/playmusic/js/mousewheel.js"></script>
    <script type="text/javascript" src="../../static/playmusic/js/scroll.js"></script>
    <script type="text/javascript" src="../../static/playmusic/js/playMusic.js"></script>
    <!--新建歌单-->

    <link href="../../static/playmusic/css/qikoo.css" type="text/css" rel="stylesheet"/>
    <script src="../../static/playmusic/js/qikoo.js"></script>

</head>
<body onload="findSongsingleList();">
<!--模糊画布-->
<div class="blur">
    <canvas style="width:1366px;height:700px;opacity:0;" width="1366" height="700" id="canvas"/>
</div>
<div class="playerMain">
    <div class="top">
        <a style="cursor: pointer;" href="/redirect"><h2 class="logoaichang"
                                                         onmouseover="huan()" onmouseout="huan2()">随心听音乐</h2></a>
        <script> $(window).load(function () {
            fPlay('${id}')
        });
        $(window).load(function () {
            bian('${type}')
        });</script>
        <div class="mainNav">
            <div id="name" style="padding-top:21px;"><a href="showPersonal.action"
                                                        style="cursor:pointer;color:#fff">
                ${session.loginUser.userName}</a></div>
        </div>
    </div>
    <div class="middle">
        <div class="mainWrap">
            <div class="leftBar">
                <ul class="menuUL">
                    <li class="menuLi cur">
                        <a href="/AllMusic">
                            <i class="icon iplay"></i>
                            歌曲列表
                        </a>
                    </li>
                    <li class="menuLi cur">
                        <a href="/music/getMusics">
                            <i class="icon iplay"></i>
                            播放列表
                        </a>
                    </li>

                </ul>

                <audio id="audio" src="http://zjdx1.sc.chinaz.com/Files/DownLoad/sound1/201507/6065.mp3"></audio>
            </div>
            <div class="mainBody">
                <div class="playHd">
                    <div class="phInner">
                        <div class="col">歌曲(${sessionScope.count})</div>
                        <div class="col">演唱者</div>
                        <div class="col">专辑</div>
                    </div>
                </div>
                <div class="playBd">
                    <div class="scrollView">
                        <ul class="songUL">
                            <span id="songList1">
                                <c:forEach items="${sessionScope.musicList}" var="m">
                                    <li class="songList">
                                        <div class="songLMain">
                                            <div class="check">
                                                <input class="checkIn" type="checkbox" select="0">
                                            </div>
                                            <div class="start">
                                                <em id="songIndex"
                                                    sonN="${m.id}">${m.id}
                                                    <input type="text" style="display:none;" name="son" value="${m.id}">
                                                </em>
                                            </div>
                                            <div class="songBd">
                                                <div class="col colsn">
                                                    ${m.musicName}
                                                </div>
                                                <div class="col colcn">${m.songerName}</div>
                                                <div class="col">${m.special}</div>
                                            </div>
                                            <div class="control" hp="123">
                                                <a class="cicon more" style="display:none" onclick="showAddDiv(${m.id})"></a>
                                                <a class="cicon dele" onclick="" style="display:none"></a>
                                            </div>
                                        </div>
                                    </li>
                                </c:forEach>
                            </span>
                        </ul>
                    </div>
                </div>
                <div class="playFt">
                    <div class="track">
                        <div class="uiCheck">
                            <input class="checkAll" type="checkbox" select="0">
                        </div>
                        <div class="uiItem">
                            <a href="#" class="itIcon itDele">删除</a>
                        </div>
                        <div class="uiItem">
                            <a href="#" class="itIcon itShou">收藏</a>
                        </div>
                        <div class="uiItem">
                            <a href="#" class="itIcon itJin">添加到精选集</a>
                        </div>
                        <div class="uiItem">
                            <a href="#" class="itIcon itMore">更多</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mainOuther">
                <div class="albumCover">
                    <a href="#">
                        <img style="width: 200px;height: 200px;"
                             src="playmusic/images/${m.id}.jpg" id="canvas1">
                    </a>
                </div>
                <%-- <div class="albumSale">
                     <a href="#" class="asA">
                         <img src="">
                     </a>
                 </div>--%>
                <div id="lyr"></div>
            </div>
        </div>
    </div>
    <div class="bottom" style="background-color: black;">
        <div class="playerWrap">
            <div class="playerCon" playStyle="0">
                <a href="#" class="pbtn prevBtn"></a>
                <a href="#" class="pbtn playBtn" isplay="0"></a>
                <a href="#" class="pbtn nextBtn"></a>
                <div style="color: #fff;" class="modesuiji">随机播放</div>
                <div style="color: #fff;" class="modeshunxv">顺序播放</div>
                <div style="color: #fff;" class="modedanqu">单曲循环</div>
                <a href="#" class="mode" onClick="mode2()"></a>
                <a href="#" class="mode2" onClick="mode3()"></a>
                <a href="#" class="mode3" onClick="mode()"></a>
            </div>
            <div class="playInfo">
                <div class="trackInfo">
                    <a href="#" class="songName">漂洋过海来看你(Live)</a>
                    -
                    <a href="#" class="songPlayer">刘明湘</a>
                    <div class="trackCon">
                        <a href="#" class="tc1"></a>
                        <a href="#" class="tc2"></a>
                        <a href="#" class="tc3"></a>
                    </div>
                </div>
                <div class="playerLength">
                    <div class="position">00:00</div>
                    <div class="progress">
                        <div class="pro1"></div>
                        <div class="pro2">
                            <a href="#" class="dian"></a>
                        </div>
                    </div>
                    <div class="duration">03:35</div>
                </div>
            </div>
            <div class="vol">
                <a href="#" class="pinBtn" onclick="pinBtnchange()"></a>
                <div class="volm">
                    <div class="volSpeaker" onclick="volSpeakerchange()"></div>
                    <div class="volControl">
                        <a href="#" class="dian2"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div style="text-align:center;margin:50px 0; font:normal 14px/24px 'MicroSoft YaHei';">
    <p>适用浏览器：360、FireFox、Chrome、Safari、Opera、傲游、搜狗、世界之窗. 不支持IE8及以下浏览器。</p>
    <p>来源：<a href="http://sc.chinaz.com/" target="_blank">站长素材</a></p>
</div>
</body>
</html>