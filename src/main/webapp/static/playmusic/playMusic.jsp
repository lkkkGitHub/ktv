<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>爱唱音乐-播放</title>
<link rel="stylesheet" type="text/css" href="css/scroll.css">
<link rel="stylesheet" type="text/css" href="css/xiami.css">
<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<script type="text/javascript" src="js/canvas.js"></script>
<script type="text/javascript" src="js/mousewheel.js"></script>
<script type="text/javascript" src="js/scroll.js"></script>
<script type="text/javascript" src="js/xiami.js"></script>

<!--新建歌单-->

<link href="css/qikoo.css" type="text/css" rel="stylesheet" />
<script src="js/qikoo.js"></script>
<script>

        </script>
</head>
<body>
	<!--模糊画布-->
	<div class="blur">
		<canvas style="width:1366px;height:700px;opacity:0;" width="1366"
			height="700" id="canvas">
	</div>
	<div class="playerMain">
		<div class="top">
			<a style="cursor: pointer;"><h2 class="logoaichang"
					onmouseover="huan()" onmouseout="huan2()">爱唱音乐</h2></a>
			<div class="mainNav"></div>
		</div>
		<div class="middle">
			<div class="mainWrap">
				<div class="leftBar">
					<ul class="menuUL">
						<li class="menuLi cur"><a href="#" class="bianse"
							onmouseover="menuLi()" onmouseout="menuLi2()"> <i
								class="icon iplay"></i> 正在播放
						</a></li>
						<li class="menuLi cur"><a href="#" class="bianse2"
							onmouseover="menuLi3()" onmouseout="menuLi4()"> <i
								class="icon ihst"></i> 播放历史
						</a></li>
						<li class="menuLi cur"><a href="#" class="bianse3"
							onmouseover="menuLi5()" onmouseout="menuLi6()"> <i
								class="icon ishouc"></i> 我喜欢的音乐
						</a></li>
					</ul>
					<div class="collectOut">
						<span class="colS">创建的歌单</span> <a href="#" class="colA"
							onclick="payment();"></a>
						<div class="col" style="margin-left: -60px; width: 180px;">
							<ul class="menuUL">
								<li class="menuLi cur"><a href="#" class="beijing"> <i
										class="icon isplay2"></i> 道一声晚安
								</a></li>
								<li class="menuLi cur"><a href="#" class="beijing"> <i
										class="icon isplay2"></i> 当我想你的时候
								</a></li>
								<li class="menuLi cur"><a href="#" class="beijing"> <i
										class="icon isplay2"></i> 清澈古风
								</a></li>
							</ul>
						</div>
					</div>

					<audio id="audio" src="songs/1.mp3"></audio>
				</div>
				<div class="mainBody">
					<div class="playHd">
						<div class="phInner">
							<div class="col">歌曲(50)</div>
							<div class="col">演唱者</div>
							<div class="col">专辑</div>
						</div>
					</div>
					<div class="playBd">
						<div class="scrollView">
							<!-- <div class="scroll"></div> -->
							<ul class="songUL">
								<li class="songList">
									<div class="songLMain">
										<div class="check">
											<input class="checkIn" type="checkbox" select="0">
										</div>
										<div class="start">
											<em sonN="1">1</em>
										</div>
										<div class="songBd">
											<div class="col colsn">盛夏光年</div>
											<div class="col colcn">陈冰</div>
											<div class="col">好声音第三季</div>
										</div>
										<div class="control">
											<a class="cicon love"></a> 
											<a class="cicon more" style="display: none"></a>
											 <a class="cicon dele" style="display: none"></a>
										</div>
									</div>
								</li>
								<li class="songList">
									<div class="songLmain">
										<div class="check">
											<input class="checkIn" type="checkbox" select="0">
										</div>
										<div class="start">
											<em sonN="2">2</em>
										</div>
										<div class="songBd">
											<div class="col colsn">漂洋过海来看你(Live)</div>
											<div class="col colcn">刘明湘</div>
											<div class="col">好声音第三季</div>
										</div>
										<div class="control">
											<a class="cicon love"></a> <a class="cicon more"></a> <a
												class="cicon dele"></a>
										</div>
									</div>
								</li>
								<li class="songList">
									<div class="songLmain">
										<div class="check">
											<input class="checkIn" type="checkbox" select="0">
										</div>
										<div class="start">
											<em sonN="3">3</em>
										</div>
										<div class="songBd">
											<div class="col colsn">Autobots Reunite</div>
											<div class="col colcn">Steve Jablonsky</div>
											<div class="col">《变形金刚4：绝迹重生》</div>
										</div>
										<div class="control">
											<a class="cicon love"></a> <a class="cicon more"></a> <a
												class="cicon dele"></a>
										</div>
									</div>
								</li>
								
								<li class="songList"></li>
							</ul>
						</div>
					</div>
					<div class="playFt">
						<div class="track">
							<div class="uiCheck">
								<input class="checkAll" type="checkbox" select="0">
							</div>
							<div class="uiItem">
								<a href="#" class="itIcon itDele" onclick="Confirm()">删除</a>
							</div>
							<div class="uiItem">
								<a href="#" class="itIcon itShou">收藏</a>
							</div>
							<div class="uiItem">
								<a href="#" class="itIcon itJin">添加到歌单</a>
							</div>
							<div class="uiItem">
								<a href="#" class="itIcon itMore">更多</a>
							</div>
						</div>
					</div>
				</div>
				<div class="mainOuther">
					<div class="albumCover">
						<a href="#"> <img src="images/2.jpg" id="canvas1"
							class="canvas1">
						</a>
					</div>
					<div class="albumSale"></div>
					<div id="lyr" class="lyr"></div>
				</div>
			</div>
		</div>
		<div class="bottom" style="background-color: black;">
			<div class="playerWrap">
				<div class="playerCon">
					<a href="#" class="pbtn prevBtn"></a> <a href="#"
						class="pbtn playBtn" isplay="0"></a> <a href="#"
						class="pbtn nextBtn"></a>
					<div style="color: #fff;" class="modesuiji">随机播放</div>
					<div style="color: #fff;" class="modeshunxv">顺序播放</div>
					<div style="color: #fff;" class="modedanqu">单曲循环</div>
					<a href="#" class="mode" onClick="mode2()"></a> <a href="#"
						class="mode2" onClick="mode3()"></a> <a href="#" class="mode3"
						onClick="mode()"></a>
				</div>
				<div class="playInfo">
					<div class="trackInfo">
						<a href="#" class="songName">漂洋过海来看你(Live)</a> - <a href="#"
							class="songPlayer">刘明湘</a>
						<div class="trackCon">
							<a href="#" class="tc1" onclick="tc1change()"></a> <a href="#"
								class="tc2"></a> <a href="#" class="tc3"></a>
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
						<a class="volSpeaker" onclick="volSpeakerchange()"></a>
						<div class="volControl">
							<a href="#" class="dian2"></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
