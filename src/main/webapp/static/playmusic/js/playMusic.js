//用户未登录弹出框
/*function userLogin(usernet("用户未登录，请登录");
    }
}*/
//歌曲id
var MUSICID = "";
function findSongsingleList() {
    $.ajax({
        url: "/songSingle/songsingleList",
        type: "post",
        async: false, //(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
        contentType: "application/x-www-form-urlencoded",
        dataType: 'json',
        success: function (data) {
            var str = "";
            alert(data[i].name);
            for (var i = 0; i < data.length; i++) {
                str += "<li class=\"menuLi2 cur\">";
                str += " <div class=\"beijing hp\">";
                str += "<i class=\"icon isplay2\"></i>";
                str += "<div class=\"col\"><s:property value=\" " + data[i].name + " \"/></div>";
                str += "</div></li>";
            }
            $('#songSingleList').html(str);
        }
    })
}

//弹出新建歌单对话框
function payment() {
    $(".dialog").show();
}

//关闭新建歌单对话框
function closeDialog() {
    $(".dialog").hide();
}

//验证歌单
function valSongSingle() {
    var songSingle = $('#musicListName').val();
    $.ajax({
        url: "/verifNewSongSingle", //verifNewSongSingle.action
        type: "post",
        async: false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
        contentType: "application/x-www-form-urlencoded",
        data: {
            name: songSingle,
        },
        dataType: 'json',
        success: function (json) {//如果调用servlet成功，响应200。请求成功后回调函数。这个方法有两个参数：服务器返回数据，返回状态(可以缺省)。
            var flag = json;
            if (flag == true) {
                if (songSingle == 1 || songSingle == 2 || songSingle == 3) {
                    $(".showMessage").html("歌单名称非法");
                } else {
                    createSongsingle(songSingle);
                    $(".showMessage").html("");
                }
            } else if (flag == false) {
                $(".showMessage").html("歌单名已存在");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {//如果调用servlet出现问题，响应非200（这里响应405）。通常情况下textStatus和errorThown只有其中一个有值 。(默认: 自动判断 (xml 或 html)) 请求失败时将调用此方法。这个方法有三个参数：XMLHttpRequest 对象，错误信息，（可能）捕获的错误对象。
            console.log(textStatus);
            $(".showMessage").html("请求失败");
        }
    });
}

//创建歌单
function createSongsingle(musicListName) {
    $.ajax({
        url: "/newSongsingle",
        type: "post",
        async: false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
        contentType: "application/x-www-form-urlencoded",
        data: {
            name: musicListName,
        },
        success: function (data) {//如果调用servlet成功，响应200。请求成功后回调函数。这个方法有两个参数：服务器返回数据，返回状态(可以缺省)。
        }
    });
    $(".dialog").hide();
    window.location.href = "/ShowAllMusic";
}




//从歌单列表中删除歌曲
function removeMusicFromListByMusicId(musicId, songSingleId) {
    $.ajax({
        url: "/removeMusicFromListByMusicId",
        type: "get",
        data: {
            musicId: musicId,
            songSingleId: songSingleId
        },
        success: function (data) {
            if (data == true) {
                findMusicByList(songSingleId);
            } else {
                alert("删除失败");
            }
        }
    });
}

//向歌单中添加歌曲信息，
//先验证是否存在，不存在即添加到，存在返回存在
function verifyAndAdd(songSingleId) {
    $(".addMusicIntoList").hide();
    $.ajax({
        url: "/verifyMusicExists",
        type: "get",
        async: true,
        data: {
            musicId: MUSICID,
            songSingleId: songSingleId
        },
        success: function (data) {
            if (data == true) {
                alert("歌曲已经在歌单中存在啊");
            } else {
                $.ajax({
                    url: "/addMusicIntoSongSingId",
                    type: "get",
                    async: true,
                    data: {
                        musicId: MUSICID,
                        songSingleId: songSingleId
                    },
                    success: function (data) {
                        if (data = true) {
                            findMusicByList(songSingleId);
                        } else {
                            alert("添加失败");
                        }
                    }
                });
            }
        }
    });
}



function showAddDiv(musicId) {
    MUSICID = musicId;
    $(".addMusicIntoList").show();
}

//删除对话框
function Confirm() {
    qikoo.dialog2.confirm('确定要删除此歌曲吗？', function () {

    }, function () {
        alert("取消啦！");
    });
}

//logo点击切换颜色
function huan() {
    $(".logoaichang").css("color", "#fa3b4a");
}

function huan2() {
    $(".logoaichang").css("color", "#fff");
}

//切换播放方式
function mode2() {       //单曲
    $(".mode2").show();
    $(".mode").hide();
    $(".modeshunxv").hide();
    $(".modedanqu").show();
    setTimeout("yincangdanqu()", 1000);
    $(".playerCon").attr("playStyle", "1");
}

function mode3() {     //随机
    $(".mode3").show();
    $(".mode2").hide();
    $(".modedanqu").hide();
    $(".modesuiji").show();
    setTimeout("yincangsuiji()", 1000);
    $(".playerCon").attr("playStyle", "2");
}

function mode() {      //顺序
    $(".mode").show();
    $(".mode3").hide();
    $(".modesuiji").hide();
    $(".modeshunxv").show();
    setTimeout("yincangshunxv()", 1000);
    $(".playerCon").attr("playStyle", "0");
}

function yincangsuiji() {
    $(".modesuiji").hide();
}

function yincangshunxv() {
    $(".modeshunxv").hide();
}

function yincangdanqu() {
    $(".modedanqu").hide();
}

function hp() {
    var h = $(".playerCon").attr("playStyle");
    alert(h);
}

//右侧功能按钮点击变色
function menuLi() {
    $(".bianse3").css("background-color", "#fff");
    $(".bianse2").css("background-color", "#fff");
    $(".bianse").css("background-color", "#f0f0f0");
}

function menuLi2() {
    //$(".bianse").css("background-color","#fff");
}

function menuLi3() {
    $(".bianse").css("background-color", "#fff");
    $(".bianse3").css("background-color", "#fff");
    $(".bianse2").css("background-color", "#f0f0f0");
}

function menuLi4() {
    //$(".bianse2").css("background-color","#fff");
}

function menuLi5() {
    $(".bianse").css("background-color", "#fff");
    $(".bianse2").css("background-color", "#fff");
    $(".bianse3").css("background-color", "#f0f0f0");
}

function menuLi6() {
    //$(".bianse3").css("background-color","#fff");
}

function bian(type) {
    if (type == 1) {
        menuLi();
    }
    ;
    if (type == 2) {
        menuLi3();
    }
    ;
    if (type == 3) {
        menuLi5();
    }
    ;
//			if(type!=1&&type!=2&&type!=3){
//
//			};
}

//静音切换
var flag = false;

function volSpeakerchange() {
    if (flag) {
        $(".volSpeaker").css("background-position", "0 -295px");
        var l = $(".dian2").css("left");
        var le = parseInt(l);
        audio.volume = (le / 80);
        flag = false;
    } else {
        $(".volSpeaker").css("background-position", "0 -313px");
        audio.volume = (0);
        flag = true;
    }

}


//纯净播放
var flag3 = false;

function pinBtnchange() {
    if (flag3) {
        $(".pinBtn").removeClass('changeBg');
        $(".mainBody").show();
        $(".leftBar").show();
        $(".mainOuther").removeClass('mainOuther2');
        $(".albumCover").removeClass('albumCover2');
        $(".canvas1").removeClass('canvas12');
        $(".albumSale").removeClass('albumSale2');
        $(".lyr").css("font-size", "12px");
        $(".lyr").css("line-height", "normal");
        $(".lyr").css("color", "black");
        $(".middle").css("background-color", "#fff");
        $(".middle").removeClass('bg');
        flag3 = false;
    } else {
        $(".pinBtn").addClass('changeBg');
        $(".mainBody").hide();
        $(".leftBar").hide();
        $(".mainOuther").addClass('mainOuther2');
        $(".albumCover").addClass('albumCover2');
        $(".canvas1").addClass('canvas12');
        $(".albumSale").addClass('albumSale2');
        $(".lyr").css("font-size", "18px");
        $(".lyr").css("line-height", "26px");
        $(".lyr").css("color", "#fff");
        $(".middle").addClass('bg');
        flag3 = true;
    }
}

//喜爱音乐添加
function addLoveMusic(sid) {
    $.ajax({
        url: "/addCollection",
        type: "post",
        async: false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
        contentType: "application/x-www-form-urlencoded",
        data: {
            id: sid
        },
        success: function (data) {
        }
    });
}

//音乐从列表删除
function moveMusic(sid, type) {
    //alert("运行"+"sid:"+sid+"   "+type)
    $.ajax({
        url: "/delesteColletionSong", //写一个控制器，返回后台更改数据库
        type: "post",
        async: false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
        contentType: "application/x-www-form-urlencoded",
        data: {
            sid: sid,
            type: type
        },
        success: function (data) {
        }

    });
}

//将音乐添加到歌单
function addSongsingle(sid, single) {
    $.ajax({
        url: "playMusic.do",
        type: "post",
        async: false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
        contentType: "application/x-www-form-urlencoded",
        data: {
            id: sid,
            musicListName: single,
            type: "sing",
        },
        success: function (data) {
        }

    });
}

//删除歌单
function moveSongSingle(single) {
    $.ajax({
        url: "deleteSongSingle.do",
        type: "post",
        async: false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
        contentType: "application/x-www-form-urlencoded",
        data: {
            musicListName: single,
        },
        success: function (data) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }

    });
}

function getListening(sid) {
    alert("yeyeye")
}

var qw = true
var songName2//歌曲名称
var singerName2//歌手名称
var sid2//歌曲ID
$(function () {

    //我喜爱的音乐，小红心系列操作
    $(".love").click(function () {
        var loveN = $(this).attr("loveN");
        var sid = $(this).parent().parent().find(".start em").attr("sonN");
        var singID = $(".songName").attr("singID");
        //alert(singID)
        if (loveN == 0) {
            $(this).css("background-position", "0 -131px");
            $(this).attr("loveN", "1");
            if (sid == singID) {
                $(".tc1").css("background-position", "0 -131px");
            }
            addLoveMusic(sid);//添加到我喜爱的音乐列表
        }
        ;
        if (loveN == 1) {
            var i = this;
            //删除我喜爱音乐的歌曲
            qikoo.dialog2.confirm('确定要将歌曲从我喜欢的音乐删除吗？', function () {
                moveMusic(sid, 'deleteMusicLove') //从我喜爱的音乐列表中删除
                $(i).css("background-position", "-28px -130px");
                $(i).attr("loveN", "0");
                if (sid == singID) {
                    $(".tc1").css("background-position", "0 -241px");
                }
            }, function () {
                $(i).attr("loveN", "1");
            });

        }
        ;
    });

    //下部小红心点击事件

    function shuaxin() {
        if (type == 3) {
            window.location.reload();
        }
    }


    //点击列表中的删除按钮删除歌曲
    $(".dele").click(function () {
        var sid = $(this).parent().parent().find(".start em").attr("sonN");
        var ListId = $(this).parent().parent().find(".start em").text() - 1;
        //$(this).parent().parent().find(".start em").attr("ListId");
        qikoo.dialog2.confirm('确定要将歌曲从当前列表删除吗？', function () {

            $(".songUL li:eq(" + ListId + ")").remove();
            moveMusic(sid, 'deleteMusicList'); //从列表中删除
            for (var i = 0; i < $(".songUL li").length; i++) {
                $(".songUL li:eq(" + i + ")").find(".start em").html(i + 1);
            }
            var len = $(".songUL li").length - 1;
            $(".mainBody").find("#gequ").html("歌曲(" + len + ")");
        }, function () {
        });

    });

    //点击删除歌单
    $(".dele2").click(function () {
        var single = $(this).attr("single3");
        var delNo = $(this).attr("delNo");
        qikoo.dialog2.confirm('确定要将此歌单删除吗？', function () {
            moveSongSingle(single); //从列表中删除
            $(".menuUL2 li:eq(" + delNo + ")").remove();
        }, function () {
        });
    });

    /*歌曲列表效果*/
    $(".songList").hover(function () {
        $(this).find(".more").show();
        $(this).find(".dele").show();
    }, function () {
        $(this).find(".more").hide();
        $(this).find(".dele").hide();
    });

    $(".menuLi2").hover(function () {
        $(this).find(".dele2").show();
    }, function () {
        $(this).find(".dele2").hide();
    });
    /*自定义滚动条*/
    $(".songUL").rollbar({zIndex: 80});
    $(".menuUL2").rollbar({zIndex: 80});
    //$("#lyr").rollbar({zIndex:80});
    /*复选框*/

    //点选
    $(".checkIn").click(function () {
        var s = $(this).attr("select");
        if (s == 0) {
            $(this).css("background-position", "-37px -710px");
            $(this).attr("select", "1");
        }
        ;
        if (s == 1) {
            $(this).css("background-position", "");
            $(this).attr("select", "0");
        }
        ;
    });

    //全选
    $(".checkAll").click(function () {
        var s = $(this).attr("select");
        var ch = document.getElementsByName("choose");
        if (document.getElementsByName("allChecked")[0].checked == true) {
            for (var i = 0; i < ch.length; i++) {
                ch[i].checked = true;
            }
        } else {
            for (var i = 0; i < ch.length; i++) {
                ch[i].checked = false;
            }
        }
        if (s == 0) {
            $(this).css("background-position", "-37px -710px");
            $(".checkIn[select='0']").css("background-position", "-37px -710px");
            $(".checkIn[select='0']").attr("select", "1");
            $(this).attr("select", "1");
        }
        ;
        if (s == 1) {
            $(this).css("background-position", "");
            $(".checkIn[select='1']").css("background-position", "");
            $(".checkIn[select='1']").attr("select", "0");
            $(this).attr("select", "0");
        }
        ;

    });


    //播放列表下方功能栏 删除歌曲功能
    $(".itDele").click(function () {
        var j = 0;
        var ch = document.getElementsByName("choose");
        for (var i = 0; i < ch.length; i++) {
            if (ch[i].checked) {
                j++;
            }
        }
        if (j == 0) {
            qikoo.dialog2.alert("未选择歌曲");
        } else {
            qikoo.dialog2.confirm('确定要删除所选的歌曲吗？', function () {
                for (var i = 0; i < ch.length; i++) {
                    if (ch[i].checked) {
                        //alert(ch[i].value)
                        moveMusic(ch[i].value, 'deleteMusicList');
                    }
                }
                var listlen = $(".songUL li").length - 1;
                var myc = new Array();
                var h = 0;
                for (var i = 0; i < listlen; i++) {//获取到被勾选的歌曲的列表序号
                    if ($(".songUL li:eq(" + i + ")").find(".checkIn").attr("select") == 1) {
                        myc[h++] = $(".songUL li:eq(" + i + ")").find(".start em").text() - 1;//将其存储到一个数组中
                    }
                }
                //这边是遍历一下数组，对照列表中的序号，如果数组中的序号存在于列表，就将该序号所代表的li去掉
                for (var i = 0; i < myc.length; i++) {
                    //alert(myc[i])
                    for (var j = 0; j < $(".songUL li").length - 1; j++) {
                        if ($(".songUL li:eq(" + j + ")").find(".start em").text() - 1 == myc[i]) {
                            $(".songUL li:eq(" + j + ")").remove();
                        }
                    }
                }
                //重新恢复列表顺序
                for (var i = 0; i < $(".songUL li").length; i++) {
                    $(".songUL li:eq(" + i + ")").find(".start em").html(i + 1);
                }
                //重新获取列表歌曲的数量
                var len = $(".songUL li").length - 1;
                $(".mainBody").find("#gequ").html("歌曲(" + len + ")");
            }, function () {

            });
        }
    });


    //播放列表下方功能栏 收藏功能
    $(".itShou").click(function () {
        var j = 0;
        var ch = document.getElementsByName("choose");
        for (var i = 0; i < ch.length; i++) {
            if (ch[i].checked) {
                j++;
            }
        }
        if (j == 0) {
            qikoo.dialog2.alert("未选择歌曲");
        } else {
            qikoo.dialog2.confirm('确定将所选的歌曲加入到我喜欢的音乐？', function () {
                var singID = $(".songName").attr("singID");
                for (var i = 0; i < ch.length; i++) {
                    if (ch[i].checked) {
                        addLoveMusic(ch[i].value);
                        if (ch[i].value == singID) {
                            $(".tc1").css("background-position", "0 -131px");
                        }
                    }
                }
                var listlen = $(".songUL li").length - 1;
                for (var i = 0; i < listlen; i++) {//获取到被勾选的歌曲的列表序号
                    if ($(".songUL li:eq(" + i + ")").find(".checkIn").attr("select") == 1) {
                        //alert($(".songUL li:eq("+i+")").find(".cicon love").attr("loveN"))
                        $(".songUL li:eq(" + i + ")").find(".love").css("background-position", "0 -131px");
                        $(".songUL li:eq(" + i + ")").find(".love").attr("loveN", "1");
                        $(".songUL li:eq(" + i + ")").find(".checkIn").css("background-position", "");
                        $(".songUL li:eq(" + i + ")").find(".checkIn").attr("select", "0");
                    }
                }

            }, function () {

            });
        }
    });

    //播放列表下方功能栏 添加到歌单功能


    $(".itJin").click(function (event) {
        event.stopPropagation();//阻止mousedown 事件冒泡（注意只阻止了mousedown事件）
        event.preventDefault();//阻止当前元素默认事件
        var j = 0;
        var ch = document.getElementsByName("choose");
        var pankong = $(this).parent().parent().parent().parent().find(".beijing").attr("single");
        for (var i = 0; i < ch.length; i++) {
            if (ch[i].checked) {
                j++;
            }
        }
        if (j == 0) {
            qikoo.dialog2.alert("未选择歌曲");
        } else if (typeof(pankong) == 'undefined') {
            qikoo.dialog2.alert("歌单为空，请新建歌单");
        } else {
            $(".songSingleChoose").show();
            $(".menuLi3").click(function () {
                var single = $(this).find(".beijing").attr("single");
                for (var i = 0; i < ch.length; i++) {
                    if (ch[i].checked) {
                        addSongsingle(ch[i].value, single);
                    }
                }
                $(".songSingleChoose").hide();
                var listlen = $(".songUL li").length - 1;
                for (var i = 0; i < listlen; i++) {//获取到被勾选的歌曲的列表序号
                    $(".songUL li:eq(" + i + ")").find(".checkIn").css("background-position", "");
                    $(".songUL li:eq(" + i + ")").find(".checkIn").attr("select", "0");
                }
            });
        }
    });
    $(document).click(function () {
        $(".songSingleChoose").hide();
    });


    /*点击列表播放按钮*/
    $(".start em").click(function () {
        qw = true
        /*开始放歌*/
        var sid = $(this).attr("sonN");
        /* alert(sid);*/
        sid2 = $(this).attr("sonN");
        $(".songName").attr("singID", sid);
        //var sonID=$(this).attr("sonID");
        var loveN = $(this).parent().parent().find(".love").attr("loveN");

        if (loveN == 1) {
            $(".tc1").css("background-position", "0 -131px");
        } else {
            $(".tc1").css("background-position", "0 -241px");
        }
        songIndex = sid;
        /*alert(songIndex);*/
        $.ajax({
            url: "/updateHistory",
            //什么什么配置把  应该复制就好
            type: "post",
            async: true,
            contentType: "application/x-www-form-urlencoded",
            //第一个参数是后台取值得名称， 第二个是 传值
            // 将 “test” 值传回后台， 后台用“id”接受   data:{id:test}
            data: {songIndex: songIndex},
            success: function (data) {
                console.log(data);

            }
        });

        //songIndex=sonID;
        //$("#audio").attr("src",'playmusic/songs/'+sid+'.mp3');
        $("#audio").attr("src", '../../songs/' + sid + '.mp3');
        var audio = document.getElementById("audio");//获得音频元素
        /*显示歌曲总长度*/
        if (audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }
        audio.addEventListener('timeupdate', updateProgress, false);
        audio.addEventListener('play', audioPlay, false);
        audio.addEventListener('pause', audioPause, false);
        audio.addEventListener('ended', audioEnded, false);
//		var listening = true
        songName2 = $(this).parent().parent().find(".colsn").html();//获取歌曲名称
        singerName2 = $(this).parent().parent().find(".colcn").html();//获取歌手名称
//		audio.addEventListener("timeupdate",function(){
//		    if(this.currentTime>5&&listening==true){
//					$.ajax({
//					    url : "listening.do",
//						type: "post",
//						async:false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
//						contentType:"application/x-www-form-urlencoded",
//						data: {musicId:sid,
//							   musicName:songName2,
//							   singer:singerName2
//				        },
//						success: function(data){
//						}
//
//					});
//					listening = false
//		    }
//		  },false);
        /*播放歌词*/
        getReady(sid);//准备播放
        mPlay();//显示歌词
        //对audio元素监听pause事件
        /*外观改变*/
        var html = "";
        html += '<div class="manyou">';
        html += '	<a href="#" class="manyouA">查看详细信息</a>';
        html += '</div>';
        $(".start em").css({
            "background": "",
            "color": ""
        });
        $(".manyou").remove();
        $(".songList").css("background-color", "#f5f5f5");
        $(this).css({
            "background": 'url("playmusic/css/images/T1X4JEFq8qXXXaYEA_-11-12.gif") no-repeat',
            "color": ""
        });
//		$(this).hover(function(){
//			"background":'url("playmusic/css/images/T1X4JEFq8qXXXaYEA_-11-12.gif") no-repeat'
//		});
        $(this).parent().parent().parent().append(html);
        $(this).parent().parent().parent().css("background-color", "#f0f0f0");

        /*底部显示歌曲信息*/
        var songName = $(this).parent().parent().find(".colsn").html();
        var singerName = $(this).parent().parent().find(".colcn").html();
        $(".songName").html(songName);
        $(".songPlayer").html(singerName);
        /*换右侧图片*/
        $("#canvas1").attr("src", '../../static/playmusic/images/' + sid + '.jpg');
        $("#canvas1").load(function () {
            loadBG();
        });
        //setTimeout('loadBG()',100);
        $(".blur").css("opacity", "0");
        $(".blur").animate({opacity: "1"}, 1000);


//		$(this).find('audio').bind('ended',function () {
//                alert("放完了");
//		});
    });

    /*双击播放*/
    $(".songList").dblclick(function () {
        var sid = $(this).find(".start em").html();
        $(".start em[sonN=" + sid + "]").click();
    });
    /*底部进度条控制*/
    $(".dian").draggable({
        containment: ".pro2",
        drag: function () {
            var l = $(".dian").css("left");
            var le = parseInt(l);
            audio.currentTime = audio.duration * (le / 678);
        }
    });
    /*音量控制*/
    $(".dian2").draggable({
        containment: ".volControl",
        drag: function () {
            var l = $(".dian2").css("left");
            var le = parseInt(l);
            audio.volume = (le / 80);
        }
    });
    /*底部播放按钮*/
    $(".playBtn").click(function () {
        var p = $(this).attr("isplay");
        if (p == 0) {
            $(this).css("background-position", "0 -30px");
            $(this).attr("isplay", "1");
        }
        ;
        if (p == 1) {
            $(this).css("background-position", "");
            $(this).attr("isplay", "0");
        }
        ;
        if (audio.paused)
            audio.play();
        else
            audio.pause();

    });
    $(".mode").click(function () {
        // var t = calcTime(Math.floor(audio.currentTime))+'/'+calcTime(Math.floor(audio.duration));
        // //alert(t);
        // var p =Math.floor(audio.currentTime)/Math.floor(audio.duration);
        // alert(p);
        //alert(lytext[1]);
    });
    /*切歌*/
    //后退
    $(".prevBtn").click(function () {
        var ch = document.getElementsByName("son");
        for (var i = 0; i < ch.length; i++) {
            if (ch[i].value == songIndex) {
                break;
            }
        }
        if (i == 0) {
            i = ch.length;
        }
        var sid = parseInt(i) - 1;
        $(".start em[sonN=" + ch[sid].value + "]").click();
    });

    //前进
    $(".nextBtn").click(function () {
        var ch = document.getElementsByName("son");
        for (var i = 0; i < ch.length; i++) {
            if (ch[i].value == songIndex) {
                break;
            }
        }
        if (i == ch.length - 1) {
            i = -1;
        }
        var sid = parseInt(i) + 1;
        $(".start em[sonN=" + ch[sid].value + "]").click();
    });


    function audioEnded(ev) {
        var playStyle = $(".playerCon").attr("playStyle");
        if (playStyle == 0) {
            shunXv(ev)
        }
        ;
        if (playStyle == 1) {
            danQv(ev)
        }
        ;
        if (playStyle == 2) {
            suiJi(ev)
        }
        ;
    }


    function shunXv(ev) {  //顺序播放   1
        var ch = document.getElementsByName("son");
        for (var i = 0; i < ch.length; i++) {
            if (ch[i].value == songIndex) {
                break;
            }
        }
        if (i == ch.length - 1) {
            i = -1;
        }
        var sid = parseInt(i) + 1;
        $(".start em[sonN=" + ch[sid].value + "]").click();
    }

    function danQv(ev) {  //单曲循环   2
        $(".start em[sonN=" + songIndex + "]").click();
    }

    function suiJi(ev) {  //随机播放  3
        var ch = document.getElementsByName("son");
        var j = ch.length - 1;
        var i = Math.floor(Math.random() * j + 1);
        var sid = parseInt(i);
        $(".start em[sonN=" + ch[sid].value + "]").click();
    }


});

/*首尾模糊效果*/
function loadBG() {
    //alert();
    // stackBlurImage('canvas1', 'canvas', 60, false);
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("canvas1");
    ctx.drawImage(img, 45, 45, 139, 115, 0, 0, 1366, 700);
    stackBlurCanvasRGBA('canvas', 0, 0, 1366, 700, 5);
}

function calcTime(time) {
    var hour;
    var minute;
    var second;
    hour = String(parseInt(time / 3600, 10));
    if (hour.length == 1) hour = '0' + hour;
    minute = String(parseInt((time % 3600) / 60, 10));
    if (minute.length == 1) minute = '0' + minute;
    second = String(parseInt(time % 60, 10));
    if (second.length == 1) second = '0' + second;
    return minute + ":" + second;
}

function updateProgress(ev) {

    /*显示歌曲总长度*/
    var songTime = calcTime(Math.floor(audio.duration));
    $(".duration").html(songTime);
    /*显示歌曲当前时间*/
    var curTime = calcTime(Math.floor(audio.currentTime));
    $(".position").html(curTime);
    /*进度条*/
    var lef = 678 * (Math.floor(audio.currentTime) / Math.floor(audio.duration));
    var llef = Math.floor(lef).toString() + "px";
    $(".dian").css("left", llef);
    if (this.currentTime > 60 && qw == true) {
        $.ajax({
            url: "listening.do",
            type: "post",
            async: false,//(默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
            contentType: "application/x-www-form-urlencoded",
            data: {
                musicId: sid2,
                musicName: songName2,
                singer: singerName2
            },
            success: function (data) {
            }

        });
        qw = false;
    }
}

function audioPlay(ev) {
    $(".iplay").css("background", 'url("playmusic/css/images/T1oHFEFwGeXXXYdLba-18-18.gif") 0 0');
    $(".playBtn").css("background-position", "0 -30px");
    $(".playBtn").attr("isplay", "1");
}

function audioPause(ev) {
    $(".iplay").css("background", "");
//	 $(".start em").css({
//	 	"background":'url("css/images/pause.png") no-repeat 50% 50%',
//	 	"color":"transparent"
//	 });
}


/*显示歌词部分*/
var scrollt = 0;
var tflag = 0;//存放时间和歌词的数组的下标
var lytext = new Array();//放存汉字的歌词
var lytime = new Array();//存放时间
var delay = 10;
var line = 0;
var scrollh = 0;
var songIndex = 2;

function getLy(s)//取得歌词
{
    var ly = "";
    if (s == "1") {
        ly = ".[00:00] 漂洋过海来看你 .[00:02] 演唱：刘明湘.[00:04] 词曲：李宗盛.[00:08] 歌词编辑：丁仔.[00:15] 中文歌词库 www.dingzai.com.[00:21] 为你我用了半年的积蓄.[00:24] 飘洋过海的来看你.[00:29] 为了这次相聚.[00:31] 我连见面时的呼吸 都曾反复练习.[00:36] .[00:38] 言语从来没能将我的情意.[00:42] 表达千万分之一.[00:47] 为了这个遗憾 我在夜里想了又想.[00:51] 不肯睡去.[00:54] .[00:55] 记忆它总是慢慢的累积.[00:59] 在我心中无法抹去.[01:04] 为了你的承诺.[01:05] 我在最绝望的时候 都忍着不哭泣.[01:13] .[01:14] 陌生的城市啊 熟悉的角落里.[01:23] 也曾彼此安慰 也曾相拥叹息.[01:26] 不管将会面对什么样的结局.[01:30] .[01:31] 在漫天风沙里望着你远去.[01:35] 我竟悲伤的不能自已.[01:39] 多盼能送君千里 直到山穷水尽.[01:44] 一生和你相依.[01:49] .[02:07] 陌生的城市啊 熟悉的角落里.[02:15] 也曾彼此安慰 也曾相拥叹息.[02:19] 不管将会面对什么样的结局.[02:23] .[02:23] 在漫天风沙里望着你远去.[02:27] 我竟悲伤的不能自已.[02:32] 多盼能送君千里 直到山穷水尽.[02:36] 一生和你相依.[02:42] .[02:43] 多盼能送君千里 直到山穷水尽.[02:50] 一生和你相依";
    }
    ;
    if (s == "2") {
        ly = ".[00:00:61]光年之外 - G:E:M:邓紫棋 .[00:00:90]词曲： G:E:M: 邓紫棋.[00:01:20]编曲： Lupo Groinig.[00:01:51]监制： Lupo Groinig.[00:12:30]感受停在我发端的指尖.[00:16:35]如何瞬间  冻结时间.[00:23:02]记住望着我坚定的双眼.[00:27:06]也许已经  没有明天.[00:33:69]面对浩瀚的星海.[00:36:26]我们微小得像尘埃.[00:38:64]漂浮在  一片无奈 .[00:44:57]缘份让我们相遇乱世以外.[00:50:04]命运却要我们危难中相爱.[00:55:45]也许未来遥远在光年之外.[01:00:91]我愿守候未知里为你等待.[01:04:90]我没想到  为了你  我能疯狂到.[01:10:54]山崩海啸  没有你  根本不想逃.[01:15:80]我的大脑  为了你  已经疯狂到  .[01:21:43]脉搏心跳  没有你  根本不重要.[01:28:57]一双围在我胸口的臂弯.[01:32:83]足够抵挡  天旋地转.[01:39:38]一种执迷不放手的倔强.[01:43:51]足以点燃  所有希望.[01:50:04]宇宙磅礡而冷漠.[01:52:64]我们的爱微小却闪烁.[01:55:13]颠簸  却如此忘我.[02:00:89]缘份让我们相遇乱世以外.[02:06:34]命运却要我们危难中相爱.[02:11:74]也许未来遥远在光年之外.[02:17:17]我愿守候未知里为你等待.[02:21:17]我没想到  为了你  我能疯狂到.[02:26:79]山崩海啸 没有你  根本不想逃.[02:32:17]我的大脑  为了你  已经疯狂到.[02:37:64]脉搏心跳  没有你  根本不重要.[02:43:79]也许航道以外  是醒不来的梦.[02:56:24]乱世以外  是纯粹的相拥.[03:05:00]我没想到  为了你  我能疯狂到.[03:10:50]山崩海啸 没有你  根本不想逃.[03:15:80]我的大脑  为了你  已经疯狂到  .[03:21:24]脉搏心跳  没有你  根本不重要.[03:27:24]相遇乱世以外 危难中相爱.[03:38:32]相遇乱世以外 危难中相爱.[03:48:55]我没想到.[03:50:12]";
    }
    ;
    if (s == "3") {
        ly = ".[00:00:00]GALA-追梦赤子心.[00:04:57].[00:15:33]充满鲜花的世界到底在哪里.[00:21:31]如果它真的存在那么我一定会去.[00:28:76]我想在那里最高的山峰矗立.[00:34:18]不在乎它是不是悬崖峭壁.[00:38:87].[00:42:01]用力活着用力爱哪怕肝脑涂地.[00:47:83]不求任何人满意只要对得起自己.[00:55:20]关于理想我从来没选择放弃.[01:00:66]即使在灰头土脸的日子里.[01:06:44].[01:07:39]也许我没有天分.[01:10:60]但我有梦的天真.[01:13:90]我将会去证明用我的一生.[01:20:64]也许我手比脚笨.[01:23:85]但我愿不停探寻.[01:27:26]付出所有的青春不留遗憾.[01:32:69].[01:34:61]向前跑 迎着冷眼和嘲笑.[01:40:16]生命的广阔不历经磨难怎能感到.[01:47:13]命运它无法让我们跪地求饶.[01:54:71]就算鲜血洒满了怀抱.[01:59:62].[02:00:98]继续跑 带着赤子的骄傲.[02:07:69]生命的闪耀不坚持到底怎能看到.[02:14:02]与其苟延残喘不如纵情燃烧吧.[02:22:16]有一天会再发芽.[02:29:03].[02:55:66]未来迷人绚烂总在向我召唤.[03:00:58]哪怕只有痛苦作伴也要勇往直前.[03:08:47]我想在那里最蓝的大海扬帆.[03:14:18]绝不管自己能不能回还.[03:19:62].[03:20:99]失败后郁郁寡欢.[03:23:86]那是懦夫的表现.[03:27:29]只要一息尚存请握紧双拳.[03:34:11]在天色破晓之前.[03:37:27]我们要更加勇敢.[03:40:74]等待日出时最耀眼的瞬间.[03:46:07].[03:47:77]向前跑 迎着冷眼和嘲笑.[03:54:10]生命的广阔不历经磨难怎能感到.[04:01:11]命运它无法让我们跪地求饶.[04:08:03]就算鲜血洒满了怀抱.[04:12:44].[04:14:31]继续跑 带着赤子的骄傲.[04:20:92]生命的闪耀不坚持到底怎能看到.[04:27:37]与其苟延残喘不如纵情燃烧.[04:35:17]为了心中的美好.[04:42:18]不妥协直到变老.[04:48:66]";
    }
    ;
    if (s == "4") {
        ly = ".[00:03:18]海阔天空-Beyond.[00:19:10]今天我 寒夜里看雪飘过.[00:25:14]怀着冷却了的心窝飘远方.[00:31:18]风雨里追赶 雾里分不清影踪.[00:37:32]天空海阔你与我 可会变.[00:43:78]多少次迎着冷眼与嘲笑.[00:50:10]从没有放弃过心中的理想.[00:56:06]一刹那恍惚 若有所失的感觉.[01:02:20]不知不觉已变淡 心里爱.[01:09:17]原谅我这一生不羁放纵爱自由.[01:16:05]也会怕有一天会跌倒.[01:22:17]背弃了理想谁人都可以.[01:28:27]哪会怕有一天只你共我.[01:43:34]今天我 寒夜里看雪飘过.[01:49:54]怀着冷却了的心窝飘远方.[01:55:46]风雨里追赶 雾里分不清影踪.[02:01:52]天空海阔你与我 可会变.[02:08:46]原谅我这一生不羁放纵爱自由.[02:15:28]也会怕有一天会跌倒.[02:21:58]背弃了理想谁人都可以.[02:27:77]哪会怕有一天只你共我.[02:39:27]仍然自由自我.[02:40:98]永远高唱我歌.[02:44:22]走遍千里 原谅我这一生不羁放纵爱自由.[02:55:79]也会怕有一天会跌倒.[03:02:05]背弃了理想 谁人都可以.[03:08:22]哪会怕有一天只你共我.[03:13:39]原谅我这一生不羁放纵爱自由.[03:20:65]也会怕有一天会跌倒.[03:26:70]背弃了理想谁人都可以.[03:33:25]哪会怕有一天只你共我";
    }
    ;
    if (s == "5") {
        ly = ".[00:00:41]温柔 - 五月天.[00:50:41]走在风中今天阳光 突然好温柔.[00:57:83]天的温柔 地的温柔 像你抱着我.[01:05:04]然后发现你的改变 孤单的今后.[01:11:38]如果冷 该怎么度过.[01:23:37]天边风光身边的我 都不在你眼中.[01:30:28]你的眼中藏着什么 我从来都不懂.[01:37:41]没有关系你的世界 就让你拥有.[01:43:62]不打扰 是我的温柔.[01:54:71]不知道不明了不想要 为什么我的心.[02:02:01]明明是想靠近 却孤单的黎明.[02:08:98]不知道不        明了不想要 为什么我的心.[02:16:25]那爱情的绮丽 总是在孤单里.[02:23:17]再把我的最好的爱给你.[02:30:71]不知不觉不情不愿 又到巷子口.[02:37:84]我没有哭也没有笑 因为这是梦.[02:44:76]没有预兆没有理由 你真的有说过.[02:50:91]如果有 就让你自由.[04:44:59]不知道不明了不想要 为什么我的心.[04:51:54]明明是想靠近 却孤单的黎明.[04:58:32]不知道不明了不想要 为什么我的心.[05:05:31]那爱情的绮丽 总是在孤单里.[05:11:98]再把我的最好的爱给你.[05:19:40]不知不觉不情不愿 又到巷子口.[05:26:28]我没有哭也没有笑 因为这是梦.[05:33:07]没有预兆没有理由 你真的有说过.[05:39:19]如果有 就让你自由.[05:54:57]自由…….[05:59:93]这是我的温柔 这是我的温柔 这是我的温柔.[06:10:29]这是我的……温柔.[06:26:14]就让你自由……";
    }
    ;
    if (s == "6") {
        ly = ".[00:00:74]刚好遇见你.[00:03:04].[00:04:63]作词：高进.[00:06:17]作曲：高进.[00:07:71]编曲：关天天.[00:09:25]演唱：李玉刚.[00:11:15].[00:13:02]我们哭了.[00:15:89]我们笑着.[00:19:06]我们抬头望天空.[00:22:12]星星还亮着几颗.[00:25:30]我们唱着.[00:28:36]时间的歌.[00:31:37]才懂得相互拥抱.[00:34:45]到底是为了什么.[00:37:14].[00:37:41]因为我刚好遇见你.[00:40:93]留下足迹才美丽.[00:44:03]风吹花落泪如雨.[00:47:16]因为不想分离.[00:49:77].[00:50:20]因为刚好遇见你.[00:53:26]留下十年的期许.[00:56:25]如果再相遇.[00:59:57]我想我会记得你.[01:03:30].[01:14:46]我们哭了.[01:17:53]我们笑着.[01:20:66]我们抬头望天空.[01:23:66]星星还亮着几颗.[01:26:82]我们唱着.[01:29:90]时间的歌.[01:32:96]才懂得相互拥抱.[01:36:00]到底是为了什么.[01:38:83].[01:39:14]因为我刚好遇见你.[01:42:52]留下足迹才美丽.[01:45:75]风吹花落泪如雨.[01:48:75]因为不想分离.[01:51:27].[01:51:74]因为刚好遇见你.[01:54:92]留下十年的期许.[01:57:98]如果再相遇Z.[02:01:08]我想我会记得你.[02:04:22]因为我刚好遇见你.[02:07:23]留下足迹才美丽.[02:10:42]风吹花落泪如雨.[02:13:40]因为不想分离.[02:15:94].[02:16:67]因为刚好遇见你.[02:19:42]留下十年的期许.[02:22:50]如果再相遇.[02:25:63]我想我会记得你.[02:29:44].[02:31:45]因为我刚好遇见你.[02:34:79]留下足迹才美丽.[02:37:95]风吹花落泪如雨.[02:41:03]因为不想分离.[02:43:94].[02:44:33]因为刚好遇见你.[02:47:10]留下十年的期许.[02:50:27]如果再相遇.[02:53:48]我想我会记得你.[03:10:54]";
    }
    ;
    if (s == "7") {
        ly = ".[00:00:03]她说.[00:07:31]作词：孙燕姿 作曲：林俊杰.[00:09:80]演唱：林俊杰.[00:12:88].[00:25:63]他静悄悄地来过.[00:30:81]他慢慢带走沉默.[00:36:69]只是最后的承诺.[00:42:59]还是没有带走了寂寞.[00:47:02].[00:48:33]我们爱的没有错.[00:53:72]只是美丽的独秀太折磨.[01:00:33]她说无所谓.[01:05:17]只要能在夜里 翻来覆去的时候有寄托.[01:11:05].[01:11:71]等不到天黑 烟火不会太完美.[01:17:10]回忆烧成灰 还是等不到结尾.[01:23:45]她曾说的无所谓 我怕一天一天被摧毁.[01:31:64].[01:34:13]等不到天黑 不敢凋谢的花蕾.[01:39:70]绿叶在跟随 放开刺痛的滋味.[01:44:75]今后不再怕天明 我想只是害怕清醒.[01:56:99].[02:23:69]他静悄悄地来过.[02:29:92]他慢慢带走沉默.[02:35:49]只是最后的承诺.[02:40:90]还是没有带走了寂寞.[02:45:94].[02:46:84]我们爱的没有错.[02:52:32]只是美丽的独秀太折磨.[02:58:80]她说无所谓.[03:03:55]只要能在夜里 翻来覆去的时候有寄托.[03:09:53].[03:10:26]等不到天黑 烟火不会太完美.[03:15:77]回忆烧成灰 还是等不到结尾.[03:21:97]她曾说的无所谓 我怕一天一天被摧毁.[03:30:06].[03:32:62]等不到天黑 不敢凋谢的花蕾.[03:38:39]绿叶在跟随 放开刺痛的滋味.[03:43:39]今后不再怕天明 我想只是害怕清醒.[03:53:85].[03:55:25]等不到天黑 烟火不会太完美.[04:00:89]回忆烧成灰 还是等不到结.[04:07:14]她曾说的无所谓 我怕一天一天被摧毁.[04:15:43].[04:17:88]等不到天黑 不敢凋谢的花蕾.[04:23:59]绿叶在跟随 放开刺痛的滋味.[04:28:49]今后不再怕天明 我想只是害怕清醒.[04:40:52]不怕天明 我想只是害怕清醒.[04:52:95]";
    }
    ;
    if (s == "8") {
        ly = ".[00:01:00]空白格.[00:02:00]演唱：蔡健雅.[00:03:14].[00:35:47]其实很简单 其实很自然.[00:42:49]两个人的爱由两人分担.[00:49:27]其实并不难 是你太悲观.[00:55:51]隔着一道墙不跟谁分享.[01:00:32]不想让你为难.[01:06:48]你不再需要给我个答案.[01:12:14]我想你是爱我的.[01:15:85]我猜你也舍不得.[01:19:21]但是怎么说 总觉得.[01:21:96]我们之间留了太多空白格.[01:26:20]也许你不是我的.[01:29:24]爱你却又该割舍.[01:31:94]分开或许是选择.[01:36:05]但它也可能是我们的缘分.[01:42:21].[02:04:09]其实很简单 其实很自然.[02:10:58]两个人的爱由两人分担.[02:16:93]其实并不难 是你太悲观.[02:23:49]隔着一道墙不跟谁分享.[02:28:79]不想让你为难.[02:35:22]你不再需要给我个答案.[02:41:79]我想你是爱我的.[02:45:37]我猜你也舍不得.[02:48:33]但是怎么说 总觉得.[02:51:11]我们之间留了太多空白格.[02:55:42]也许你不是我的.[02:58:60]爱你却又该割舍.[03:01:60]分开或许是选择.[03:05:56]但它也可能是我们的缘分.[03:11:74]我想你是爱我的.[03:15:24]我猜你也舍不得.[03:18:20]但是怎么说 总觉得.[03:21:14]我们之间留了太多空白格.[03:25:35]也许你不是我.[03:28:53]爱你却又该割舍.[03:31:41]分开或许是选择.[03:35:48]但它也可能是我们的缘分.[03:43:19]";
    }
    ;
    if (s == "9") {
        ly = ".[00:01:70]爱笑的眼睛.[00:03:57]演唱：林俊杰.[00:05:80].[00:14:64]如果不是那镜子.[00:16:73]不像你不藏秘密.[00:21:26]我还不肯相信.[00:23:02]没有你我的笑更美丽.[00:28:99]那天听你在电话里略带抱歉的关心.[00:36:03]我嘟的一声切的比你说分手彻底.[00:42:82].[00:43:50]泪湿的衣洗干净阳光里晒干回忆.[00:50:18]折好了伤心明天起只和快乐出去.[00:57:71]这爱的城市虽然拥挤.[01:01:15]如果真的遇见你.[01:04:90]你不必讶异我的笑她无法代替.[01:10:80].[01:12:36]离开你我才发现自己.[01:15:56]那爱笑的眼睛流过泪.[01:20:23]像躲不过的暴风雨.[01:23:95]淋湿的昨天删去(忘记).[01:26:81]离开你我才找回自己.[01:29:95]那爱笑的眼睛再见爱情.[01:34:69]我一定让自己让自己决定.[01:43:22].[01:59:26]泪湿的衣洗干净阳光里晒干回忆.[02:06:20]折好了伤心明天只和快乐出去.[02:13:30]这爱的城市虽然拥挤.[02:16:94]如果真的遇见你.[02:20:72]你不必讶异我的笑她无法代替.[02:26:89].[02:28:04]离开你我才发现自己.[02:31:29]那爱笑的眼睛流过泪.[02:35:99]当一个人看旧电影.[02:39:61]是我不小心而已.[02:42:47]离开你我才找回我自己.[02:45:74]那爱笑的眼睛再见到你.[02:50:62]我一定让自己让自己坚定.[03:00:22].[03:01:04]离开你我才发现自己.[03:03:96]那爱笑的眼睛流过泪.[03:08:53]像躲不过的暴风雨.[03:12:11]淋湿的昨天忘记.[03:15:02]离开你我才找回自己.[03:18:32]那爱笑的眼睛再见爱情.[03:23:22]我一定让自己让自己坚定.[03:31:31].[03:31:93]再见到你.[03:33:89]我一定让自己假装很坚定.[03:45:85]";
    }
    ;
    if (s == "10") {
        ly = ".[00:02:18]背对背拥抱.[00:04:83]作词：林怡凤 作曲：林俊杰.[00:06:79]演唱：林俊杰.[00:08:47].[00:15:23]话总说不清楚 该怎么明了.[00:22:70]一字一句像圈套.[00:29:90]旧帐总翻不完 谁无理取闹.[00:36:64]你的双手甩开刚好的微妙.[00:42:21]然后战火再燃烧.[00:46:49].[00:48:74]我们背对背拥抱.[00:52:40]滥用沉默在咆哮.[00:56:06]爱情来不及变老.[00:59:07]葬送在烽火的玩笑.[01:02:86].[01:03:51]我们背对背拥抱.[01:07:15]真话兜着圈子乱乱绕.[01:11:06]只是想让我知道.[01:14:94]只是想让你知道 爱的警告.[01:21:00].[01:23:74]话总说不清楚 该怎么明了.[01:30:68]一字一句像圈套.[01:38:22]旧帐总翻不完 谁无理取闹.[01:45:12]你的双手甩开刚好的微妙.[01:50:61]然后战火再燃烧.[01:54:53].[01:55:24]我们背对背拥抱.[01:58:82]滥用沉默在咆哮.[02:02:56]爱情来不及变老.[02:05:53]葬送在烽火的玩笑.[02:09:00].[02:10:71]我们背对背拥抱.[02:13:65]真话兜着圈子乱乱绕.[02:17:46]只是想让我知道.[02:21:23]只是想让你知道 爱的警告.[02:28:13].[02:29:35]我不要一直到 形同陌路变成自找.[02:36:47]既然可以拥抱  就不要轻易放掉.[02:43:67].[02:45:31]我们背对背拥抱.[02:48:74]滥用沉默在咆哮.[02:52:29]爱情来不及变老.[02:55:35]葬送在烽火的玩笑.[02:59:20].[02:59:62]我们背对背拥抱.[03:03:43]真话兜着圈子乱乱绕.[03:07:55]只是想让我知道.[03:11:21]只是想让你知道 这警告.[03:18:56]只是想让我知道.[03:22:14]只是想让你知道 爱的警告.[03:31:21]";
    }
    ;
    if (s == "11") {
        ly = ".[00:00:71]当你.[00:02:37]作词：张思尔 作曲：林俊杰:.[00:04:47]演唱：林俊杰:.[00:06:43]:.[00:14:70]如果有一天 我回到从前:.[00:20:53]回到最原始的我:.[00:24:91]你是否 会觉得我不错:.[00:29:36]如果有一天 我离你遥远:.[00:34:09]不能再和你相约:.[00:39:22]你是否会发觉 我已经说再见:.[02:52:16]:.[01:52:79]:.[00:45:12]:.[03:21:07]:.[02:52:37]:.[01:54:79]:.[00:46:78]当你的眼睛 瞇着笑 当你喝可乐 当你吵:.[03:27:87]:.[02:59:37]:.[02:01:96]:.[00:53:90]我想对你好 你从来不知道 想你 想你 也能成为嗜好:.[03:06:48]:.[02:09:14]:.[01:01:13]当你说今天的烦恼 当你说夜深 你睡不着:.[03:13:66]:.[02:16:38]:.[01:08:28]我想对你说 却害怕都说错 好喜欢你 知不知道:.[02:26:03]:.[01:17:32]:.[01:23:31]如果有一天 梦想都实现:.[01:28:68]回忆都成了永远 你是否还会 记得今天:.[01:37:43]如果有一天 我们都发觉:.[01:42:28]原来什么都可以 我们是否还会 停留在这里:.[02:29:58]:.[02:38:44]也许空虚 让我想得太多 也许该回到被窝:.[02:45:06]梦里会相遇 就毫不犹豫 大声的说我要说:.[03:34:86]:.[03:35:06]啦 ~ ~ ~ 啦 ~ ~ ~:.[03:42:40]我想对你说 却害怕都说错 好喜欢你 知不知道:.[03:52:21]";
    }
    ;
    if (s == "12") {
        ly = ".[00:01:25]冻结.[00:03:50]作词：张思尔 作曲：林俊杰.[00:06:33]演唱：林俊杰.[00:08:56].[00:16:21]不小心回到那一天.[00:20:20]不小心一切又重演.[00:24:03]你如此完美的一切.[00:27:93]竟会出现在我的世界.[00:31:73]你说话不爱说第二遍.[00:35:64]但偏在情人节那一夜.[00:39:45]给我你心爱的项链.[00:43:51]说了三次对我的爱恋.[00:48:14]我那时糊涂.[00:50:90]不明白为何你会哭.[00:54:86]后知后觉以后 领悟.[00:59:90].[01:03:30]冻结那时间 .[01:04:55]冻结初遇那一天.[01:07:03]冻结那爱恋.[01:08:52]冻结吻你那瞬间.[01:10:78]我  也会疲倦.[01:14:17]你的项链 在我身边 .[01:15:98]带我穿梭回从前.[01:18:60]冻结那空间 .[01:20:19]冻结有你的世界.[01:22:51]冻结那画面 .[01:23:97]冻结不让它溶解.[01:26:36]我  若是疲倦.[01:29:64]你的项链 在我身边 .[01:31:57]发光在我胸前.[01:33:67]你的项链 在我身边.[01:35:39]陪伴着我过每一天.[01:38:48].[02:13:49]不小心回到那一天.[02:17:38]不小心一切又重演.[02:20:90]你如此完美的一切.[02:24:80]竟会出现在我的世界.[02:28:68]你说话不爱说第二遍.[02:32:60]但偏在情人节那一夜.[02:36:37]给我你心爱的项链.[02:40:42]说了三次对我的爱恋.[02:44:55]我那时糊涂.[02:47:85]不明白为何你会哭.[02:51:60]后知后觉以后 领悟.[02:56:84].[03:00:33]冻结那时间 .[03:01:65]冻结初遇那一天.[03:03:95]冻结那爱恋 .[03:05:45]冻结吻你那瞬间.[03:07:73]我  也会疲倦.[03:11:09]你的项链 在我身边 .[03:12:95]带我穿梭回从前.[03:15:55]冻结那空间 .[03:17:15]冻结有你的世界.[03:19:49]冻结那画面 .[03:21:13]冻结不让它溶解.[03:23:34]我  若是疲倦.[03:26:70]你的项链 在我身边 .[03:28:41]发光在我胸前.[03:30:70]你的项链 在我身边 .[03:32:28]陪伴着我过每一天.[03:35:59].[03:39:24]冻结那时间 .[03:40:63]冻结初遇那一天.[03:42:87]冻结那爱恋 .[03:44:40]冻结吻你那瞬间.[03:46:71]我  也会疲倦.[03:50:05]你的项链 在我身边 .[03:51:86]带我穿梭回从前.[03:54:42]冻结那空间 .[03:56:27]冻结有你的世界.[03:58:44]冻结那画面 .[04:00:02]冻结不让它溶解.[04:02:29]我  若是疲倦.[04:05:63]你的项链 在我身边 .[04:07:43]发光在我胸前.[04:09:71]你的项链 在我身边 .[04:11:27]陪伴着我过每一天.[04:14:76].[04:17:65]你的项链 在我身边 .[04:19:13]发光在我胸前.[04:21:49]你的项链 在我身边 .[04:23:37]陪伴着我过每一天.[04:28:16]";
    }
    ;
    if (s == "13") {
        ly = ".[00:02:00]江南.[00:04:00]作词：李瑞洵  作曲：林俊杰.[00:06:00]演唱：林俊杰.[00:08:00].[00:35:80]风到这里就是粘.[00:39:16]粘住过客的思念.[00:43:67]雨到了这里缠成线.[00:47:17]缠着我们流连人世间.[00:51:83]你在身边就是缘.[00:55:26]缘分写在三生石上面.[00:59:80]爱有万分之一甜.[01:03:26]宁愿我就葬在这一天.[01:07:89]圈圈圆圆圈圈.[01:11:14]天天年年天天 的我.[01:13:88]深深看你的脸.[01:16:29]生气的温柔  埋怨的温柔 的脸.[01:23:46].[01:24:53]不懂爱恨情愁煎熬的我们.[01:28:02]都以为相爱就像风云的善变.[01:32:11]相信爱一天  抵过永远.[01:36:46]在这一刹那冻结了时间.[01:40:26]不懂怎么表现温柔的我们.[01:44:08]还以为殉情只是古老的传言.[01:47:95]离愁能有多痛  痛有多浓.[01:52:57]当梦被埋在江南烟雨中.[01:55:81]心碎了才懂.[01:59:16].[02:21:38]圈圈圆圆圈圈.[02:23:12]天天年年天天 的我.[02:25:87]深深看你的脸.[02:28:25]生气的温柔  埋怨的温柔 的脸.[02:35:51].[02:36:37]不懂爱恨情愁煎熬的我们.[02:40:08]都以为相爱就像风云的善变.[02:44:07]相信爱一天  抵过永远.[02:48:60]在这一刹那冻结了时间.[02:52:24]不懂怎么表现温柔的我们.[02:56:13]还以为殉情只是古老的传言.[03:00:06]离愁能有多痛  痛有多浓.[03:04:53]当梦被埋在江南烟雨中.[03:07:83]心碎了才懂.[03:11:28].[03:20:38]相信爱一天  抵过永远.[03:24:61]在这一刹那冻结了时间.[03:28:24]不懂怎么表现温柔的我们.[03:32:06]还以为殉情只是古老的传言.[03:36:02]离愁能有多痛  痛有多浓.[03:40:55]当梦被埋在江南烟雨中.[03:45:93]心碎了才懂.[03:49:37]";
    }
    ;
    if (s == "14") {
        ly = ".[00:01:80]曹操.[00:03:87]作词：林秋离 作曲：林俊杰.[00:06:43]演唱：林俊杰.[00:08:96].[00:27:19]不是英雄 .[00:30:33]不读三国.[00:33:47]若是英雄.[00:36:14]怎么能不懂寂寞.[00:39:55]独自走下长坂坡.[00:41:44]月光太温柔.[00:43:23]曹操不啰嗦.[00:44:93]一心要那荆州.[00:46:93]用阴谋 阳谋.[00:48:49]明说 暗夺淡泊.[00:50:86].[00:53:56]东汉末年分三国.[00:56:61]烽火连天不休.[01:00:15]儿女情长 被乱世左右.[01:05:10]谁来煮酒.[01:06:86]尔虞我诈是三国.[01:09:85]说不清对与错.[01:13:62]纷纷扰扰 千百年以后.[01:18:49]一切又从头.[01:20:94].[01:33:79]不是英雄 不读三国.[01:40:10]若是英雄.[01:42:92]怎么能不懂寂寞.[01:46:28]独自走下长坂坡.[01:48:08]月光太温柔.[01:49:94]曹操不啰嗦.[01:51:55]一心要那荆州.[01:53:49]用阴谋 阳谋.[01:55:15]明说 暗夺淡泊.[01:57:98].[02:00:48]东汉末年分三国.[02:03:28]烽火连天不休.[02:06:91]儿女情长 被乱世左右.[02:11:77]谁来煮酒.[02:13:56]尔虞我诈是三国.[02:16:61]说不清对与错.[02:20:27]纷纷扰扰 千百年以后.[02:25:14]一切又从头.[02:27:58].[02:40:18]独自走下长坂坡.[02:41:54]月光太温柔.[02:43:28]曹操不啰嗦.[02:44:84]一心要那荆州.[02:46:78]用阴谋 阳谋.[02:48:46]明说 暗夺淡泊.[02:50:65].[02:52:73]东汉末年分三国.[02:56:77]烽火连天不休.[03:00:18]儿女情长 被乱世左右.[03:05:17]谁来煮酒.[03:06:90]尔虞我诈是三国.[03:09:90]说不清对与错.[03:13:59]纷纷扰扰 千百年以后.[03:1]喔…….[03:30:81]";
    }
    ;
    if (s == "15") {
        ly = ".[00:02:00]翅膀.[00:05:00]作词：张思尔 作曲：林俊杰.[00:08:00]演唱：林俊杰.[00:11:00].[00:14:91]同样的机场 不同世界.[00:21:86]同样的咖啡 不同味觉.[00:28:90]同样的我 和我都少了一些.[00:35:98]看飞机划过天空不 见了.[00:41:68].[00:46:40]用你给我的翅膀飞.[00:50:04]我懂这不是伤悲.[00:53:57]再高都不会累.[00:56:49]我们都说好了.[01:00:84]用你给我的翅膀飞.[01:04:32]我感觉己够安慰.[01:07:71]乌云也不再多.[01:10:52]我们也不为谁掉眼泪.[01:15:76].[01:28:79]空气中藏着 你的香味.[01:36:07]回忆里躲着 你的眼泪.[01:42:97]最后拥抱的温暖 还有一些.[01:50:17]我拖著行李往前一 直走.[01:58:11].[02:00:79]用你给我的翅膀飞.[02:04:07]我懂这不是伤悲.[02:07:71]再高都不会累.[02:10:76]我们都说好了.[02:14:74]用你给我的翅膀飞.[02:18:34]我感觉己够安慰.[02:21:85]乌云也不再多.[02:24:61]我们也不为谁掉眼泪.[02:28:84]看一看回忆 是云朵一朵朵地飘过.[02:35:99]若想要回头 就无法翱翔.[02:43:22]用你给我的翅膀飞.[02:46:50]我懂这不是伤悲.[02:50:06]再高都不会累.[02:53:07]我们都说好了.[02:57:19]用你给我的翅膀飞.[03:00:65]我感觉己够安慰.[03:04:20]乌云也不再多.[03:06:84]我们也不为谁掉眼泪.[03:12:44].[03:15:00]乌云也不再多.[03:17:57]我们也不为谁掉眼泪.[03:23:67]";
    }
    ;
    if (s == "16") {
        ly = ".[00:00:00]美人鱼.[00:02:00]作词：简胜，林秋离 作曲：林俊杰.[00:04:00]演唱：林俊杰.[00:08:00].[00:26:34]我在沙滩划个圆圈.[00:29:29]属于我俩安逸世界.[00:31:94]不用和别人连线.[00:36:93]我不管你来自深渊.[00:39:35]也不在乎身上的鳞片.[00:41:94]爱情能超越一切.[00:46:24]只要你在我身边.[00:48:23]所有蜚语流言 完全视而不见.[00:51:21]请不要匆匆一面.[00:53:13]一转身就沉入海平线.[00:56:39].[00:58:91]传说中你为爱甘心被搁浅.[01:03:76]我也可以为你 潜入海里面.[01:08:36]怎么忍心断绝.[01:10:93]忘记我不变的誓言.[01:14:85]我眼泪断了线.[01:19:16]现实里有了我对你的眷恋.[01:23:92]我愿意化作雕像 等你出现.[01:28:84]再见再也不见.[01:31:17]心碎了飘荡在海边.[01:34:75]你抬头就看见.[01:36:76].[01:59:82]我在沙滩划个圆圈.[02:02:46]属于我俩安逸世界.[02:05:23]不用和别人连线.[02:10:18]我不管你来自深渊.[02:12:80]也不在乎身上鳞片.[02:15:17]爱情能超越一切.[02:19:62]只要你在我身边.[02:21:52]所有蜚语流言 完全视而不见.[02:24:66]请不要匆匆一面.[02:26:60]一转身就沉入海平线.[02:30:82].[02:32:33]传说中你为爱甘心被搁浅.[02:37:27]我也可以为你 潜入海里面.[02:41:95]怎么忍心断绝.[02:44:42]忘记我不变的誓言.[02:47:96]我眼泪断了线.[02:52:48]现实里有了我对你的眷恋.[02:57:43]我愿意化作雕像 等你出现.[03:02:16]再见再也不见.[03:04:71]心碎了飘荡在海边.[03:08:28]你抬头就看见.[03:10:76].[03:12:67]传说中你为爱甘心被搁浅.[03:17:73]我也可以为你 潜入海里面.[03:22:34]怎么忍心断绝.[03:24:85]忘记我不变的誓言.[03:28:43]我眼泪断了线.[03:32:95]现实里有了我对你的眷恋.[03:37:97]我愿意化作雕像 等你出现.[03:42:61]再见再也不见.[03:45:20]心碎了飘荡在海边.[03:48:70]你抬头就看见.[03:51:32].[03:52:74]你 你抬头就看见.[03:57:88]你 你抬头就看见.[04:03:81]";
    }
    ;
    if (s == "17") {
        ly = ".[00:00:83]Always Online - 林俊杰.[00:17:27]变色的生活.[00:18:85]任性的挑拨.[00:20:97]疯狂的冒出了头.[00:25:31]短短的守候.[00:27:12]是他的温柔.[00:28:97]还是少了点什么.[00:33:08]遥远两端爱挂在天空飞.[00:37:17]风停了也无所谓.[00:40:72]只因为你曾说.[00:43:23]Everything will be okay.[00:47:81]我准备好了.[00:49:07]Three two one.[00:50:86]I'm always online.[00:52:44]和你 one to one.[00:54:39]爱开始扩散.[00:56:55]我们连接了穿越天空银河 oh oh.[01:04:17]开始倒数.[01:05:00]Three two one.[01:06:21]删除我的孤单.[01:08:40]More and more 尽是深刻.[01:13:32]爱亮了 爱笑了.[01:15:45]I'm always online.[01:21:42]变色的生活.[01:23:13]任性的挑拨.[01:24:91]疯狂的冒出了头.[01:29:44]短短的守候.[01:30:83]是他的温柔.[01:32:66]却还是少了点什么.[01:37:15]遥远两端爱挂在天空飞.[01:40:92]风停了也无所谓.[01:44:53]只因为你曾说.[01:46:62]Everything will be okay.[01:52:08]我准备好了.[01:53:10]Three two one.[01:54:66]I'm always online.[01:56:54]和你 one to one.[01:58:43]爱开始扩散.[02:00:35]我们连接了穿越天空银河 oh oh.[02:07:98]开始倒数.[02:08:94]Three two one.[02:10:32]删除我的孤单.[02:12:28]More and more 尽是深刻.[02:17:36]爱亮了 爱笑了.[02:19:42]I'm always online.[02:41:93]我准备好了.[02:42:96]Three two one.[02:44:63]I'm always online.[02:46:51]和你 one to one.[02:48:45]爱开始扩散.[02:50:34]我们连接了穿越天空银河.[02:57:96]开始倒数.[02:58:78]Three two one.[03:02:62]删除我的孤单.[03:03:71]More and more 尽是深刻.[03:07:27]爱亮了 爱笑了.[03:09:18]I'm always online.[03:15:43]爱亮了 爱笑了.[03:17:54]I'm always online";
    }
    ;
    if (s == "18") {
        ly = ".[00:00:00].[00:02:00]一千年以后.[00:04:00]作词：李瑞洵 作曲：林俊杰.[00:06:00]演唱：林俊杰.[00:12:00].[00:15:58]心 跳乱了节奏.[00:19:76]梦也不自由.[00:23:48]爱 是个绝对承诺 不说.[00:29:48]撑到一千年以后.[00:31:54]放任无奈 淹没尘埃.[00:35:38]我在废墟之中守着你走来  Ho.[00:39:34]我的泪光 承载不了  Ho.[00:45:16]所有一切你要的爱.[00:49:19].[00:49:65]因为在 一千年以后.[00:54:46]世界早已没有我.[00:58:46]无法深情挽着你的手.[01:02:53]浅吻着你额头.[01:05:67]别等到 一千年以后.[01:10:04]所有人都遗忘了我.[01:14:08]那时红色黄昏的沙漠.[01:17:94]能有谁 解开缠绕千年的寂寞.[01:25:04].[01:41:03]放任无奈 淹没尘埃.[01:45:93]我在废墟之中守着你走来  H.[01:50:12]我的泪光 承载不了  Ho.[01:55:67]所有一切你需要的爱.[02:00:46].[02:00:53]因为在 一千年以后.[02:05:57]世界早已没有我.[02:09:58]无法深情挽着你的手.[02:13:71]浅吻着你额头.[02:16:85]别等到 一千年以后.[02:21:29]所有人都遗忘了我.[02:25:13]那时红色黄昏的沙漠.[02:29:11]能有谁 解开缠绕千年的寂寞.[02:35:92].[02:48:58]无法深情挽着你的手.[02:52:73]浅吻着你额头.[02:55:87]别等到 一千年以后.[03:00:33]所有人都遗忘了我.[03:04:29]那时红色黄昏的沙漠.[03:08:23]能有谁 解开缠绕千年的 寂寞.[03:15:77]Ho 缠绕千年的寂寞.[03:26:83]";
    }
    ;
    if (s == "19") {
        ly = ".[00:00:85]爱不会绝迹.[00:08:43]作词：王雅君 作曲：林俊杰.[00:10:26]演唱：林俊杰.[00:11:96].[00:21:68]我站在世界的屋顶.[00:28:21]用放大镜看天地.[00:34:37]发现太多的神奇.[00:38:04]一起去寻觅 未知的命运.[00:45:08].[00:48:43]宁愿相信爱永不会绝迹.[00:52:03]谁能抹去那些古老传奇.[00:55:12]我们手握紧 勇气和信心 就能够无敌.[01:00:56].[01:01:44]渴望每个明天绝不放弃.[01:04:63]努力燃烧用不完的活力.[01:07:81]幻想的天地 揭开了奥秘 心跳永不暂停.[01:14:99].[01:43:67]我预言下一秒危机.[01:50:26]有你就不怕荆棘.[01:56:59]并肩创造的奇迹.[02:00:12]都记在心底 友情和恒星.[02:07:01].[02:07:69]宁愿相信爱永不会绝迹.[02:10:95]谁能抹去那些古老传奇.[02:14:05]我们手握紧 勇气和信心 就能够无敌 yeah.[02:18:88].[02:20:43]渴望每个明天绝不放弃.[02:23:56]努力燃烧用不完的活力.[02:26:71]幻想的天地 揭开了奥秘 心跳永不暂停.[02:33:86].[02:42:61]不管经过多少难题.[02:45:98]不管穿越多少距离.[02:49:28]心和你 越靠近.[02:52:54]梦想就会更清晰.[02:54:56].[02:55:20]渴望每个明天绝不放弃.[02:58:34]努力燃烧用不完的活力.[03:01:55]幻想的天地 揭开了奥秘 心跳永不暂停.[03:07:17].[03:07:81]宁愿相信爱永不会绝迹.[03:10:92]谁能抹去那些古老传奇.[03:14:10]我们手握紧 勇气和信心.[03:17:11].[03:20:53]渴望每个明天绝不放弃.[03:23:53]努力燃烧用不完的活力.[03:26:82]幻想的天地 揭开了奥秘 心跳永不暂停.[03:33:20]我 始终都相信 爱不会绝迹.[03:41:60]";
    }
    ;
    if (s == "20") {
        ly = ".[00:00:49]红色高跟鞋.[00:05:02]作词：蔡健雅　作曲：蔡健雅.[00:07:28]演唱：蔡健雅.[00:09:21].[00:22:24]该怎么去形容你最贴切.[00:27:39]拿什么跟你作比较才算特别.[00:33:24]对你的感觉 强烈.[00:36:02]却又不太了解 只凭直觉.[00:41:75].[00:42:19]你像我在被子里的舒服.[00:47:58]却又像风 琢磨不住.[00:52:19]像手纹 像散发的香水味.[00:58:15]像爱不释手的 红色高跟鞋.[01:07:19].[01:16:53]该怎么去形容你最贴切.[01:21:65]拿什么跟你作比较才算特别.[01:27:61]对你的感觉 强烈.[01:30:43]却又不太了解 只凭直觉.[01:36:01].[01:36:48]你像我在被子里的舒服.[01:41:99]却又像风 琢磨不住.[01:47:15]像手纹 像散发的香水味.[01:52:64]像爱不释手的 红色高跟鞋.[02:04:23].[02:14:30]你像我在被子里的舒服.[02:20:06]却又像风 琢磨不住.[02:25:02]像手纹 像散发的香水味.[02:30:91]像爱不释手的.[02:34:70].[02:36:12]我爱你有种左灯右行的冲突.[02:41:98]疯狂却怕没有退路.[02:47:12]你能否让我停止这种追逐.[02:53:02]就这么双 最后唯一的 红色高跟鞋.[03:01:56]";
    }
    ;
    if (s == "21") {
        ly = ".[00:01:72]停格.[00:03:76]演唱;蔡健雅.[00:05:40].[00:06:80]动情是容易的 因为不会太久.[00:14:83]远远的 仿佛可以触摸.[00:21:01]留恋是不幸的 因为曾经拥有.[00:28:83]夜夜被思念缠扰着.[00:35:39].[00:35:76]无奈我们看懂彼此是彼此的过客啊.[00:42:97]爱情是个轮廓不可能私有.[00:49:73]把最初的感动巨细无遗的保留心中.[00:56:97]不容许让时间腐朽了初衷.[01:03:08].[01:03:31]所以放手 所以隐藏 湿透的袖口.[01:17:40]不要挽留 不要回头 记忆续相守.[01:31:11].[01:35:10]快乐是容易的 因为短暂逗留.[01:42:99]不必换算时间磨合.[01:49:13]深爱是残忍的 它不喜新厌旧.[01:57:12]你我 同困在这漩涡.[02:03:46].[02:04:07]无奈我们看懂彼此是彼此的过客啊.[02:11:23]爱情是个轮廓不可能私有.[02:18:05]把最初的感动巨细无遗的保留心中.[02:25:20]才不容许让时间腐朽了初衷.[02:31:27].[02:31:56]所以放手 所以隐藏 湿透的袖口.[02:45:57]不要挽留 不要回头 记忆续相守.[02:59:51].[02:59:77]花儿枯了 时间走了 没有不舍得.[03:13:70]心脏停了 空气死了 爱从此停格.[03:39:50]";
    }
    ;
    if (s == "22") {
        ly = ".[00:00:00]被驯服的象.[00:04:64]蔡健雅.[00:09:74].[00:22:46]到底要笑得多虚伪　才能够融入这世界.[00:28:13]每个人的脸上都像是贴了张一样的假面.[00:33:71]想不起我在做什么　想不起我在想什么.[00:39:12]想不起灵魂深处　到底发生了什么.[00:43:95]迷雾 迷雾 在迷雾　我惊觉自己在原地踏步.[00:49:03]到底是谁把我心蒙住　不想再糊涂.[00:54:63]迷路 迷路 迷了路　我就彻底被这团迷雾困住.[00:59:92]谁能够指引我一条路　带我走上正途.[01:07:94].[01:16:94]装不出融入的态度　空气里充斥着虚无.[01:22:68]说什么都掩饰不了我这局外人的局促.[01:28:21]想不通自己怎么了　想不通世界怎么了.[01:33:61]想不通心灵深处　到底变成什么了.[01:38:30]迷雾 迷雾 在迷雾　我惊觉自己在原地踏步.[01:43:54]到底是谁把我心蒙住　不想再糊涂.[01:49:24]迷路 迷路 迷了路　我就彻底被这团迷雾困住.[01:54:46]谁能够指引我一条路　带我走上正途.[02:00:34]掌声 若需要掌声　只要你愿当被驯服的象.[02:08:16]这舞台你就可以上　荣耀 胜过被嘲笑.[02:15:60]所以抛开自尊　咬紧牙根硬撑.[02:21:92]迷雾 迷雾 在迷雾　我惊觉自己在原地踏步.[02:27:11]到底是谁把我心蒙住　不想再糊涂.[02:32:89]迷路 迷路 迷了路　我就彻底被这团迷雾困住.[02:38:08]谁能够指引我一条路　带我走上正途.[02:44:13]迷路 迷路 迷了路　我就彻底被这团迷雾困住.[02:48:94]谁能够指引我一条路　带我走上正途.[02:59:51]";
    }
    ;
    if (s == "23") {
        ly = ".[00:01:08]很靠近海(《逆光飞翔》 电影主题曲)-蔡健雅.[00:16:86]听见天晴 听见黑暗.[00:23:73]听见人潮中有你.[00:31:10]我跟着你气息 就分外安心.[00:38:20]我没有翅膀 却觉得能飞行.[00:45:42]那些梦想 沿着指尖 舞成一篇协奏曲.[00:59:87]这默契像似奇迹 若有谁在牵引.[01:06:83]我逆光前进 却再也不恐惧.[01:18:08]因为你我靠近海 因为你我懂得爱.[01:32:20]迎面你笑声传来 我感觉一阵温暖.[01:46:52]看不见眼前的海 看不见阳光灿烂.[02:00:89]迎面有海风吹来 我心里一片蔚蓝.[02:25:86]那些梦想 沿着指尖 舞成一篇协奏曲.[02:40:13]这默契像似奇迹 若有谁在牵引.[02:47:24]我逆光前进 却再也不恐惧.[02:58:33]因为你我靠近海 因为你我懂得爱.[03:12:50]迎面你笑声传来 我感觉一阵温暖.[03:26:72]看不见眼前的海 看不见阳光灿烂.[03:41:14]迎面有海风吹来 我心里一片蔚蓝";
    }
    ;
    if (s == "24") {
        ly = ".[00:00:00]十万毫升泪水(电影《爱在午夜希腊时》中文宣传曲) - 蔡健雅.[00:03:11]词:小寒 曲:蔡健雅.[00:06:72]知道我不完美.[00:12:98]能给的我都给.[00:17:15]于是天蓝.[00:19:74]转灰 转黑.[00:23:16]也微笑不插嘴.[00:26:09]这一次会气馁.[00:32:08]连平凡爱一回.[00:36:39]都才将心给谁.[00:40:22]马上又被粉碎.[00:51:26]满意了吗.[00:54:79]你究竟有完没完.[00:58:00]你烦不烦.[01:01:14]总考验我多勇敢.[01:04:39]有那么难.[01:07:60]那么幸福和美满.[01:10:75]我不贪婪.[01:12:95]只求多些夜晚.[01:16:43]不鼻酸 不孤单.[01:22:35]我想要的快乐.[01:24:57]很简单.[01:28:55]你都不管.[01:31:11].[01:36:28]人的一生会积累.[01:42:59]十万毫升泪水.[01:46:98]以为哭完苦悲苦味.[01:52:78]能换来好结尾.[01:55:59]并不是我后悔.[02:01:72]爱会痛我奉陪.[02:05:88]只是轮到我没.[02:10:14]谁视我为宝贝.[02:21:04]满意了吗.[02:24:22]你究竟有完没完.[02:27:55]你烦不烦.[02:30:61]总考验我多勇敢.[02:33:90]有那么难.[02:37:12]那么幸福和美满.[02:40:34]我不贪婪.[02:42:62]只求多些夜晚.[02:46:14]不鼻酸 不孤单.[02:51:68]我想要的快乐.[02:54:16]很简单.[02:57:84]你都不管.[03:02:16].[03:05:84]有完没完.[03:09:08]我已无条件投降.[03:12:43]我要归还.[03:15:60]向你借来的勇敢.[03:18:69]我不野蛮.[03:21:85]不属于我的美满.[03:25:14]都不贪婪.[03:27:28]只求一到夜晚.[03:30:88]有期盼 有陪伴.[03:36:90]我想要你.[03:38:08]给我个答案.[03:42:87]你却不管.[03:49:50]你都不管.[03:52:14].[03:55:41]你别不管.[04:02:34]我的伤感.[04:06:55]";
    }
    ;
    if (s == "25") {
        ly = ".[00:03:12]没那么简单(电影《单身男女2》片尾曲)-岑宁儿 .[00:03:73]词：姚若龙 曲：萧煌奇.[00:14:24]没那么简单.[00:16:97]就能去爱别的全不看.[00:22:82]变得实际也许好也许坏各一半.[00:30:17]不爱孤单一久也习惯.[00:37:90]不用担心谁也不用被谁管.[00:44:78]感觉快乐就忙东忙西.[00:48:84]感觉累了就放空自己.[00:52:84]别人说的话随便听一听.[00:56:19]自己做决定.[00:59:99]不想拥有太多情绪.[01:03:31]一杯红酒配电影.[01:07:19]在周末晚上关上了手机.[01:10:95]舒服窝在沙发里.[01:14:14]相爱没有那么容易.[01:17:84]每个人有他的脾气.[01:21:38]过了爱做梦的年纪.[01:25:46]轰轰烈烈不如平静.[01:28:46]幸福没有那么容易.[01:31:96]才会特别让人着迷.[01:36:03]什么都不懂的年纪.[01:39:83]曾经最掏心.[01:41:63]所以最开心曾经.[01:50:36]想念最伤心.[01:53:98]但却最动心的记忆.[02:00:73]";
    }
    ;
    if (s == "26") {
        ly = ".[00:00:00]追光者.[00:00:22]词：唐恬.[00:00:35]曲：马敬.[00:00:48]编曲：黎偌天.[00:00:90].[00:25:20]如果说你是海上的烟火.[00:30:09]我是浪花的泡沫.[00:32:99].[00:33:91]某一刻你的光照 亮了我.[00:37:38].[00:38:47]如果说你是遥远的星河.[00:43:41]耀眼得让人想哭.[00:46:69].[00:48:99]我是追逐着你的眼眸.[00:51:63].[00:52:19]总在孤单时候眺望夜空.[00:56:70].[01:01:43]我可以跟在你身后.[01:04:68]像影子追着光梦游.[01:07:95]我可以等在这路口.[01:11:37]不管你会不会经过.[01:14:74]每当我为你抬起头.[01:17:96]连眼泪都觉得自由.[01:21:31]有的爱像阳光倾落.[01:24:28].[01:25:03]边拥有边失去着.[01:29:97].[01:41:85]如果说你是夏夜的萤火.[01:46:65]孩子们为你唱歌.[01:49:54].[01:50:42]那么我是想要画你的手.[01:54:04].[01:55:14]你看我多么渺小一个我.[02:00:11]因为你有梦可做.[02:02:93].[02:05:61]也许你不会为我停留.[02:08:04].[02:08:84]那就让我站在你的背后.[02:13:98].[02:14:69]我可以跟在你身后.[02:17:97]像影子追着光梦游.[02:21:24]我可以等在这路口.[02:24:66]不管你会不会经过.[02:27:96]每当我为你抬起头.[02:31:31]连眼泪都觉得自由.[02:34:81]有的爱像大雨滂沱.[02:37:84].[02:38:43]却依然相信彩虹.[02:43:23].[03:08:16]我可以跟在你身后.[03:11:43]像影子追着光梦游.[03:14:91]我可以等在这路口.[03:18:01]不管你会不会经过.[03:21:49]每当我为你抬起头.[03:24:66]连眼泪都觉得自由.[03:28:20]有的爱像大雨滂沱.[03:31:65]却依然相信彩虹";
    }
    ;
    if (s == "27") {
        ly = "[00:00:43]稳稳的幸福-陈奕迅.[00:03:26]有一天.[00:05:23]我发现自怜资格都已没有.[00:10:80]只剩下不知疲倦的肩膀.[00:14:62]担负着简单的满足.[00:18:99]有一天.[00:21:25]开始从平淡日子感受快乐.[00:26:60]看到了明明白白的远方.[00:30:64]我要的幸福.[00:34:35]我要稳稳的幸福.[00:38:17]能抵挡末日的残酷.[00:43:09]在不安的深夜.[00:46:15]能有个归宿.[00:50:40]我要稳稳的幸福.[00:54:34]能用双手去碰触.[00:58:81]每次伸手入怀中.[01:02:20]有你的温度.[01:38:88]有一天.[01:41:36]我发现自怜资格都已没有.[01:46:71]只剩下不知疲倦的肩膀.[01:50:76]担负着简单的满足.[01:55:01]有一天.[01:57:08]开始从平淡日子感受快乐.[02:02:76]看到了明明白白的远方.[02:06:92]我要的幸福.[02:10:51]我要稳稳的幸福.[02:14:23]能抵挡末日的残酷.[02:19:15]在不安的深夜.[02:22:21]能有个归宿.[02:26:46]我要稳稳的幸福.[02:30:51]能用双手去碰触.[02:34:98]每次伸手入怀中.[02:38:26]有你的温度.[02:42:40]我要稳稳的幸福.[02:46:22]能抵挡失落的痛楚.[02:51:25]一个人的路途.[02:54:20]也不会孤独.[02:58:45]我要稳稳的幸福.[03:02:50]能用生命做长度.[03:06:98]无论我身在何处.[03:10:14]都不会迷途.[03:14:40]我要稳稳的幸福.[03:23:09]这是我想要的幸福";
    }

    ;
    if (s == "28") {
        ly = ".[00:02:39]倾城(Live)-陈奕迅.[00:32:74]热情就算熄灭了.[00:36:68]分手这一晚也重要.[00:41:17]甜言蜜语谎话嬉笑.[00:45:12]多给我一点 切勿缺少.[00:49:26]话题尽了也不重要.[00:53:25]吻我至凄冷的深宵.[00:57:02]繁华闹市灯光普照.[01:01:11]然而共你已再没破晓.[01:05:09]红眼睛幽幽的看着这孤城.[01:08:67]如同苦笑挤出的高兴.[01:12:50]全城为我花光狠劲.[01:16:19]浮华盛世做分手布景.[01:20:42]传说中痴心的眼泪会倾城.[01:23:95]霓虹熄了世界渐冷清.[01:28:03]烟花会谢 笙歌会停.[01:31:77]显得这故事尾声更动听.[02:08:61]热情就算熄灭了.[02:12:19]分手这一晚也重要.[02:16:27]甜言蜜语谎话嬉笑.[02:19:65]多给我一点 切勿缺少.[02:23:48]话题尽了也不重要.[02:27:01]吻我至凄冷的深宵.[02:30:79]繁华闹市灯光普照.[02:34:58]然而共你已再没破晓.[02:38:56]红眼睛幽幽的看着这孤城.[02:42:04]如同苦笑挤出的高兴.[02:45:82]全城为我花光狠劲.[02:49:40]浮华盛世做分手布景.[02:53:39]传说中痴心的眼泪会倾城.[02:56:87]霓虹熄了世界渐冷清.[03:00:70]烟花会谢 笙歌会停.[03:04:63]显得这故事尾声更动听.[03:15:72]红眼睛幽幽的看着这孤城.[03:19:00]如同苦笑挤出的高兴.[03:22:74]琼楼玉宇倒了阵行.[03:26:51]来营造这绝世的风景.[03:30:50]传说中痴心的眼泪会倾城.[03:33:98]霓虹熄了世界渐冷清.[03:37:66]烟花会谢 笙歌会停.[03:41:59]显得这故事尾声更动听";
    }
    ;
    if (s == "29") {
        ly = ".[00:00]南山南-马頔.[00:00:52]你在南方的艳阳里.[00:04:06]大雪纷飞.[00:08:37]我在北方的寒夜里.[00:10:85]四季如春.[00:14:73]如果天黑之前来得及.[00:18:36]我要忘了你的眼睛.[00:22:14]穷极一生.[00:24:16]做不完一场梦.[00:30:01]他不再和谁谈论相逢的孤岛.[00:37:12]因为心里早已荒无人烟.[00:44:34]他的心里再装不下一个家.[00:51:64]做一个只对自己说谎的哑巴.[00:58:72]他说你任何为人称道的美丽.[01:02:67]不及他第一次遇见你.[01:07:34]时光苟延残喘.[01:09:74]无可奈何.[01:13:92]如果所有土地连在一起.[01:17:35]走上一生.[01:18:06]只为拥抱你.[01:21:01]喝醉了他的梦.[01:24:90]晚安.[02:13:49]他听见有人唱着古老的歌.[02:20:51]唱着今天还在远方.[02:23:59]发生的像在她眼睛里.[02:30:38]看到的孤岛.[02:35:14]没有悲伤.[02:36:83]但也没有花朵.[02:43:16]你在南方的艳阳里大雪纷飞.[02:50:77]我在北方的寒夜里四季如春.[02:57:61]如果天黑之前来得及.[03:00:82]我要忘了你的眼睛穷极一生.[03:06:46]做不完一场梦.[03:12:49]你在南方的艳阳里大雪纷飞.[03:20:32]我在北方的寒夜里四季如春.[03:26:83]如果天黑之前来得及.[03:30:28]我要忘了你的眼睛穷极一生.[03:36:10]做不完一场梦.[03:41:86]大梦初醒.[03:43:54]荒唐了一生.[03:49:63]南山南.[03:53:00]北秋悲.[03:56:80]南山有谷堆南风喃.[04:07:81]北海北北海有墓碑.[04:18:86]南山南.[04:22:52]北秋悲.[04:26:20]南山有谷堆南风喃.[04:37:35]北海北北海有墓碑.[04:48:52]北海有墓碑";
    }
    ;
    if (s == "30") {
        ly = ".[00:01:02]因为爱情-陈奕迅.[00:12:35]给你一张过去的CD.[00:16:52]听听那时我们的爱情.[00:21:91]有时会突然忘了 我还在爱着你.[00:33:85]再唱不出那样的歌曲 听到都会红着脸躲避.[00:43:73]虽然会经常忘了我依然爱着你.[00:54:08]因为爱情 不会轻易悲伤.[01:00:07]所以一切都是幸福的模样.[01:05:61]因为爱情 简单的生长.[01:11:16]依然随时可以为你疯狂.[01:15:82]因为爱情 怎么会有沧桑.[01:21:88]所以我们还是年轻的模样.[01:27:38]因为爱情 在那个地方.[01:33:01]依然还有人在那里游荡.[01:37:49]人来人往.[02:01:44]再唱不出那样的歌曲 听到都会红着脸躲避.[02:10:97]虽然会经常忘了.[02:14:32]我依然爱着你.[02:21:18]因为爱情 不会轻易悲伤.[02:27:23]所以一切都是幸福的模样.[02:32:81]因为爱情 简单的生长.[02:38:45]依然随时可以为你疯狂.[02:43:18]因为爱情 怎么会有沧桑.[02:49:00]所以我们还是年轻的模样.[02:54:67]因为爱情 在那个地方.[03:00:08]依然还有人在那里游荡.[03:04:85]人来人往.[03:12:24]给你一张过去的CD 听听那时我们的爱情.[03:21:99]有时会突然忘了.[03:25:17]我还在爱着你";
    }
    ;
    if (s == "31") {
        ly = ".[00:00:29]淘汰 - 陈奕迅.[00:02:13]我说了 所有的谎.[00:06:41]你全都相信.[00:09:46]简单的 我爱你.[00:13:18]你却老不信.[00:17:41]你书里的剧情.[00:21:35]我不想上演.[00:24:90]因为我喜欢 喜剧收尾.[00:34:20]我试过 完美放弃.[00:38:08]的确很踏实.[00:41:09]醒来了.[00:43:22]梦散了.[00:45:17]你我都走散了.[00:48:94]情歌歌词何必押韵.[00:52:65]就算我是K歌之王.[00:56:88]也不见得把 爱情唱得完美.[01:03:87]只能说我输了.[01:07:64]也许是你怕了.[01:11:65]我们的回忆 没有皱褶.[01:16:47]你却用离开烫下句点.[01:19:81]只能说我认了.[01:23:64]你的不安赢得你信任.[01:28:92]我却得到你 安慰的淘汰.[01:50:27]我试过完美放弃.[01:54:70]的确很踏实.[01:57:13]醒来了.[01:59:14]梦散了.[02:01:09]你我都走散了.[02:04:67]情歌歌词何必押韵.[02:08:66]就算我是K歌之王.[02:12:58]也不见得把 爱情唱得完美.[02:19:64]只能说我输了.[02:23:67]也许是你怕了.[02:27:64]我们的回忆 没有皱褶.[02:32:18]你却用离开烫下句点.[02:35:70]只能说我认了.[02:39:65]你的不安赢得你信任.[02:44:88]我却得到你 安慰的淘汰.[03:07:87]只能说我输了.[03:11:94]也许是你怕了.[03:15:82]我们的回忆 没有皱褶.[03:20:43]你却用离开烫下句点.[03:23:72]只能说我认了.[03:27:65]你的不安赢得你信任.[03:32:91]我却得到你 安慰的淘汰.[03:49:46]安慰的淘汰";
    }
    ;
    if (s == "32") {
        ly = ".[00:00]预感-陈奕迅.[00:25:74]WU～.[00:31:77]爱你变习惯不再稀罕.[00:36:47]我们该冷静谈一谈.[00:40:98]你说你喜欢一点点浪漫.[00:45:81]却把跟随我的脚步放慢.[00:52:57]没有你分享分担.[00:54:94]我的快乐悲伤.[00:56:95]心情天天天天纷乱.[01:01:70]我一再试探.[01:04:10]你一再隐瞒.[01:06:72]是谁改变爱情原来的模样.[01:14:66]有一种预感爱就要离岸.[01:19:01]所有回忆却慢慢碎成片段.[01:23:95]不能尽欢爱总是苦短.[01:28:48]我只想要你最后的答案.[01:32:98]有一种预感想挽回太难.[01:37:60]对你还有无可救药的期盼.[01:42:26]我坐立难安望眼欲穿.[01:46:96]我会永远守在灯火阑珊的地方.[02:31:66]没有你分享分担.[02:34:16]我的快乐悲伤.[02:36:19]心情天天天天纷乱.[02:40:81]我一再试探.[02:43:41]你一再隐瞒.[02:45:89]是谁改变爱情原来的模样.[02:53:95]有一种预感爱就要离岸.[02:58:33]所有回忆却慢慢碎成片段.[03:03:11]不能尽欢爱总是苦短.[03:07:73]我只想要你最后的答案.[03:12:21]有一种预感想挽回太难.[03:16:94]对你还有无可救药的期盼.[03:21:48]我坐立难安望眼欲穿.[03:26:29]我会永远守在灯火阑珊的地方.[03:38:38]OH～WU～YEAH～.[03:44:81]有一种预感爱就要离岸.[03:49:09]所有回忆却慢慢碎成片段.[03:53:86]不能尽欢爱总是苦短.[03:58:78]我只想要你最后的答案.[04:02:90]有一种预感想挽回太难.[04:07:71]对你还有无可救药的期盼.[04:12:23]我坐立难安望眼欲穿.[04:17:16]我会永远守在灯火阑珊的地方.[04:26:37]我坐立难安望眼欲穿.[04:31:03]我会永远守在灯火阑珊.[04:38:40]的地方";
    }
    ;
    if (s == "33") {
        ly = "本音乐暂无歌词";
    }
    ;
    if (s == "34") {
        ly = ".[00:00:53]最初的梦想 - 范玮琪.[00:03:17]词：姚若龙.[00:04:06]曲：中岛美雪.[00:07:64]如果骄傲没被.[00:09:24]现实大海冷冷拍下.[00:13:39]又怎会懂得要多努力.[00:16:63]才走得到远方.[00:19:31]如果梦想.[00:20:43]不曾坠落悬崖千钧一发.[00:25:22]又怎会晓得执着的人.[00:28:45]拥有隐形翅膀.[00:31:32]把眼泪装在心上.[00:34:09]会开出勇敢的花.[00:37:12]可以在疲惫的时光.[00:39:81]闭上眼睛闻到一种芬芳.[00:43:11]就像好好睡了一夜.[00:46:05]直到天亮.[00:48:55]又能边走着边哼着歌.[00:51:71]用轻快的步伐.[00:54:39]沮丧时总会明显.[00:57:03]感到孤独的重量.[01:00:23]多渴望懂得的人.[01:03:24]给些温暖借个肩膀.[01:06:45]很高兴一路上.[01:08:48]我们的默契那么长.[01:11:92]穿过风 又绕个弯.[01:14:82]心还连着 像往常一样.[01:18:30]最初的梦想 紧握在手上.[01:23:89]最想要去的地方.[01:26:83]怎么能在半路就返航.[01:30:04]最初的梦想 绝对会到达.[01:35:58]实现了真的渴望.[01:38:51]才能够算到过了天堂.[01:48:62]如果骄傲没被.[01:50:33]现实大海冷冷拍下.[01:54:16]又怎会懂得要多努力.[01:57:39]才走得到远方.[02:00:06]如果梦想.[02:01:15]不曾坠落悬崖千钧一发.[02:05:87]又怎会晓得执着的人.[02:09:03]拥有隐形翅膀.[02:12:32]把眼泪装在心上.[02:15:00]会开出勇敢的花.[02:17:86]可以在疲惫的时光.[02:20:57]闭上眼睛闻到一种芬芳.[02:23:85]就像好好睡了一夜.[02:26:80]直到天亮.[02:29:30]又能边走着边哼着歌.[02:32:49]用轻快的步伐.[02:35:17]沮丧时总会明显.[02:37:77]感到孤独的重量.[02:41:00]多渴望懂得的人.[02:44:07]给些温暖借个肩膀.[02:47:07]很高兴一路上.[02:49:23]我们的默契那么长.[02:52:68]穿过风 又绕个弯.[02:55:62]心还连着 像往常一样.[02:59:04]最初的梦想 紧握在手上.[03:04:72]最想要去的地方.[03:07:54]怎么能在半路就返航.[03:10:80]最初的梦想 绝对会到达.[03:16:42]实现了真的渴望.[03:19:31]才能够算到过了天堂";
    }
    ;
    if (s == "35") {
        ly = ".[00:00:36]远走高飞 - 金志文.[00:01:68]词：王耀光.[00:02:51]曲：金志文.[00:18:38]我一路看过千山和万水.[00:22:30]我的脚踏遍天南和地北.[00:27:25]日晒或是风吹 我都无所谓.[00:31:79]路边那朵蔷薇 鲜红的纯粹.[00:35:83]关掉了手机管他谁是谁.[00:40:30]不要去理会是是与非非.[00:44:73]天亮走到天黑 从不觉疲惫.[00:49:78]黄昏中的堡垒 多颓废.[00:53:22]如果迎着风就飞.[00:57:40]俯瞰这世界有多美.[01:01:89]让烦恼都灰飞.[01:04:76]别去理会自我藉慰.[01:11:01]如果还有梦就追.[01:15:42]至少不会遗憾后悔.[01:20:02]迎着光勇敢追.[01:22:73]远走高飞 说走就走一回.[01:52:64]翻过了山坡又踏过了水.[01:56:60]跟心走别管东南和西北.[02:01:24]前行或是后退 靠直觉发挥.[02:06:02]日落下的余晖 有一点凄美.[02:10:42]拥挤的城市布满了虚伪.[02:15:30]何必去辩解谁错或是对.[02:19:36]就让一切回归 童真的滋味.[02:24:07]那自由的感觉 不会累.[02:27:82]如果迎着风就飞.[02:31:79]俯瞰这世界有多美.[02:36:24]让烦恼都灰飞.[02:38:95]别去理会自我藉慰.[02:45:46]如果还有梦就追.[02:49:81]至少不会遗憾后悔.[02:54:90]迎着光勇敢追.[02:56:88]远走高飞 说走就走一回.[03:16:86]如果迎着风就飞.[03:21:30]俯瞰这世界有多美.[03:25:82]让烦恼都灰飞.[03:28:40]别去理会自我藉慰.[03:34:85]如果还有梦就追.[03:39:29]至少不会遗憾后悔.[03:44:17]迎着光勇敢追.[03:46:52]远走高飞 说走就走一回";
    }
    ;
    if (s == "36") {
        ly = ".[00:01:49]巴黎假期 .[00:03:16]电影《巴黎假期》推广曲.[00:04:62].[00:05:98]作词：路金波  作曲：金志文.[00:08:68]演唱：金志文,谭维维,陈楚生,吉克隽逸.[00:10:39].[00:21:95]吉克隽逸：十七岁.[00:27:33]梦想能去巴黎.[00:32:64]那时晴天下雨.[00:39:00]每天都好天气.[00:43:78].[00:44:29]陈楚生：梦中恍惚地.[00:50:33]看见长高的自己.[00:55:87]白天小心翼翼.[01:01:79]活出很多秘密.[01:06:76].[01:07:33]楚生:吉克：哦 我亲爱的你 .[01:09:69]来自哪一片风里.[01:12:61]好奇你的名字 .[01:15:41]为何要这么起.[01:18:79]你为何去旅行 .[01:21:24]却没有行李 OHH.[01:25:34]你为什么来到巴黎.[01:30:64].[01:31:71]谭维维：OHH.[01:51:56]          三十岁.[01:54:70]纯真岁月远离.[01:59:01]春天和秋天.[02:03:41]都走的那么急.[02:07:80].[02:08:12]金志文：年少的心事 .[02:12:43]现在全已忘记.[02:16:85]悄然又无息.[02:21:35]我却来到巴黎.[02:27:08].[02:28:23]志文:维维：哦 我亲爱的你 .[02:31:21]后来和你的相遇.[02:34:04]与我都是奇迹.[02:37:38]你出现那天起.[02:40:16]每一天的甜蜜.[02:42:93]是最美的假期 OHH.[02:47:63]继续在美好故事里.[02:52:28].[02:52:60]合：啦啦啦…….[03:04:61]每一天的甜蜜 .[03:06:81]是最美的假期 OHH.[03:11:77]继续在美好故事里.[03:16:79].[03:17:92]谭维维：继续在美好故事里.[03:26:99]";
    }
    ;
    if (s == "37") {
        ly = ".[00:01:00]特别的人.[00:01:84].[00:02:84]作词：方大同.[00:03:79]作曲：方大同.[00:05:18]演唱：方大同.[00:13:98].[00:15:27]爱一个人或许要慷慨.[00:19:84]若只想要被爱.[00:22:27]最后没有了对白.[00:26:60]必须有你我的情真.[00:30:63]不求计分的平等.[00:33:94]总有幸福有心疼.[00:37:49]生命的起伏要认可.[00:42:42]懂一个人也许要忍耐.[00:47:04]要经过了意外.[00:49:68]才了解所谓的爱.[00:54:21]今后的岁月.[00:56:58]让我们一起了解.[01:00:19]多少天长地久.[01:02:95]有几回细水长流.[01:06:48].[01:07:55]我们是对方 特别的人.[01:14:15]奋不顾身 难舍难分.[01:18:61]不是一般人的认真.[01:21:93]若只有一天 爱一个人.[01:28:29]让那时间每一刻在倒退.[01:32:93]生命中有万事的可能.[01:37:85]你就是我要遇见的 特别的人.[01:44:03].[01:47:39]懂一个人也许要忍耐.[01:52:25]要经过了意外.[01:54:82]才了解所谓的爱.[01:58:68]今后的岁月.[02:01:66]让我们一起了解.[02:05:45]多少天长地久.[02:08:07]有几回细水长流.[02:11:71].[02:13:18]我们是对方 特别的人.[02:19:29]奋不顾身 难舍难分.[02:23:67]不是一般人的认真.[02:27:21]若只有一天 爱一个人.[02:32:90]让那时间每一刻在倒退.[02:38:02]生命中有万事的可能.[02:42:90]你就是我要遇见的 特别的人.[02:49:38].[02:50:42]有时候我们都会寂寞.[02:54:55]有时也会失败 怕被淘汰.[02:58:64]想去找一个明白.[03:02:00]而我曾经多次的等待未来.[03:08:49]你何时会来.[03:10:73]人山人海 总有你的存在.[03:15:51]有你我的爱.[03:18:26]我们是对方 特别的人.[03:24:94]奋不顾身 难舍难分.[03:28:81]不是一般人的认真.[03:32:24]若只有一天 爱一个人.[03:38:46]让那时间每一刻在倒退.[03:43:18]生命中有万事的可能.[03:48:07]你就是我要遇见的 特别的人.[03:54:84]";
    }
    ;
    if (s == "38") {
        ly = ".[00:00:38]春风十里不如你-(电视剧《春风十里不如你》同名主题曲) - 李健.[00:04:83]词：左右.[00:05:49]曲：李健.[00:06:12]编曲：赵兆.[00:07:02]录音师：李卓.[00:07:95]后期缩混：李军.[00:16:71]终于没守住寂寞.[00:20:89]让心悄悄开了锁.[00:25:14]心潮渐渐涌上来.[00:29:16]就像解冻的冰河.[00:33:52]梨花开 雁归来.[00:41:82]可是你 却不在.[00:50:30]不知如何找寻你.[00:54:36]芬芳还在我怀里.[00:58:32]紧抱双臂像守护一个秘.[01:06:84]不知如何形容你.[01:11:06]温暖留在我心里.[01:15:08]紧闭双眼不放走一丝甜蜜.[01:56:89]还是没守住寂寞.[02:00:99]让心悄悄开了锁.[02:05:15]心潮已奔涌而去.[02:09:31]像留不住的江河.[02:13:66]江河流 流向海.[02:22:01]心飞去 去哪里.[02:30:39]不知如何找寻你.[02:34:56]芬芳还在我怀里.[02:38:55]紧抱双臂像守护一个秘密.[02:47:18]不知如何形容你.[02:51:24]温暖留在我心里.[02:55:34]紧闭双眼不放走一丝甜蜜.[03:03:82]不知如何形容我.[03:07:98]只有你让我欢喜.[03:11:93]即使在冰天雪地眼含春意.[03:20:56]不知如何找寻你.[03:28:74]春天已经在这里.[03:37:22]不知如何形容你.[03:45:36]春风十里不如你.[03:53:83]春风十里不如你";
    }
    ;
    if (s == "39") {
        ly = ".[00:00:60]当我遇见你-(电影《北京遇上西雅图之不二情书》主题曲)-李健 .[00:06:34]作词：李健.[00:07:42]作曲：李健.[00:12:03]深夜里.[00:14:31]闪烁心跳一样绚烂的霓虹.[00:20:68]有人说 那是都市的欲望涌动.[00:29:77]可是我.[00:32:47]就是离不开传说中的梦幻.[00:38:68]因为我 还未习惯一天天平凡.[01:01:32]灯光亮起的窗口.[01:06:97]偶尔让我幻想有一个温柔.[01:13:23]呼啸而过的警车.[01:19:23]是夜晚最寻常的一幕.[01:23:64]就在不远处.[01:26:90]是我最初来到的地方.[01:44:90]在哪里.[01:47:27]我才能够遇见生命中的你.[01:53:94]我知道 在人群里你也在寻找.[02:16:46]每天经过的路口.[02:22:29]不知道你是否经过了没有.[02:28:36]幻想相遇的时候.[02:34:27]感慨我们等待了很久.[02:38:97]你为我停.[02:41:80]人来人往时间在奔流.[02:47:92]其实我们差不多.[02:53:64]不算好也不算坏的生活.[02:58:46]从那天以后.[03:01:14]有些路再不怕一人走.[03:10:19]有人说.[03:12:91]爱是疲惫生活的英雄梦想";
    }
    ;
    if (s == "40") {
        ly = ".[00:00:75]如果可以 - 李健.[00:02:82]词曲 李健.[00:06:36]如果可以 我想对你说声抱歉.[00:16:94]我忽略你眼里的忧郁.[00:25:85]如果可以 我想给你我的 青春.[00:36:31]只为陪伴你受伤的灵魂.[00:46:57]你曾像繁星闪烁.[00:50:62]当你从浩瀚星空坠落.[00:55:04]如同从未发生过.[00:58:76]这世界不会在意你的微弱.[01:09:20]可我知道从此后.[01:13:26]这世界少了一份光亮.[01:17:67]多了些许的失落.[01:21:44]消逝的星辰那是夜空的过错.[01:34:06]如果可以 我愿付出我的所有.[01:44:35]只为换取你失去的自由.[02:23:82]你曾像繁星闪烁.[02:27:86]当你从我的身边坠落.[02:32:36]如同从未发生过.[02:35:99]这世界不会在意你的脆弱.[02:46:45]如此浩瀚的星空.[02:50:52]容不下一颗小小星辰.[02:55:01]熄灭真实的光亮.[02:58:71]我知道你的脆弱是你的坚强.[03:14:50]如果不能 让这一切触及心灵.[03:25:08]别问这丧钟为谁 而鸣";
    }
    ;
    if (s == "41") {
        ly = ".[00:00:00]老街.[00:16:90]一张褪色的照片.[00:19:90]好像带给我一点点怀念.[00:23:84]巷尾老爷爷买的热汤面.[00:26:83]味道弥漫过旧旧的后园.[00:31:86]流浪猫睡熟在摇晃秋千.[00:35:77]夕阳照了一遍他眯着眼.[00:40:39]那张同桌寄的明信片.[00:42:80]安静的躺在课桌的里面.[00:48:86]快要过完的春天.[00:51:86]还有雕刻着图案的门帘.[00:55:61]窄窄的长长的过道两边.[00:59:86]老房子依然升起了炊烟.[01:02:81]刚刚下完了小雨的季节.[01:07:78]爸妈又一起走过的老街.[01:12:22]记不得哪年的哪一天.[01:15:90]很漫长又很短暂的岁月.[01:19:33]现在已经回不去.[01:22:51]早已流逝的光阴.[01:26:55]手里的那一张渐渐模糊不清的车票.[01:32:89]成了回忆的信号.[01:35:08]忘不掉的是什么我也不知道.[01:42:19]想不起当年模样.[01:46:23]看也看不到去也去不了的地方.[01:51:05]也许那老街的腔调是属于我的忧伤.[02:02:42]嘴角那点微笑越来越勉强.[02:09:99]忘不掉的是什么我也不知道.[02:13:91]放不下熟悉片段.[02:16:75]回头望一眼已经很多年的时间.[02:22:88]透过手指间看着天.[02:30:32]我又回到那老街.[02:34:69]靠在你们身边渐行渐远.[03:10:78]快要过完的春天.[03:14:28]还有雕刻着图案的门帘.[03:18:00]窄窄的长长的过道两边.[03:21:94]老房子依然升起了炊烟.[03:24:67]刚刚下完小雨的季节.[03:29:92]爸妈又一起走过的老街.[03:34:30]记不得哪年的哪一天.[03:37:80]很漫长又很短暂的岁月.[03:42:28]现在已经回不去.[03:46:11]早已流逝的光阴.[03:50:05]手里的那一张渐渐模糊不清的车票.[03:55:30]成了回忆的信号.[03:59:67]忘不掉的是什么我也不知道.[04:04:49]想不起当年模样.[04:08:22]看也看不到去也不去了的地方.[04:16:05]也许那老街的腔调是属于我的忧伤.[04:24:31]嘴角那点微笑越来越勉强.[04:31:99]忘不掉的是什么我也不知道.[04:36:45]放不下熟悉片段.[04:40:17]回头望一眼已经很多年的时间.[04:47:94]透过手指间看着天.[04:52:42]我又回到那老街.[04:56:25]靠在你们身边渐行渐远";
    }
    ;
    if (s == "42") {
        ly = ".[00:00:58]你不知道的事 - 范玮琪&鲍丹.[00:11:98]蝴蝶眨几次眼睛.[00:17:32]才学会飞行.[00:22:77]夜空洒满了星星.[00:27:81]但几颗会落地.[00:33:05]我飞行.[00:34:77]当你坠落之际.[00:38:10]很靠近.[00:39:96]还听见呼吸.[00:44:05]对不起.[00:45:96]我却没捉紧你.[00:52:78]你不知道我为什么离开你.[00:58:02]我坚持不能说放任你哭泣.[01:03:46]你的泪滴像倾盆大雨.[01:07:74]碎落满地.[01:10:37]在心里清晰.[01:14:20]你不知道我为什么狠下心.[01:19:60]盘旋在你看不见的高空里.[01:26:61]多的是你不知道的事.[01:38:26]蝴蝶眨几次眼睛.[01:43:55]才学会飞行.[01:49:06]夜空洒满了星星.[01:53:95]但几颗会落地.[01:59:24]我飞行.[02:00:96]当你坠落之际.[02:04:54]很靠近还听见呼吸.[02:10:34]对不起我却没抓紧你.[02:19:16]你不知道我为什么离开你.[02:24:36]我坚持不能说放任你哭泣.[02:29:70]你的泪滴像倾盆大雨.[02:34:09]碎落满地.[02:36:76]在心里清晰.[02:40:49]你不知道我.[02:42:15]为什么狠下心.[02:45:79]盘旋在你看不见的高空里.[02:53:20]多得是 你不知道的事";
    }
    ;
    if (s == "43") {
        ly = ".[00:00:80]记事本 - 范玮琪&曾静玟.[00:06:51]翻开随身携带的记事本.[00:10:24]写着许多事都是关于你.[00:14:78]你讨厌被冷落 习惯被守侯.[00:20:14]寂寞才找我.[00:26:85]我看见自己写下的心情.[00:30:58]把自己放在卑微的后头.[00:35:43]等你等太久想你泪会流.[00:40:31]而幸福快乐是什么.[00:45:71]爱的痛了 痛的哭了.[00:50:71]哭的累了.[00:52:02]日记本里页页执着.[00:55:60]记载着你的好.[00:58:07]象上隐的毒药.[01:00:64]它仿佛骗着我.[01:06:19]爱的痛了 痛的哭了.[01:11:14]哭的累了矛盾心里总是强求.[01:16:03]劝自己要放手.[01:18:45]闭上眼让你走.[01:21:02]烧掉日记重新来过.[01:38:42]我看见自己写下的心情.[01:42:06]把自己放在卑微的后头.[01:47:05]等你等太久想你泪会流.[01:51:73]而幸福快乐是什么.[01:57:22]爱的痛了 痛的哭了.[02:02:17]哭的累了日记本里页页执着.[02:07:01]记载着你的好.[02:09:49]象上隐的毒药.[02:12:11]它仿佛骗着我.[02:17:68]爱的痛了 痛的哭了.[02:22:62]哭的累了矛盾心里总是强求.[02:27:41]劝自己要放手.[02:29:99]闭上眼让你走烧掉日记重新来过.[02:37:94]爱的痛了 痛的哭了.[02:43:15]哭的累了矛盾心里总是强求.[02:47:84]劝自己要放手.[02:50:36]闭上眼让你走.[02:52:97]烧掉日记重新来过";
    }
    ;
    if (s == "44") {
        ly = ".[00:00:58]原来的我 - 曾静玟&范玮琪.[00:11:35]既然说过深深爱我.[00:13:42]为何又要离我远走.[00:15:39]海誓山盟抛在脑后.[00:19:22]早知如此.[00:21:18]何必开始.[00:23:35]我还是原来的我.[00:30:66]给我一个空间.[00:34:14]没有人走过.[00:37:11]感觉到自己被冷落.[00:45:68]给我一段时间.[00:49:26]没有人曾经爱过.[00:52:44]再一次体会寂寞.[00:59:96]曾经爱过却要分手.[01:01:92]为何相爱不能相守.[01:03:83]到底为什么.[01:07:47]早知如此.[01:09:23]何必开始.[01:11:40]欢笑以后代价就是冷漠.[01:15:23]既然说过深深爱我.[01:17:16]为何又要离我远走.[01:18:98]海誓山盟抛在脑后.[01:22:71]早知如此.[01:24:62]何必开始.[01:26:54]我还是原来的我.[01:33:19]给我一个空间.[01:36:88]没有人走过.[01:40:10]感觉到自己的伤口.[01:48:69]给我一段时间.[01:52:18]勇敢的面对寂寞.[01:55:20]再一次开始生活.[02:02:91]曾经爱过却要分手.[02:04:63]为何相爱不能相守.[02:06:59]到底为什么.[02:10:22]早知如此.[02:12:09]何必开始.[02:14:31]欢笑以后代价就是冷漠.[02:18:04]既然说过深深爱我.[02:19:90]为何又要离我远走.[02:21:87]海誓山盟抛在脑后.[02:25:45]早知如此.[02:27:27]何必开始.[02:29:38]我还是原来的我.[02:50:46]曾经爱过却要分手.[02:52:38]为何相爱不能相守.[02:54:25]到底为什么.[02:57:87]早知如此.[02:59:74]何必开始.[03:01:81]欢笑以后代价就是冷漠.[03:05:59]既然说过深深爱我.[03:07:56]为何又要离我远走.[03:09:48]海誓山盟抛在脑后.[03:13:11]早知道.[03:14:82]何必开始.[03:16:99]我还是原来的我.[03:23:86]给我一个空间.[03:27:48]没有人走过.[03:30:56]感觉到自己被冷落.[03:39:33]给我一段时间.[03:42:86]没有人曾经爱过.[03:47:50]再一次体会寂寞";
    }
    ;
    if (s == "45") {
        ly = ".[00:00]预言.[00:20:31]将沧海都烧成了桑田.[00:27:12]把红颜看成白眼.[00:30:62]也难以把思念变成流言.[00:35:81]将泪水都凝结到冰点.[00:42:56]也开出一朵水仙.[00:46:00]看得见在我们心里蔓延.[00:50:56]不管天与地的曲线.[00:56:68]没有翅膀我都会飞到你的身边.[01:05:12]我相信把你的名字.[01:08:93]念上一千遍就会念成.[01:12:87]轮回一千遍的诺言.[01:16:62]渡过雨打风吹的考验.[01:20:37]我相信把你的容颜.[01:24:37]看上一千遍就会看成.[01:28:24]最永恒的预言.[01:32:49]有一天我们终将改变.[01:35:87]变成了唯一的传说.[01:49:56]将沧海都烧成了桑田.[01:55:80]把红颜看成白眼.[01:59:74]也难以把思念变成流言.[02:04:99]将泪水都凝结到冰点.[02:10:56]也开出一朵水仙.[02:15:37]看得见在我们心里蔓延.[02:19:74]不管天与地的曲线.[02:25:50]没有翅膀我都会飞到你的身边.[02:34:31]我相信把你的名字.[02:37:62]念上一千遍就会念成.[02:42:00]轮回一千遍的诺言.[02:45:81]渡过雨打风吹的考验.[02:49:18]我相信把你的容颜.[02:53:37]看上一千遍就会看成.[02:57:43]最永恒的预言.[03:01:43]有一天我们终将改变.[03:04:81]变成了唯一的传说.[03:13:05]我相信把你的名字.[03:16:81]念上一千遍就会念成.[03:20:62]轮回一千遍的诺言.[03:24:30]渡过雨打风吹的考验.[03:28:37]我相信把你的容颜.[03:32:12]看上一千遍就会看成.[03:35:99]最永恒的预言.[03:39:80]有一天我们终将改变.[03:43:68]变成了唯一的传说";
    }
    ;
    if (s == "46") {
        ly = ".[00:00]歌词千寻 www.lrcgc.com.[00:01]房间..[00:04]作词：刘瑞琦..[00:05]作曲：刘瑞琦..[00:07]演唱：刘瑞琦..[00:09]歌词编辑：◎靖☆康◎..[00:12]QQ:228846602..[00:16]..[00:17]要用多少个晴天 交换多少张相片..[00:25]还记得锁在抽屉里面的 滴滴点点..[00:32]小而温馨的空间 因为有你在身边.[00:40]就不会感觉到害怕 大步走向前.[00:46]一天一月一起一年 像不像永远.[00:53]我们在 同一个 屋檐下.[00:56]写着属于我们 未来的诗篇.[01:03]在这温暖的房间.[01:08]我于是慢慢发现.[01:12]相聚其实就是一种缘.[01:16]多值得纪念.[01:19]在这温暖的房间.[01:23]我们都笑得很甜.[01:27]一切 停格在一瞬间.[01:33].[02:04]要用多少个晴天 交换多少张相片.[02:12]还记得锁在抽屉里面的 滴滴点点.[02:19]小而温馨的空间 因为有你在身边.[02:27]就不会感觉到害怕 大步走向前.[02:33]一天一月一起一年 像不像永远.[02:40]我们在 同一个 屋檐下.[02:43]写着属于我们 未来的诗篇.[02:50]在这温暖的房间.[02:55]我于是慢慢发现.[02:59]相聚其实就是一种缘.[03:03]多值得纪念.[03:06]在这温暖的房间.[03:09]我们都笑得很甜.[03:13]一切 停格在一瞬间.[03:20].[03:22]停在记忆里边最美的画面.[03:29]因为有你在的每天.[03:37].[03:38]在这温暖的房间.[03:41]我于是慢慢发现.[03:45]相聚其实就是一种缘.[03:49]多值得纪念.[03:52]在这温暖的房间.[03:56]我们都笑得很甜.[04:00]一切 停格在一瞬间.[04:06]";
    }
    ;
    if (s == "47") {
        ly = ".[00:00:74]我们的明天(Single Version 电影《重返20岁》主题曲) - 鹿晗.[00:09:09]作词：于京乐团 作曲：于京乐团.[00:13:56]一个人走到终点.[00:20:22]不小心回到起点.[00:26:37]一个新的世界.[00:29:55]此刻我才发现.[00:33:26]时间没有绝对.[00:39:93]直到有另一个人.[00:46:41]能体会我的感觉.[00:52:62]不用说不用问.[00:55:92]就明白就了解.[00:59:58]每一刻都像永远.[01:06:12]我看着 没剩多少时间.[01:10:88]能许愿 好想多一天.[01:16:23]我们的明天.[01:19:01]我问着 还有多少时间.[01:23:98]在眼前 以为多一天.[01:29:45]能实现我们的预言.[01:45:73]直到有另一个人.[01:52:19]能体会我的感觉.[01:58:33]不用说不用问.[02:01:71]就明白就了解.[02:05:40]每一刻都像永远.[02:11:95]我看着 没剩多少时间.[02:16:59]能许愿 好想多一天.[02:21:94]我们的明天.[02:24:85]我问着 还有多少时间.[02:29:92]在眼前 以为多一天.[02:35:08]能实现我们的预言.[02:39:90]其实有个传说.[02:43:21]能将时空倒流.[02:46:41]因为有一个梦告诉我.[02:51:40]爱从不曾保留.[02:53:47]才勇敢了我.[02:57:97]我看着 没剩多少时间.[03:02:78]能许愿 好想多一天.[03:08:20]我们的明天.[03:11:17]我问着 还有多少时间.[03:15:74]在眼前 以为多一天.[03:20:96]能实现我们的预言.[03:29:16]累积成永恒的纪念";
    }
    ;
    if (s == "48") {
        ly = ".[00:01:47]假行僧 - 张宇.[00:28:00]我要从南走到北.[00:31:37]我还要从白走到.[00:36:24]我要人们都看到我.[00:39:85]但不知道我是谁.[00:52:80]假如你看我有点累.[00:56:42]就请你给我倒碗水.[01:00:59]假如你已经爱上我.[01:04:68]就请你吻我嘴.[01:34:60]我有这双脚我有这双腿.[01:38:18]我有这千山和万水.[01:42:39]我要所有的所有.[01:46:43]但不要恨和悔.[01:51:59]要爱上我你就别怕后悔.[01:55:78]总有一天我要远走高飞.[01:59:71]我不想留在那一个地方.[02:03:70]也不愿有人跟随.[02:08:28]我不愿相信真的有魔鬼.[02:12:22]也不愿与任何人作对.[02:16:32]你别想知道我到底是谁.[02:20:26]也别想看到看到看到我的虚伪.[02:31:84]我的虚伪.[03:03:31]我有这双脚我有这双腿.[03:06:44]我有这千山和万水.[03:10:28]我要所有的所有.[03:13:51]但不要恨和悔.[03:17:85]我只想看到你长得美.[03:21:62]但不想知道你在受罪.[03:24:97]我想要得到天上的水.[03:28:41]但不是你的.[03:32:21]我不愿相信真的有魔鬼.[03:35:84]也不愿与任何人作对.[03:39:29]你别想知道我到底是谁.[03:42:88]也别想看到我虚伪.[03:46:65]我要从南走到北.[03:49:69]我还要从白走到黑.[03:53:44]我要人们都看到我.[03:56:88]但不知道我是谁.[04:15:54]我要从南走到北.[04:18:89]我还要从白走到黑.[04:22:32]我要人们都看到我.[04:25:89]但不知道我是谁.[04:29:47]我要从南走到北.[04:32:92]我还要从白走到黑.[04:36:69]我要人们都看到我.[04:40:43]但不知道我是谁";
    }
    ;
    if (s == "49") {
        ly = ".[00:01:61]浪人情歌 - 张宇.[00:04:79]词：伍佰.[00:06:36]曲：伍佰.[00:11:25]不要再想你 不要再爱你.[00:16:84]让时间悄悄的飞逝 抹去我俩的回忆.[00:23:57]对于你的名字 从今不会再提起.[00:30:16]不再让悲伤 将我心占据.[00:52:38]让他随风去 让他无痕迹.[00:57:83]所有快乐悲伤所有过去.[01:01:84]通通都抛去.[01:04:70]心中想的念的 盼的望的.[01:08:67]不会再是你.[01:11:28]不愿再承受 要把你忘记.[01:19:92]我会擦去 我不小心滴下的泪水.[01:26:68]还会装做 一切都无所谓.[01:32:04]将你和我的爱情 全部敲碎.[01:38:62]再将他通通赶出 我受伤的心扉.[01:47:23]让他随风去 让他无痕迹.[01:52:71]所有快乐悲伤所有过去.[01:56:62]通通都抛去.[01:59:43]心中想的念的 盼的望的.[02:03:36]不会再是你.[02:05:85]不愿再承受 我把你忘记.[02:45:35]我会擦去 我不小心滴下的泪水.[02:52:08]还会装做 一切都无所谓.[02:57:49]将你和我的爱情 全部敲碎.[03:04:06]再将它通通赶出 我受伤的心扉.[03:12:68]我会擦去 我会擦去.[03:17:89]我不小心滴下的泪水.[03:22:67]还会装做 一切都无所谓.[03:28:10]将你和我的爱情 全部敲碎.[03:34:58]再将它通通赶出 我受伤的心扉.[03:48:55]让他随风去 无痕迹通通都忘记";
    }
    ;
    if (s == "50") {
        ly = ".[00:00:01]离爱不远-张宇.[00:12:17]才离你不远 感觉如此遥远.[00:28:65]我不知道昨天的世界.[00:33:84]过了今夜 有多破碎.[00:45:49]我看不见心在另一条街.[01:01:15]你还在我身体里燃烧还不冷却你看不见.[01:18:90]拥挤的寂寞空洞的自由好吧都让我.[01:33:79]离爱不远我舔着我的伤悲.[01:42:86]没有泪想着你怎么会有泪.[01:50:04]离爱不远我再怎么飞.[01:59:05]都在你的旷野.[02:06:31]我不懂谎言我不管危险.[02:22:49]我还在你耳边说抱歉就算见面谁能改变.[02:40:43]拥挤的寂寞 空洞的自由.[02:48:55]好吧 都让我.[02:55:11]离爱不远 我舔着我的伤悲.[03:03:26]我没有泪 想着你怎么会有泪.[03:11:23]离爱不远 我再怎么飞.[03:20:42]都在你的旷野.[03:25:11]在你的旷野.[03:43:78]你的旷野.[03:55:86]想着你怎么会有泪.[03:59:99]离爱不远 我再怎么飞.[04:09:24]都在你的旷野.[04:13:86]在你的旷野.[04:28:01]想着你怎么会有泪.[04:32:71]离爱不远 我再怎么飞.[04:41:72]都在你的旷野.[04:46:47]在你的旷野.[04:53:11]离爱不远.[04:57:02]离爱不远.[04:59:32]";
    }
    ;
    if (s == "51") {
        ly = ".[00:00:37]迷迭香 - 张宇.[00:01:22]词：方文山.[00:01:98]曲：周杰伦.[00:02:72]编曲：梁翘柏.[00:37:33]你的嘴角 微微上翘.[00:45:20]性感得无可救药.[00:53:41]想象不到 如此心跳.[01:01:28]你的一切都想要.[01:10:70]软性的饮料 上升的气泡.[01:14:23]我将对你的喜好.[01:16:01]一瓶装 全喝掉.[01:19:12]这里最不缺就是热闹.[01:22:98]你煽情 给拥抱.[01:26:86]烛火在燃烧 有某种情调.[01:30:27]眼神失焦了几秒.[01:32:28]关于你的舞蹈.[01:35:36]你慵懒的扭动着腰 受不了.[01:41:99]你随风飘扬的笑.[01:45:78]有迷迭香的味道.[01:50:07]语带薄荷味的撒娇.[01:53:13]对我发出恋爱的讯号.[01:58:26]你优雅地像一只猫.[02:02:31]动作轻盈地围绕.[02:06:44]爱的甜味蔓延发酵.[02:09:47]暧昧来得刚刚好.[02:32:13]软性的饮料 上升的气泡.[02:35:36]我将对你的喜好.[02:37:29]一瓶装 全喝掉.[02:40:39]这里最不缺就是热闹.[02:44:30]你煽情 给拥抱.[02:48:04]烛火在燃烧 有某种情调.[02:51:62]眼神失焦了几秒.[02:53:63]关于你的舞蹈.[02:56:68]你慵懒的扭动着腰 受不了.[03:03:11]你随风飘扬的笑.[03:07:36]有迷迭香的味道.[03:11:44]语带薄荷味的撒娇.[03:14:52]对我发出恋爱的讯号.[03:19:37]你优雅地像一只猫.[03:23:28]动作轻盈地围绕.[03:27:48]爱的甜味蔓延发酵.[03:30:49]暧昧来得刚好.[03:37:33]你的嘴角 微微上翘.[03:40:93]性感的无可救药.[03:45:14]想象不到 如此心跳.[03:48:41]你的一切我都想要.[03:51:81]你的唇膏 鲜艳讨好.[03:54:94]一股自信的骄傲.[03:58:64]什么预兆 气氛微妙.[04:02:23]因为爱你我知道.[04:07:70]预兆 气氛微妙 因为爱你我知道";
    }
    ;
    if (s == "52") {
        ly = ".[00:00:21]趁早 - 张宇.[00:26:41]到后来才发现爱你是一种习惯.[00:34:71]我学会和你说一样的谎.[00:41:98]你总是要我在你身旁.[00:46:00]说幸福该是什么模样.[00:50:19]你给我的天堂 其实是一片荒凉.[00:59:47]要是我早可以和你一刀两断.[01:07:80]我们就不必在爱里勉强.[01:15:00]可是我真的不够勇敢.[01:19:04]总为你忐忑 为你心软.[01:23:20]毕竟相爱一场.[01:25:27]不要谁心里带着伤.[01:31:60]我可以永远笑着扮演你的配角.[01:35:70]在你的背后自己煎熬.[01:39:74]如果你不想要 想退出要趁早.[01:43:89]我没有非要一起到老.[01:48:04]我可以不问感觉继续为爱讨好.[01:52:07]冷眼的看着你的骄傲.[01:56:23]若有情太难了 想别恋要趁早.[02:00:59]就算迷恋你的拥抱.[02:03:88]忘了就好.[02:28:51]要是我早可以和你一刀两断.[02:36:60]我们就不必在爱里勉强.[02:43:91]可是我真的不够勇敢.[02:48:07]总为你忐忑 为你心软.[02:52:10]毕竟相爱一场.[02:54:19]不要谁心里带着伤.[03:00:40]我可以永远笑着扮演你的配角.[03:04:45]在你的背后自己煎熬.[03:08:70]如果你不想要 想退出要趁早.[03:12:75]我没有非要一起到老.[03:16:89]我可以不问感觉继续为爱讨好.[03:21:15]冷眼的看着你的骄傲.[03:25:19]若有情太难了 想别恋要趁早.[03:29:55]就算迷恋你的拥抱.[03:32:72]忘了就好.[03:38:25]爱已至此怎样的说法 都能成为理由.[03:46:64]我在这样的爱情里看见的是我们的软弱.[04:02:62]我可以永远笑着扮演你的配角.[04:06:46]在你的背后自己煎熬.[04:10:62]如果你不想要 想退出要趁早.[04:14:78]我没有非要一起到老.[04:18:92]我可以不问感觉继续为爱讨好.[04:23:19]冷眼的看着你的骄傲.[04:27:34]若有情太难了 想别恋要趁早.[04:31:77]就算迷恋你的拥抱.[04:37:78]忘了就好";
    }
    ;
    if (s == "53") {
        ly = ".[00:00:98]丑八怪 - 李克勤.[00:03:84]作词：甘世佳.[00:06:43]作曲：李荣浩.[00:09:17]编曲：Johnny Yim.[00:20:81]如果世界漆黑 其实我很美.[00:24:29]在爱情里面进退 最多被消费.[00:28:28]无关痛痒的是非 又怎么不对.[00:32:11]无所谓.[00:36:45]如果像你一样 总有人赞美.[00:40:26]围绕着我的卑微 也许能消退.[00:43:89]其实我并不在意 有很多机会.[00:47:17]像巨人一样的无畏.[00:50:10]放纵我 心里的鬼.[00:51:79]可是我不配.[00:57:72]丑八怪 能否别把灯打开.[01:05:20]我要的爱 出没在 漆黑一片的舞台.[01:12:76]丑八怪 在这暧昧的时代.[01:20:85]我的存在 像意外.[01:41:22]有人用一滴泪 会红颜祸水.[01:45:29]有人丢掉称谓 什么也不会.[01:48:84]只要你足够虚伪 就不怕魔鬼.[01:52:42]对不对.[01:57:02]如果剧本写好 谁比谁高贵.[02:00:89]我只能沉默以对 美丽本无罪.[02:04:59]当欲望开始贪杯 有更多机会.[02:08:17]像尘埃一样的无畏 化成灰.[02:11:52]谁认得谁.[02:12:76]管他配不配.[02:24:59]别把灯打开.[02:27:75]我要的爱 出没在 漆黑一片的舞台.[02:35:38]丑八怪 在这暧昧的时代.[02:43:53]我的存在 不意外.[03:17:79]我很丑 可是我很温柔.[03:29:70]外表冷漠 内心狂热 那就是我.[03:41:60]丑八怪.[03:46:00]其实见多就不怪.[03:49:63]放肆去High.[03:52:72]用力踩 那不堪一击的洁白.[03:56:92]丑八怪.[04:01:23]这是我们的时代.[04:04:76]我不存在 才意外";
    }
    ;
    if (s == "54") {
        ly = ".[00:00:52]天梯 - 李克勤.[00:02:22]作词：钟晴.[00:03:81]作曲：赖映彤&GROOVISION.[00:06:21]编曲：Johnny Yim.[00:44:49]如可 找个荒岛.[00:47:87]向未来避开生活中那些苦恼.[00:52:37]如冬天欠电炉 双手拥抱.[00:56:36]可跟天对赌.[00:59:45]无论有几高 就如绝路.[01:03:75]隔绝尘俗只想要跟你可终老.[01:08:18]来跨出那地图 不需好报.[01:12:38]都只想你好.[01:15:75]能共你 沿途来爬天梯 不用忌讳.[01:20:15]中伤流言全悍卫.[01:23:84]留住你 旁人如何 话过不可一世.[01:28:24]问我亦无愧.[01:31:36]有你可 失去我一切.[01:40:40]几多对 持续爱到几多岁.[01:44:10]当生命 仍能为你豁出去.[01:47:83]千夫所指里 谁理登不登对.[01:51:64]仍挽手历尽在世间兴衰.[01:56:24]几多对 能悟到几多精髓.[02:00:35]能撑 下去.[02:03:40]竭力也要为爱尽瘁.[02:08:09]抱紧一生未觉累.[02:16:24]前方 仍然大雾.[02:19:67]到悬崖或海边也许永不知道.[02:24:27]能相拥到白头 一起偕老.[02:28:40]不跟天斗高.[02:31:60]前面有几高 一片荒土.[02:35:82]每步随着攀登叫双手都粗糙.[02:40:33]从崎岖这路途 开垦给你.[02:44:38]可走得更好.[02:47:73]能共你 沿途来爬天梯 黑夜亦亮丽.[02:52:15]于山头同盟洪海中发誓.[02:55:63]留住你 旁人如何 话过不可一世.[03:00:16]问我亦无愧.[03:03:42]有你可以 拆破这天际.[03:12:44]几多对 持续爱到几多岁.[03:16:21]当生命 仍能为你豁出去.[03:19:90]千夫所指里 谁理登不登对.[03:23:76]仍挽手历尽在世间兴衰.[03:27:70]（几多对 能悟到几多精髓）.[03:32:43]能撑 下去.[03:35:50]竭力也要为爱尽瘁.[03:39:94]抱紧一生未觉累.[03:44:79]握着手.[03:47:80]而幸福包围泥墙简陋.[03:52:61]牵着走.[03:55:67]怀着勇气怀着勇气.[03:57:51]至爱得永久.[04:05:64]爱得永久.[04:29:30]几多对 持续爱到几多岁.[04:36:58]不轰烈 如何做世界之最.[04:43:15]千夫所指里 谁理登不登对.[04:48:91]仍挽手历尽在世间兴衰.[04:58:12]几多对 能悟到几多精髓.[05:02:22]能撑 下去.[05:05:22]竭力也要为爱尽瘁.[05:09:81]抱紧一生未觉累.[05:14:03]几多对 持续爱到几多岁.[05:17:92]当生命 仍能为你豁出去";
    }
    ;
    if (s == "55") {
        ly = ".[00:00:66]月半小夜曲-.[00:01:20](双簧管：叶乃坚（左）;钢琴：褚镇东（右）) - 容祖儿.[00:02:89]作词：吉元由美.[00:05:28]作曲：河合奈保子.[00:08:79]编曲：褚镇东&舒文.[00:27:65]仍然倚在失眠夜.[00:31:51]望天边星宿.[00:34:62]仍然听见小提琴.[00:38:01]如泣似诉再挑逗.[00:41:33]为何只剩一弯月.[00:44:81]留在我的天空.[00:48:98]这晚以后音讯隔绝.[00:55:13]人如天上的明月.[00:58:80]是不可拥有.[01:01:74]情如曲过只遗留.[01:04:91]无可挽救再分别.[01:08:23]为何只是失望.[01:11:33]填密我的空虚.[01:15:45]这晚夜没有吻别.[01:21:07]仍在说永久.[01:24:83]想不到是借口.[01:27:99]从未意会要分手.[01:41:24]但我的心每分每刻.[01:44:85]仍然被她占有.[01:49:12]她似这月儿.[01:51:56]仍然是不开口.[01:54:66]提琴独奏独奏着.[01:58:27]明月半倚深秋.[02:01:94]我的牵挂 我的渴望.[02:05:04]直至以后.[02:24:09]人如天上的明月.[02:27:40]是不可拥有.[02:30:23]情如曲过只遗留.[02:33:36]无可挽救再分别.[02:36:53]为何只是失望.[02:39:69]填密我的空虚.[02:43:57]这晚夜没有吻别.[02:49:17]仍在说永久.[02:52:77]想不到是借口.[02:55:84]从未意会要分手.[03:05:00]但我的心每分每刻.[03:08:14]仍然被她占有.[03:12:41]她似这月儿.[03:14:81]仍然是不开口.[03:17:70]提琴独奏独奏着.[03:21:15]明月半倚深秋.[03:24:48]我的牵挂 我的渴望.[03:27:34]直至以后.[03:38:14]仍在说永久.[03:41:78]想不到是借口.[03:44:85]从未意会要分手.[03:57:15]但我的心每分每刻.[04:00:53]仍然被她占有.[04:04:53]她似这月儿.[04:06:95]仍然是不开口.[04:09:78]提琴独奏独奏着.[04:13:20]明月半倚深秋.[04:16:58]我的牵挂 我的渴望.[04:19:42]直至以后.[04:26:53]我的牵挂 我的渴望.[04:35:63]直至以后";
    }
    ;
    if (s == "56") {
        ly = ".[00:00:68]浪费 - 徐佳莹.[00:02:81]作词：陈信延.[00:05:33]作曲：郑楠.[00:07:51]编曲：郑楠.[00:28:04]多久了 我都没变.[00:31:38]爱你这回事 整整六年.[00:41:70]你最好 做好准备.[00:44:97]我没有打算 停止一切.[00:55:36]想说我没有志愿.[01:01:72]也没有事情好消遣.[01:09:10]有一个人能去爱.[01:14:26]多珍贵.[01:21:58]没关系你也不用给我机会.[01:28:27]反正我还有一生可以浪费.[01:35:24]我就是剩这么一点点倔.[01:41:71]称得上 我的优点.[01:49:01]没关系你也不用对我惭愧.[01:55:73]也许我根本喜欢被你浪费.[02:02:67]随便你今天拼命爱上谁.[02:08:99]我都会 坦然面对.[02:16:29]即使要我跟你再耗个十年 无所谓.[02:58:95]你和他 没有如愿.[03:02:28]短短半年内 开始分裂.[03:12:56]我的爱 依旧没变.[03:15:74]连我自己都 对我钦佩.[03:26:26]有的是很多资源.[03:32:60]我有的是很多时间.[03:39:93]不去爱才是浪费.[03:45:50]多不对.[03:52:54]没关系你也不用给我机会.[03:59:13]反正我还有一生可以浪费.[04:05:80]我就是剩这么一点点倔.[04:12:03]称得上 我的优点.[04:19:79]没关系你也不用对我惭愧.[04:26:56]也许我根本喜欢被你浪费.[04:33:54]就算我再去努力爱上谁.[04:39:95]到头来 也是白费.[04:56:70]不如永远跟你耗来得快乐.[05:04:64]对不对";
    }
    ;
    if (s == "57") {
        ly = ".[00:00:49]不痛 - 徐佳莹.[00:02:39]作词：黄韵如&陈怀恩.[00:05:99]作曲：陈怀恩.[00:08:25]编曲：郑楠.[00:32:25]一点点痛的感觉.[00:33:71]加上一点我对你的思念.[00:38:58]承诺不算太遥远.[00:42:01]遥远只剩一瞬间.[00:46:35]一步步靠近终点.[00:47:64]再差一步我们踏上永远.[00:52:77]谎言让人太陶醉.[00:56:08]陶醉在你给的世界.[01:04:09]我不想不愿不去承认我的执着.[01:07:57]怕不知不觉无法忍住眼泪不留.[01:13:90]是爱伤害了彼此的自由.[01:18:13]你不看不听不说为什么要离开我.[01:21:66]我不哭不笑.[01:23:33]只剩下沉默.[01:27:98]带着我的骄傲高飞远走.[02:00:43]一点点痛的感觉.[02:01:88]加上一点我对你的思念.[02:06:70]承诺不算太遥远.[02:10:28]遥远只剩一瞬间.[02:14:49]一步步靠近终点.[02:16:11]再差一步我们踏上永远.[02:20:89]谎言让人太陶醉.[02:24:26]陶醉在你给的世界.[02:28:68]我不想不愿不去承认我的执着.[02:32:15]怕不知不觉无法忍住眼泪不留.[02:38:50]是爱伤害了彼此的自由.[02:42:77]你不看不听不说为什么要离开我.[02:46:34]我不哭不笑.[02:48:57]只剩下沉默.[02:52:63]带着我的骄傲高飞远走.[02:57:94]紧握过的双手.[03:01:43]拥抱过的温柔.[03:05:03]所有的对错.[03:07:21]跟着脚步你一并带走.[03:39:34]我不想不愿不去承认我的执着.[03:42:76]怕不知不觉无法忍住眼泪不留.[03:49:10]是爱伤害了彼此的自由.[03:53:35]你不看不听不说为什么要离开我.[03:56:89]我不哭不笑.[03:59:08]只剩下沉默.[04:03:23]带着我的骄傲高飞远走.[04:10:35]带着我的骄傲高飞远走";
    }
    ;
    if (s == "58") {
        ly = ".[00:00:55]他不懂 -张杰.[00:18:05]他留给你是背影.[00:23:96]关于爱情只字不提.[00:28:65]害你哭红了眼睛.[00:33:68]他把谎言说的竟然那么动听.[00:39:57]他不止一次骗了你.[00:43:61]不值得你再为他伤心.[00:47:76]他不懂你的心假装冷静.[00:51:69]他不懂爱情把它当游戏.[00:55:62]他不懂表明相爱这件事.[00:59:45]除了对不起就只剩叹息.[01:03:48]他不懂你的心为何哭泣.[01:07:63]窒息到快要不能呼吸.[01:15:60]喔喔.[01:17:85]他不懂你的心.[01:36:85]他把回忆留给你.[01:42:64]连同忧伤强加给你.[01:47:50]对你说来不公平.[01:52:42]他的谎言句句说的那么动听.[01:58:31]他不止一次骗了你.[02:02:24]不值得你再为他伤心.[02:06:50]他不懂你的心假装冷静.[02:10:43]他不懂爱情把它当游戏.[02:14:36]他不懂表明相爱这件事.[02:18:18]除了对不起就只剩叹息.[02:22:22]他不懂你的心为何哭泣.[02:26:39]窒息到快要不能呼吸.[02:34:26]喔喔.[02:36:45]他不懂你的心.[02:53:84]他不懂你的心假装冷静.[02:57:77]他不懂爱情把它当游戏.[03:01:48]他不懂表明相爱这件事.[03:05:41]除了对不起就只剩叹息.[03:09:46]他不懂你的心为何哭泣.[03:13:61]窒息到快要不能呼吸.[03:21:90]喔喔.[03:23:84]他不懂你的心";
    }
    ;
    if (s == "59") {
        ly = ".[00:05:68]信仰.[00:12:05]演唱：张信哲.[00:19:77].[00:33:38]每当我听见忧郁的乐章.[00:36:08]勾起回忆的伤.[00:40:56]每当我看见白色的月光.[00:42:90]想起你的脸庞.[00:46:95]明知不该去想 不能去想.[00:49:78]偏又想到迷惘.[00:54:08]是谁让我心酸 谁让我牵挂.[00:56:89]是你啊.[01:00:06].[01:01:17]我知道那些不该说的话.[01:03:36]让你负气流浪.[01:07:92]想知道多年漂浮的时光.[01:10:47]是否你也想家.[01:14:45]如果当时吻你 当时抱你.[01:17:66]也许结局难讲.[01:21:50]我那么多遗憾 那么多期盼.[01:24:25]你知道吗.[01:27:18].[01:27:80]我爱你 是多么清楚.[01:31:22]多么坚固的信仰.[01:34:76]我爱你 是多么温暖.[01:38:09]多么勇敢的力量.[01:42:44]我不管心多伤 不管爱多慌.[01:45:11]不管别人怎么想.[01:48:55]爱是一种信仰 把我.[01:51:98]带到你的身旁.[01:57:02].[02:20:49]我知道那些不该说的话.[02:23:01]让你负气流浪.[02:27:29]想知道多年漂浮的时光.[02:29:97]是否你也想家.[02:33:94]如果当时吻你 当时抱你.[02:36:86]也许结局难讲.[02:40:96]我那么多遗憾 那么多期盼.[02:43:59]你知道吗.[02:46:44].[02:47:27]我爱你 是多么清楚.[02:50:70]多么坚固的信仰.[02:54:24]我爱你 是多么温暖.[02:57:50]多么勇敢的力量.[03:01:28]我不管心多伤 不管爱多慌.[03:04:47]不管别人怎么想.[03:07:96]爱是一种信仰 把我.[03:11:39]带到你的身旁.[03:17:15].[03:18:58]我爱你 是忠于自己.[03:21:71]忠于爱情的信仰.[03:25:40]我爱你 是来自灵魂.[03:28:71]来自生命的力量.[03:32:94]在遥远的地方.[03:34:27]你是否一样 听见我的呼喊.[03:39:18]爱是一种信仰.[03:41:29]把你 带回我的身旁.[03:46:]爱是一种信仰.[03:48:13]把你 带回我的身旁.[03:56:31]";
    }
    ;
    if (s == "60") {
        ly = ".[00:00:89]天空之城 - 张信哲.[00:03:10]作词：宫崎骏.[00:04:62]作曲：久石让.[00:06:23]编曲：钟兴民.[00:52:03]我现在还有梦想.[00:57:72]心中的城堡辉煌.[01:04:03]不轻狂 不迷惘 浪漫飞翔.[01:09:71]追每个希望.[01:17:34]遥望耀眼光芒.[01:23:08]照亮梦的模样.[01:28:04]遥望无边晴朗.[01:33:78]让心洒满阳光.[01:39:02]当我对着天空望.[01:44:23]多少爱在远方.[01:49:66]每张脸那么安详.[01:54:73]给我勇气陪我探访.[02:00:37]我爱对着天空想.[02:05:64]未来的路有多长.[02:11:34]现实梦幻 交错的出场.[02:17:03]但我已经不惊慌.[02:41:94]我现在还有梦想.[02:46:92]心中的城堡辉煌.[02:52:63]不轻狂 不迷惘 浪漫飞翔.[02:57:59]追每个希望.[03:04:66]遥望耀眼光芒.[03:10:01]照亮梦的模样.[03:14:59]遥望无边晴朗.[03:19:95]让心洒满阳光.[03:25:10]当我对着天空望.[03:29:59]多少爱在远方.[03:34:64]每张脸那么安详.[03:39:47]给我勇气陪我探访.[03:44:71]我爱对着天空想.[03:49:63]前方的路有多长.[03:54:86]现实梦幻 还是会出场.[04:00:27]但我已经不惊慌.[04:04:70]勇气带着我飞翔.[04:09:31]降落希望 的地方";
    }
    ;
    if (s == "61") {
        ly = ".[00:00:92]袖手旁观-张宇.[00:30:06]寂寞让人盲.[00:37:26]思念让人慌.[00:44:14]多喝一点酒.[00:47:46]多吹一些风.[00:50:68]能不能解放.[00:57:04]生活有些忙.[01:03:10]坚持有点难.[01:09:20]闭上一只眼.[01:12:10]点上一根烟.[01:15:26]能不能不管.[01:21:25]你最近好吗.[01:27:12]身体可无恙.[01:33:10]多想不去想.[01:36:00]夜夜偏又想.[01:39:08]真教人为难.[01:46:30]你的脸庞.[01:49:17]闭上眼睛就在我面前转呀转.[01:55:10]我拿什么条件可以把你遗忘.[02:01:38]除非我们.[02:04:18]从一开始就不曾爱过对方.[02:10:34]你的近况.[02:13:33]断续从朋友口中传到我耳畔.[02:19:27]我拿什么条件可以袖手旁观.[02:25:15]除非你说.[02:28:18]离开我你从不曾觉得遗憾.[02:43:79]你的脸庞.[02:46:66]闭上眼睛就在我面前转呀转.[02:52:82]我拿什么条件可以把你遗忘.[02:59:04]除非我们.[03:01:88]从一开始就不曾爱过对方.[03:08:10]你的近况.[03:11:12]断续从朋友口中传到我耳畔.[03:17:24]我拿什么条件可以袖手旁观.[03:23:59]除非你说.[03:33:84]离开我你从不曾觉得遗憾";
    }
    ;
    if (s == "62") {
        ly = ".[00:00:06]一次就好-(电影《夏洛特烦恼》暖水曲)- 杨宗纬 .[00:10:17]词：陈曦 曲：董冬冬.[00:26:03]想看你笑.[00:28:77]想和你闹.[00:30:79]想拥你入我怀抱.[00:36:68]上一秒红着脸在争吵.[00:42:03]下一秒转身就能和好.[00:48:39]不怕你哭.[00:51:19]不怕你叫.[00:53:38]因为你是我的骄傲.[00:59:33]一双眼睛追着你乱跑.[01:04:66]一颗心早已经准备好.[01:16:30]一次就好我带你去看天荒地老.[01:22:02]在阳光灿烂的日子里开怀大笑.[01:27:72]在自由自在的空气里吵吵闹闹.[01:32:90]你可知道我唯一的想要.[01:38:66]世界还小我陪你去到天涯海角.[01:44:58]在没有烦恼的角落里停止寻找.[01:50:24]在无忧无虑的时光里慢慢变老.[01:55:55]你可知道我全部的心跳.[02:00:86]随你跳.[02:24:61]想看你笑.[02:27:22]想和你闹.[02:29:47]想拥你入我怀抱.[02:35:09]上一秒红着脸在争吵.[02:40:64]下一秒转身就能和好.[02:47:21]不怕你哭.[02:49:86]不怕你叫.[02:51:94]因为你是我的骄傲.[02:57:92]一双眼睛追着你乱跑.[03:03:27]一颗心早已经准备好.[03:14:89]一次就好我带你去看天荒地.[03:20:59]在阳光灿烂的日子里开怀大笑.[03:26:30]在自由自在的空气里吵吵闹闹.[03:31:66]你可知道我唯一的想要.[03:37:29]世界还小我陪你去到天涯海角.[03:43:18]在没有烦恼的角落里停止寻找.[03:48:91]在无忧无虑的时光里慢慢变老.[03:57:33]你可知道我全部的心跳.[04:04:95]随你跳.[04:09:00]";
    }
    ;
    if (s == "63") {
        ly = ".[00:00:36]越过山丘 - 杨宗纬.[00:02:76]词：高晓松.[00:04:42]曲：高晓松.[00:13:17]越过山丘.[00:15:87]遇见十九岁的我.[00:19:07]戴着一双白手套.[00:22:15]喝着我的喜酒.[00:25:10]他问我幸福与否.[00:28:36]是否永别了忧愁.[00:31:76]为何婚礼上那么多人.[00:34:66]没有一个当年的朋友.[00:37:73]我说我曾经挽留.[00:41:17]他们纷纷去人海漂流.[00:44:13]那个你深爱的小妞.[00:47:24]嫁了隔壁的王某.[00:50:48]我问她幸福与否.[00:53:48]她哭着点了点头.[00:56:88]后来遇见过那么多人.[00:59:83]想对你说却张不开口.[01:03:23]就让我随你去.[01:06:64]让我随你去.[01:09:57]回到二十岁狂奔的路口.[01:12:63]做个形单影只的歌手.[01:15:82]就让我随你去.[01:19:24]让我随你去.[01:22:13]逆着背影婆娑的人流.[01:25:17]向着那座荒芜的山丘.[01:29:69]挥挥衣袖.[01:33:64]越过山丘.[01:36:22]遇见六十岁的我.[01:39:36]拄着一根白手杖.[01:42:59]在听鸟儿歌唱.[01:45:79]我问他幸福与否.[01:48:71]他笑着摆了摆手.[01:51:95]在他身边围绕着一群.[01:55:25]当年流放归来的朋友.[01:58:36]他说你不必挽留.[02:01:51]爱是一个人的等候.[02:04:71]等到房顶开出了花.[02:07:89]这里就是天下.[02:10:82]总有人幸福白头.[02:14:16]总有人哭着分手.[02:17:43]无论相遇还是不相遇.[02:20:61]都是献给岁月的序曲.[02:23:78]就让我随你去.[02:27:02]让我随你去.[02:30:05]去到六十岁停下的渡口.[02:33:13]等着被一条小船接走.[02:36:32]就让我随你去.[02:39:79]让我随你去.[02:42:66]随着熙熙攘攘的人流.[02:45:84]向着开满鲜花的山丘.[02:51:98]挥挥衣袖.[03:06:81]越过山丘.[03:09:75]遇见十九岁的我.[03:13:03]戴着一双白手套.[03:16:70]喝着我的喜酒.[03:20:14]他问我幸福与否.[03:23:67]是否永别了忧愁.[03:27:21]为何婚礼上那么多人.[03:30:61]没有一个当年的朋友";
    }
    ;
    if (s == "64") {
        ly = ".[00:01:15]突然好想你 - 五月天.[00:13:45]最怕空气突然安静.[00:19:80]最怕朋友突然的关心.[00:25:77]最怕回忆突然翻滚.[00:29:63]绞痛着不平息.[00:32:68]最怕突然听到你的消息.[00:40:33]想念如果会有声音.[00:47:15]不愿那是悲伤的哭泣.[00:53:11]事到如今.[00:55:47]终于让自已属于我自已.[01:00:23]只剩眼泪还骗不过自己.[01:07:55]突然好想你.[01:10:85]你会在哪里.[01:14:27]过的快乐或委屈.[01:20:92]突然好想你.[01:24:63]突然锋利的回忆.[01:27:98]突然模糊的眼睛.[01:35:35]我们像一首最美丽的歌曲.[01:42:06]变成两部悲伤的电影.[01:47:91]为什么你.[01:50:11]带我走过最难忘的旅行.[01:55:02]然后留下最痛的纪念品.[02:29:04]我们那么甜 那么美.[02:32:59]那么相信.[02:34:44]那么疯 那么热烈的曾经.[02:38:57]为何我们.[02:40:23]还是要奔向各自的幸福.[02:43:74]和遗憾中老去.[02:46:75]突然好想你.[02:50:25]你会在哪里.[02:53:69]过的快乐或委屈.[03:00:77]突然好想你.[03:04:06]突然锋利的回忆.[03:07:36]突然模糊的眼睛.[03:14:75]最怕空气突然安静.[03:21:50]最怕朋友突然的关心.[03:27:40]最怕回忆突然翻滚.[03:31:35]绞痛着不平息.[03:34:40]最怕突然听到你的消息.[03:41:46]最怕此生已经决心自己过.[03:46:79]没有你却又突然.[03:50:94]听到你的消息";
    }
    ;
    if (s == "65") {
        ly = "本音乐暂无歌词";
    }
    ;
    if (s == "66") {
        ly = ".[00:00:06]有多少爱可以重来.[00:24:76]常常责怪自己当初不应该.[00:33:11]常常后悔没有把你留下来.[00:40:72]为什么明明相爱.[00:44:55]到最后还是要分开.[00:49:14]是否我们总是徘徊在心门之外.[00:58:96]谁知道又和你相遇在人海.[01:07:54]命运如此安排总教人无奈.[01:15:09]这些年过得不好不坏.[01:19:22]只是好像少了一个人存在.[01:23:59]而我渐渐明白.[01:25:66]你仍然是我不变的关怀.[01:31:91]有多少爱可以重来.[01:35:79]有多少人愿意等待.[01:40:19]当懂得珍惜以后归来.[01:42:35]却不知那份爱会不会还在.[01:48:73]有多少爱可以重来.[01:52:89]有多少人值得等待.[01:57:24]当爱情已经桑田沧海.[02:00:31]是否还有勇气去爱.[02:41:95]谁知道又和你相遇在人海.[02:50:43]命运如此安排总教人无奈.[02:57:15]这些年过得不好不坏.[03:01:99]只是好像少了一个人存在.[03:06:43]而我渐渐明白.[03:08:37]你仍然是我不变的关怀.[03:14:69]有多少爱可以重来.[03:18:52]有多少人愿意等待.[03:23:06]当懂得珍惜以后归来.[03:25:97]却不知那份爱会不会还在.[03:31:39]有多少爱可以重来.[03:35:67]有多少人值得等待.[03:39:78]当爱情已经桑田沧海.[03:43:05]是否还有勇气去爱.[03:49:10]有多少爱可以重来.[03:52:80]有多少人愿意等待.[03:57:06]当懂得珍惜以后归来.[03:59:96]却不知那份爱会不会还在.[04:05:68]有多少爱可以重来.[04:09:92]有多少人值得等待.[04:14:11]当爱情已经桑田沧海.[04:17:26]是否还有勇气去爱.[04:23:26]当爱情已经桑田沧海.[04:26:00]是否还有勇气去爱";
    }
    ;
    if (s == "67") {
        ly = ".[00:01:23]灰色空间-罗志祥.[00:31:32]原来不是白就是黑.[00:37:28]只不过是天真的以为.[00:44:14]要醉得清醒 要无辜的犯罪.[00:50:69]现实的世界只有灰.[00:58:01]坚强得太久好疲惫.[01:03:96]想抱爱的人沉沉的睡.[01:10:51]卷来的风暴 凶猛里有种美.[01:17:37]死了心 痛就没感觉.[01:23:42]灰色空间 我是谁.[01:30:83]记不得幸福是什么滋味.[01:36:84]无路可退 你是谁.[01:44:75]怎么为我流泪.[02:01:25]Heh~~~~.[02:20:81]梦见发着光的草原.[02:26:46]一身伤回到很久以前.[02:33:22]我选择不恨 带着平静走远.[02:39:77]醒来后 遗憾是长夜.[02:45:82]灰色空间 我是谁.[02:52:93]记不得幸福是什么滋味.[02:59:04]无路可退 你是谁.[03:08:37]怎么为我流泪.[03:14:67]请抱着我流泪";
    }
    ;
    if (s == "68") {
        ly = ".[00:00:69]喜欢你 (原唱: Beyond) - G:E:M:邓紫棋  .[00:12:54]细雨带风湿透黄昏的街道.[00:18:51]抹去雨水双眼无故地仰望.[00:23:88]望向孤单的晚灯.[00:27:32]是那伤感的记忆.[00:33:96]再次泛起心里无数的思念.[00:40:00]以往片刻欢笑仍挂在脸上.[00:45:45]愿你此刻可会知.[00:48:83]是我衷心的说声.[00:54:02]喜欢你 那双眼动人.[01:00:04]笑声更迷人.[01:03:05]愿再可 轻抚你.[01:09:11]那可爱面容.[01:12:30]挽手说梦话.[01:15:36]像昨天 你共我.[01:26:57]满带理想的我曾经多冲动.[01:32:34]屡怨与她相爱难有自由.[01:37:78]愿你此刻可会知.[01:41:13]是我衷心的说声.[01:46:32]喜欢你 那双眼动人.[01:52:32]笑声更迷人.[01:55:34]愿再可 轻抚你.[02:01:62]那可爱面容.[02:04:60]挽手说梦话.[02:07:65]像昨天 你共我.[02:25:67]每晚夜里自我独行.[02:29:29]随处荡 多冰冷.[02:38:06]以往为了自我挣扎.[02:41:62]从不知 她的痛苦.[02:54:20]喜欢你 那双眼动人.[03:00:02]笑声更迷人.[03:03:11]愿再可 轻抚你.[03:09:23]那可爱面容.[03:12:29]挽手说梦话.[03:15:72]像昨天 你共我.[03:22:60]哦哦哦 哦哦.[03:25:72]哦哦哦 哦哦.[03:28:51]哦哦哦 哦哦.[03:31:54]哦哦哦 哦哦.[03:34:63]哦哦哦 哦哦.[03:37:69]哦哦哦 哦哦.[03:40:76]哦哦哦 哦哦.[03:44:08]哦哦哦 哦哦.[03:46:88]哦哦哦 哦哦.[03:49:98]哦哦哦 哦哦.[03:53:05]哦哦哦 哦哦";
    }
    ;
    if (s == "69") {
        ly = ".[00:00:60]撕夜 - 阿杜.[00:15:63]我把梦撕了一页.[00:18:51]不懂明天该怎么写.[00:22:29]冷冷的街 冷冷的灯 照着谁.[00:30:73]一场雨湿了一夜.[00:33:66]你的温柔该怎么给.[00:37:41]冷冷的风 冷冷的吹 不停歇.[00:44:60]那个人在天桥下.[00:47:00]留下等待工作的电话号码.[00:52:85]我想问他 多少人打给他.[00:59:81]随手放开电话上.[01:02:29]那本指引迷途心灵的密码.[01:08:10]我的未来 依然没有解答.[01:16:60]旧电话撕了一页.[01:19:35]我的朋友还剩下谁.[01:23:22]冷冷的心 冷冷的梦 在哽咽.[01:31:70]两个人撕了一夜.[01:34:52]抱得再紧也不能睡.[01:38:46]冷冷的你 冷冷的泪 湿了夜.[02:02:26]我把梦撕了一页.[02:05:06]不懂明天该怎么写.[02:08:83]冷冷的街 冷冷的灯 照着谁.[02:17:41]一场雨湿了一夜.[02:20:24]你的温柔该怎么给.[02:24:12]冷冷的风 冷冷的吹 不停歇.[02:31:66]那个人在天桥下.[02:33:66]留下等待工作的电话号码.[02:39:53]我想问他 多少人打给他.[02:46:53]随手放开电话上.[02:48:92]那本指引迷途心灵的密码.[02:54:96]我的未来 依然没有解答.[03:01:58]那个人在天桥下.[03:04:11]留下等待工作的电话号码.[03:10:16]我想问他 多少人打给他.[03:16:88]随手放开电话上.[03:19:26]那本指引迷途心灵的密码.[03:25:31]我的未来 依然没有解答.[03:33:57]旧电话撕了一页.[03:36:38]我的朋友还剩下谁.[03:40:26]冷冷的心 冷冷的梦 在哽咽.[03:48:78]两个人撕了一夜.[03:51:70]抱得再紧也不能睡.[03:55:51]冷冷的你 冷冷的泪 湿了夜.[04:03:20]冷冷的你 冷冷的泪 湿了夜";
    }
    ;
    if (s == "70") {
        ly = ".[00:01:68]他一定很爱你(电视剧《男才女貌》主题曲) - 阿杜 .[00:31:49]我躲在车里手握着香槟.[00:35:78]想要给你生日的惊喜.[00:40:77]你越走越近有两个声音.[00:45:26]我措手不及只得楞在那里.[00:54:43]我应该在车底不应该在车里.[00:59:33]看到你们有多甜蜜.[01:03:71]这样一来我也比较容易死心.[01:08:80]给我离开的勇气.[01:15:51]他一定很爱你.[01:17:88]也把我比下去.[01:20:50]分手也只用了一分钟而已.[01:25:54]他一定很爱你.[01:27:86]比我会讨好你.[01:30:49]不会像我这样孩子气.[01:35:33]为难着你.[01:50:96]我应该在车底不应该在车里.[01:55:75]看到你们有多甜蜜.[02:00:29]这样一来我也比较容易死心.[02:05:18]给我离开的勇气.[02:12:04]他一定很爱你.[02:14:35]也把我比下去.[02:16:83]分手也只用了一分钟而已.[02:21:97]他一定很爱你.[02:24:29]比我会讨好你.[02:26:91]不会像我这样孩子气.[02:31:80]为难着你.[02:47:44]他一定很爱你.[02:49:65]也把我比下去.[02:52:22]分手也只用了一分钟而已.[02:57:22]他一定很爱你.[02:59:64]比我会讨好你.[03:02:24]不会像我这样孩子气 为难着你";
    }
    ;
    if (s == "71") {
        ly = ".[00:00:93]坚持到底-阿杜.[00:30:02]在水里 在火里.[00:33:86]我的爱不偏不移.[00:37:38]就算时光倒回去.[00:42:10]我也追到石器世纪.[00:45:02]在风里 在雨里.[00:49:20]你的雨伞吹翻过去.[00:52:74]我绝对毫不犹豫.[00:57:24]为你披上我的外衣.[01:02:79]是你让我看透生命这东西.[01:06:98]四个字 坚持到底哦~.[01:12:68]如果没有你.[01:14:74]我的生活回到一片狼藉.[01:17:97]是你让我翻破爱情的秘笈.[01:22:77]四个字 坚持到底哦~.[01:28:26]不管有多苦.[01:30:28]我会全心全力.[01:32:49]爱你到底.[01:49:11]在风里 在雨里.[01:53:20]你的雨伞吹翻过去.[01:56:73]我绝对毫不犹豫.[02:01:07]为你披上我的外衣.[02:06:67]是你让我看透生命这东西.[02:11:34]四个字 坚持到底 哦~.[02:16:54]如果没有你.[02:18:50]我的生活回到一片狼藉.[02:22:33]是你让我翻破爱情的秘笈.[02:26:70]四个字 坚持到底 哦~.[02:31:90]不管有多苦.[02:34:02]我会全心全力.[02:36:34]爱你到底.[02:42:79]当你看进我的眼里.[02:45:57]我的心颤抖不已.[02:50:46]请让温柔的说一句.[02:53:34]感觉累的时候 让我抱紧.[03:04:74]是你让我看透生命这东西.[03:09:32]四个字 坚持到底 哦~.[03:14:82]如果没有你.[03:16:49]我的生活回到一片狼藉.[03:20:51]是你让我翻破爱情的秘笈.[03:24:74]四个字 坚持到底 哦~.[03:30:34]不管有多苦.[03:32:05]我会全心全力.[03:34:42]坚持到底";
    }
    ;
    if (s == "72") {
        ly = ".[00:01:52]不再见(电影《小时代3：刺金时代》插曲)-陈学冬.[00:15:28]离别没说再见 你是否心酸.[00:22:61]转身寥寥笑脸 不甘的甘愿.[00:30:02]也许下个冬天 也许还十年.[00:37:40]再回到你身边 为你撑雨伞.[00:46:90]剩几个夜晚 再几次晚安.[00:53:62]等你摘下还戴上指环.[01:01:11]原谅捧花的我盛装出席.[01:05:09]只为错过你.[01:08:32]祈祷天灾人祸.[01:10:87]分给我只给你这香气.[01:15:67]但我卑微奢求.[01:18:29]让我存留些许的气息.[01:23:12]好让你在梦里能.[01:26:09]想起我曾紧抱你的 力气.[01:45:94]以后遇见风雪 有新的雨伞.[01:53:13]为我留的灯盏 能不能别关.[02:00:78]不要为我伤感 别被绝望打断.[02:07:76]不能一起的白头 也别让风雪染.[02:17:32]再一个明天 下一世人间.[02:24:03]等我再为你戴上指环.[02:31:59]原谅捧花的我盛装出席.[02:35:51]却只为献礼.[02:39:09]目送洁白纱裙路过.[02:42:23]我对他说我愿意.[02:46:08]但我继续清扫门前的路.[02:50:60]和那段阶梯.[02:53:85]如果你疲惫时.[02:55:84]别忘记那里还能停留 休息.[03:16:14]原谅捧花的我盛装出席.[03:19:78]只为错过你.[03:23:09]祈祷天灾人祸.[03:25:36]分给我只给你这香气.[03:30:80]我想大言不惭卑微奢求.[03:34:85]来世再爱你.[03:37:89]希望每晚星亮入梦时.[03:42:17]有人来代替我 吻你";
    }
    ;
    if (s == "73") {
        ly = ".[00:01:20]有情世间-(电影《恶棍天使》主题曲) - 邓超.[00:06:49]词：俞白眉&李缤&李叔同.[00:09:65]曲：李缤.[00:28:14]我拾起一颗两颗三颗贝壳.[00:34:91]有银色金色灰色紫色白色.[00:41:80]是你的我的他的还是谁的.[00:47:90]曾被人踢过走过踩过扔过捡过.[00:55:54]在过去未来现在多少蹉跎.[01:00:70]唯独没爱过.[01:09:11]又过了一天两天三天五天.[01:14:33]我数着盼着那时针分针秒针一圈又一圈.[01:21:85]就这样过了一年两年三年五年十年.[01:28:13]不知多少年.[01:34:83]啊 多么美丽.[01:36:50]啊伊梭喔.[01:41:99]多么美丽.[01:43:46]啊伊梭喔.[01:48:77]恋过痛过.[01:50:29]梭啷.[01:53:94]终于没错过.[02:31:58]我拿着一颗两颗三颗贝壳.[02:37:64]分不清你的我的你的还是我的.[02:45:03]又过了一天两天三天五天.[02:50:49]不知不觉又一年两年三年五年百年.[02:58:16]我们共数一圈两圈三圈五圈百圈.[03:04:20]还有无数圈.[03:10:83]啊 多么美丽.[03:12:56]啊伊梭喔.[03:17:87]多么美丽.[03:19:79]啊伊梭喔.[03:24:82]活过爱过.[03:26:58]梭啷.[03:29:88]从此不退缩.[03:38:33]啊 多么美丽.[03:40:27]啊伊梭喔.[03:45:31]多么美丽.[03:47:12]啊伊梭喔.[03:52:24]爱过活过.[03:54:01]梭啷.[03:57:28]今生已值得.[04:05:90]我们唱着.[04:07:64]天之涯.[04:11:00]地之角.[04:14:32]知交半零落.[04:21:37]一壶浊酒尽余欢.[04:28:08]今宵别梦寒.[04:35:17]啊伊梭喔.[04:40:35]多么美丽.[04:41:65]啊伊梭喔.[04:47:04]爱过恨过.[04:48:53]梭啷.[04:52:31]此生我活过.[04:59:12]今宵别梦寒";
    }
    ;
    if (s == "74") {
        ly = "本音乐暂无歌词";
    }
    ;
    if (s == "75") {
        ly = ".[00:00]同桌的你.[00:01:90]明天你是否会想起.[00:05:43]昨天你写的日记.[00:09:14]明天你是否还惦记.[00:12:63]曾经最爱哭的你.[00:16:43]老师们都已想不起.[00:20:01]猜不出问题的你.[00:23:71]我也是偶然翻相片.[00:27:30]才想起同桌的你.[00:31:04]谁娶了多愁善感的你.[00:34:73]谁看了你的日记.[00:38:40]谁把你的长发盘起.[00:42:00]谁给你做的嫁衣.[01:14:74]你从前总是很小心.[01:18:09]问我借半块橡皮.[01:21:71]你也曾无意中说起.[01:25:31]喜欢跟我在一起.[01:29:38]那时候天总是很蓝.[01:32:67]日子总过得太慢.[01:36:23]你总说毕业遥遥无期.[01:40:11]转眼就各奔东西.[01:43:77]谁遇到多愁善感的你.[01:47:34]谁安慰爱哭的你.[01:51:09]谁看了我给你写的信.[01:54:72]谁把它丢在风里.[02:42:75]从前的日子都远去.[02:45:99]我也会有我的妻.[02:49:78]我也会给她看相片.[02:53:34]给她讲同桌的你.[02:57:08]谁娶了多愁善感的你.[03:00:70]谁安慰爱哭的你.[03:04:41]谁把你的长发盘起.[03:08:04]谁给你做的嫁衣.[03:29:87]谁娶了多愁善感的你.[03:33:14]谁安慰爱哭的你.[03:36:78]谁把你的长发盘起.[03:40:41]谁给你做的嫁衣.[03:44:31]啦啦啦……啦啦啦……啦啦啦啦……";
    }
    ;
    if (s == "76") {
        ly = ".[00:01:92]匆匆那年（电影《匆匆那年》同名主题曲）- 王菲.[00:28:21]匆匆那年 我们究竟说了几遍.[00:31:17]再见之后 再拖延.[00:33:89]可惜谁有没有 爱过不是一场.[00:36:85]七情上面的雄辩.[00:39:57]匆匆那年我们 一时匆忙撂下.[00:42:42]难以承受的诺言.[00:45:15]只有等别人兑现.[00:51:00]不怪那吻痕 还没积累成茧.[00:56:41]拥抱着冬眠 也没能羽化再成仙.[01:02:01]不怪这一段情没空反复再排练.[01:07:56]是岁月宽容恩赐 反悔的时间.[01:18:57]如果再见不能红着眼 是否还能红着脸.[01:24:49]就像那年匆促刻下.[01:26:54]永远一起那样美丽的谣言.[01:29:73]如果过去还值得眷恋 别太快冰释前嫌.[01:35:78]谁甘心就这样 彼此无挂也无牵.[01:41:49]我们要互相亏欠 要不然凭何怀缅.[01:58:26]匆匆那年 我们见过太少世面.[02:01:22]只爱看同一张脸.[02:03:93]那么莫名其妙 那么讨人欢喜.[02:06:78]闹起来又太讨厌.[02:09:41]相爱那年活该匆匆.[02:11:47]因为我们不懂顽固的诺言.[02:15:10]只是分手的前言.[02:20:96]不怪那天太冷 泪滴水成冰.[02:26:42]春风也一样没吹进凝固的照片.[02:31:99]不怪每一个人没能完整爱一遍.[02:37:69]是岁月善意落下 残缺的悬念.[02:48:41]如果再见不能红着眼 是否还能红着脸.[02:54:56]就像那年匆促刻下.[02:56:51]永远一起那样美丽的谣言.[02:59:43]如果过去还值得眷恋 别太快冰释前嫌.[03:05:76]谁甘心就这样 彼此无挂也无牵.[03:10:66]如果再见不能红着眼 是否还能红着脸.[03:17:00]就像那年匆促刻下.[03:19:00]永远一起那样美丽的谣言.[03:21:87]如果过去还值得眷恋 别太快冰释前嫌.[03:28:25]谁甘心就这样 彼此无挂也无牵.[03:33:96]我们要互相亏欠 我们要藕断丝连";
    }
    ;
    if (s == "77") {
        ly = ".[00:00:18]清风徐来-(电影《港囧》主题曲) - 王菲.[00:02:83]词：赵英俊.[00:03:57]曲：赵英俊.[00:04:67]只要热烈都好过温存.[00:11:93]几经冷漠也不屑容忍.[00:19:34]铭心刻骨就要一意孤行.[00:26:41]越是憧憬越要风雨兼程.[00:33:94]要走多远才算走进森林.[00:41:11]曾几何时开始细数生辰.[00:48:05]誓言久藏怎么滋生残忍.[00:55:51]青涩难免要被遗憾瓜分.[01:06:39]清风徐来水波不兴.[01:13:78]哪个剧本没有分生.[01:21:10]愈想证明就愈不肯定.[01:27:82]可能完美和完整.[01:30:63]不是一回事情.[01:35:59]清风徐来水波不兴.[01:42:84]顺流而上海阔天空.[01:50:12]人面桃花倾国倾城.[01:56:92]与我谈笑风生.[02:00:46]那些可遇 而不可求的事情.[02:19:15]要走多远才算走进森林.[02:26:56]曾几何时开始细数生辰.[02:33:65]誓言久藏怎么滋生残忍.[02:40:98]青涩难免要被遗憾瓜分.[02:48:26]清风徐来水波不兴.[02:55:56]哪个剧本没有分生.[03:02:92]愈想证明就愈不肯定.[03:09:57]可能完美和完整.[03:12:48]不是一回事情.[03:17:45]清风徐来水波不兴.[03:24:68]顺流而上海阔天空.[03:31:94]人面桃花倾国倾城.[03:38:80]与我笑风生.[03:42:29]那些可遇 而不可求.[03:46:55]清风徐来水波不兴.[03:53:76]顺流而上海阔天空.[04:01:04]人面桃花倾国倾城.[04:07:83]与我谈笑风生.[04:11:46]那些可遇 而不可求的事情";
    }
    ;
    if (s == "78") {
        ly = ".[00:00:51]致青春 (电影《致我们终将逝去的青春》主题曲) - 王菲 .[00:02:36]作曲：窦鹏  作词：李樯.[00:10:33]他不羁的脸像天色将晚.[00:17:11]她洗过的发像心中火焰.[00:23:87]短暂的狂欢以为一生绵延.[00:30:65]漫长的告别是青春盛宴.[00:37:46]我冬夜的手像滚烫的誓言.[00:44:23]你闪烁的眼像脆弱的信念.[00:51:04]贪恋的岁月被无情偿还.[00:57:81]骄纵的心性已烟消云散.[01:04:57]疯了累了痛了.[01:14:63]人间喜剧.[01:18:12]笑了叫了走了.[01:27:73]青春离奇.[01:35:15]良辰美景奈何天.[01:38:55]为谁辛苦为谁甜.[01:41:74]这年华青涩逝去.[01:44:78]却别有洞天.[01:48:71]良辰美景奈何天.[01:52:10]为谁辛苦为谁甜.[01:55:27]这年华青涩逝去.[01:58:33]明白了时间.[02:04:01]疯了累了痛了.[02:14:05]人间喜剧.[02:17:55]笑了叫了走了.[02:27:05]青春离奇";
    }
    ;
    if (s == "79") {
        ly = ".[00:00:88]暧昧 - 薛之谦.[00:02:44]作词：薛之谦.[00:04:19]作曲：薛之谦.[00:05:57]编曲：薛之谦&郑伟.[00:07:67]制作人：郑伟.[00:15:59]反正现在的感情 都暧昧.[00:20:04]你大可不必为难 找般配.[00:25:09]付出过的人排队 谈体会.[00:29:30]趁年轻别害怕一个人睡.[00:34:41]可能是现在感情 太昂贵.[00:39:27]让付出真心的人 好狼狈.[00:44:01]还不如听首情歌 的机会 忘了谁.[00:55:55]感情像牛奶一杯 越甜越让人生畏.[01:04:69]都早有些防备 润色前的原味.[01:13:95]所以人们都拿起咖啡 把试探放在两人位.[01:24:17]距离感一对 就不必再赤裸相对.[01:32:54]反正现在的感情 都暧昧.[01:36:92]你大可不必为难 找般配.[01:41:62]付出过的人排队 谈体会.[01:46:22]弃之可惜 食而无味.[01:51:22]可能是现在感情 太珍贵.[01:55:98]让付出真心的人 好疲惫.[02:00:83]谁不曾用过卑微的词汇 想留住谁.[02:50:33]还贪恋着衣衫昂贵 却输给了廉价香水.[03:00:00]他先诱你入位 还刻意放低了分贝.[03:09:62]可感情越爱越妩媚 像烂掉的苹果一堆.[03:19:20]连基因都不对 还在意什么鱼腥味.[03:27:64]反正现在的感情 都暧昧.[03:32:03]你大可不必为难 找般配.[03:37:11]何必给自己沉迷 的机会.[03:41:54]不如用误会来结尾.[03:46:38]反正现在的我们 算暧昧.[03:51:18]我愿意给的感情 请浪费.[03:55:99]反正流过的眼泪 难收回.[04:00:79]就别再安慰.[04:05:95]看你入眠的侧脸 有多美.[04:10:83]和你丢下的一切 好匹配.[04:17:45]我还以为我能 多狼狈.[04:23:72]我自以为";
    }
    ;
    if (s == "80") {
        ly = ".[00:00:58]丑八怪 - 薛之谦.[00:02:90]作词 : 甘世佳.[00:05:34]作曲 : 李荣浩.[00:19:97]如果世界漆黑 其实我很美.[00:23:46]在爱情里面进退 最多被消费.[00:27:33]无关痛痒的是非.[00:29:01]又怎么不对 无所谓.[00:35:30]如果像你一样 总有人赞美.[00:38:94]围绕着我的卑微 也许能消退.[00:42:92]其实我并不在意 有很多机会.[00:46:02]像巨人一样的无畏.[00:49:10]放纵我心里的鬼.[00:50:57]可是我不配.[00:54:18]丑八怪 能否别把灯打开.[01:01:59]我要的爱 出没在漆黑一片的舞台.[01:09:20]丑八怪 在这暧昧的时代.[01:17:18]我的存在 像意外.[01:37:42]有人用一滴泪 会红颜祸水.[01:41:07]有人丢掉称谓 什么也不会.[01:44:81]只要你足够虚伪.[01:46:40]就不怕魔鬼 对不对.[01:52:74]如果剧本写好 谁比谁高贵.[01:56:42]我只能沉默以对 美丽本无罪.[02:00:13]当欲望开始贪杯 有更多机会.[02:03:45]像尘埃一样的无畏.[02:06:54]化成灰谁认得谁管他配不配.[02:11:59]丑八怪 能否别把灯打开.[02:19:09]我要的爱 出没在漆黑一片的舞台.[02:26:59]丑八怪 在这暧昧的时代.[02:34:61]我的存在 不意外.[03:01:45]丑八怪 其实见多就不怪.[03:09:45]放肆去high 用力踩.[03:13:90]那不堪一击的洁白.[03:16:88]丑八怪 这是我们的时代.[03:24:87]我不存在 才意外";
    }
    ;
    if (s == "81") {
        ly = ".[00:00:32]初学者 - 薛之谦.[00:01:69]词：薛之谦.[00:02:85]曲：薛之谦.[00:17:41]像海浪撞过了山丘以后还能撑多久.[00:25:00]他可能只为你赞美一句后往回流.[00:33:69]那娇艳的花盛开后等你来能撑多久.[00:41:19]还是被诗人折断了伤心了换歌词一首.[00:49:28]那鸳鸯走散了一只在拼命的往南走.[00:57:13]被混沌的城市用钢筋捂住了出口.[01:05:42]仿佛悲伤的人们能靠着雾霾遮住伤口.[01:13:16]还羡慕着期待蓝天的少年总抬头.[01:21:83]围观的 自愿的 做崇拜者.[01:29:83]贪婪的 欺骗着 初学者.[01:37:76]劝说者 自私的 做挑拨者.[01:45:80]脆弱的 羡慕者 被安抚着.[02:01:83]在深夜的拥挤里人们举起无助的手.[02:09:24]却暗示着别人别找我在天亮以后.[02:17:60]我怀念起没有雾霾的时候你的借口.[02:25:73]在不足几平方的脏乱里号称着自由.[02:33:94]围观的 自愿的 做崇拜者.[02:41:82]贪婪的 欺骗着 初学者.[02:49:63]劝说者 自私的 做挑拨.[02:57:86]脆弱的 羡慕者 被玩腻了.[03:40:06]认真的 初学者 你不及格.[03:46:17]在故事里要听国王扯 听说书的 听爱人扯.[03:56:04]专情的 初学者 有何不舍.[04:02:27]我们也都是被爱过的 被玩腻了 就自立了";
    }
    ;
    if (s == "82") {
        ly = ".[00:01:62]动物世界 - 薛之谦.[00:03:65]作词：薛之谦.[00:05:52]作曲：郭顶.[00:10:66]东打一下西戳一下.[00:13:32]动物未必需要尖牙.[00:15:80]示爱的方法有礼貌或是我管它.[00:21:09]要将情人一口吞下.[00:23:58]还要显得温文尔雅.[00:26:22]螳螂委屈的展示旧伤疤.[00:31:40]求偶时候一惊一乍.[00:33:94]因为害怕时常倒挂.[00:36:48]走投无路的情况下舍弃了尾巴.[00:41:81]如果不能将它同化就寄生于它.[00:46:92]大不了一同腐化.[00:50:85]努力进化 笑动物世界都太假.[00:56:83]祖先 已磨去爪牙.[01:01:16]相爱相杀 一定有更好的办法.[01:07:12]攀比一下 谁先跪下.[01:11:60]不再进化 动物世界里都太傻.[01:17:50]为情表现到浮夸.[01:23:29]得到了你就该丢下.[01:25:75]人性来不及粉刷.[01:27:56]所以啊 人总患孤寡.[01:54:35]麋鹿本来约在树下.[01:56:80]说好一起浪迹天涯.[01:59:39]系上铃铛还在往那个方向挣扎.[02:04:64]如果有只豺狼它英勇披上婚纱.[02:09:31]同伴笑他读过童话.[02:22:66]别再进化 别让动物世界太假.[02:28:45]我们 该露出爪牙.[02:32:70]相爱相杀 别再想更好的办法.[02:38:52]优胜劣汰 自舔伤疤.[02:42:81]假装进化 拼命想和动物有差.[02:48:56]玩一出高贵优雅.[02:53:71]在人们腐烂的欲望下.[02:56:56]兽性来不及抹杀.[02:58:41]算了吧 懒得去挣扎.[03:04:29]人类用沙 想捏出梦里通天塔.[03:09:94]为贪念不惜代价.[03:15:58]驾驭着昂贵的木马.[03:18:08]巢穴一层层叠加.[03:19:87]最后啊 却一丝不挂.[03:24:98]别害怕 我们都孤寡.[03:31:23]制作人：郭顶.[03:32:49]编曲：陈迪.[03:33:66]钢琴：陈迪.[03:34:64]贝斯：陈迪.[03:35:63]鼓：王斌.[03:36:45]弦乐：国际首席爱乐乐团.[03:37:28]第一小提琴：李朋&王大毛&庞阔&张浩&杨爽&李曦&刘潇&高言&杨思宇&倪冰雪.[03:38:08]第二小提琴：简蓓&阎红 &张晨迪&唐昕&侯宇红&张雷&徐文超.[03:38:84]中提琴：何辉&毕芳&武文豪&陈欣欣&王羽沛.[03:39:68]大提琴：张平&郎莹&陈俊杰&孙艺&邵鑫.[03:40:91]低音提琴：周旭&段然.[03:41:78]录音：汝文博（Big J Studio: beijing:).[03:42:67]混音：赵靖（Big J Studio: beijing:）.[03:43:78]母带：Tom Coyne（Sterlingsound NYC:）.[03:45:12]";
    }
    ;
    if (s == "83") {
        ly = ".[00:00:29]刚刚好 - 薛之谦.[00:01:80]词：薛之谦.[00:03:00]曲：薛之谦.[00:37:61]如果有人在灯塔.[00:40:11]拨弄她的头发.[00:42:18]思念刻在墙和瓦.[00:46:49]如果感情会挣扎.[00:48:82]没有说的儒雅.[00:51:05]把挽回的手放下.[00:54:77]镜子里的人说假话.[00:58:66]违心的样子你决定了吗.[01:03:84]装聋或者作哑 要不我先说话.[01:16:19]我们的爱情 到这刚刚好.[01:19:79]剩不多也不少 还能忘掉.[01:25:06]我应该可以 把自己照顾好.[01:33:17]我们的距离 到这刚刚好.[01:37:00]不够我们拥抱 就挽回不了.[01:42:22]用力爱过的人 不该计较.[01:59:21]是否要逼人弃了甲.[02:01:63]亮出一条伤疤.[02:03:68]不堪的根源在哪.[02:07:78]可是感情会挣扎.[02:09:85]没有别的办法.[02:12:15]它劝你不如退下.[02:16:09]如果分手太复杂.[02:19:60]流浪的歌手会放下吉他.[02:24:98]故事要美必须藏着真话.[02:32:72]我们的爱情 到这刚刚好.[02:36:36]剩不多也不少 还能忘掉.[02:41:17]我应该可以 把自己照顾好.[02:49:24]我们的距离 到这刚刚好.[02:53:17]不够我们拥抱 就挽回不了.[02:58:57]用力爱过的人 不该计较.[03:06:21]我们的爱情到这刚刚好.[03:10:24]再不争也不吵 不必再煎熬.[03:15:41]你可以不用 记得我的好.[03:22:97]我们的流浪到这刚刚好.[03:26:86]趁我们还没到 天涯海角.[03:31:61]我也不是非要去那座城堡.[03:39:89]天空有些暗了暗的刚刚好.[03:43:72]我难过的样子就没人看到.[03:48:83]你别太在意我身上的记号";
    }
    ;
    if (s == "84") {
        ly = ".[00:01:35]高尚 - 薛之谦.[00:03:11]词：薛之谦.[00:04:34]曲：周以力.[00:07:55].[00:09:18]在阴郁的地方 积攒能量.[00:15:77].[00:18:71]人交出了什么 能变个样.[00:25:37].[00:28:67]奇形怪状 的人在生长.[00:35:37].[00:38:63]我躲在人群中 头在晃.[00:44:78].[00:48:73]刺破我的心脏 样本不算肮脏.[00:54:45]别恐慌.[00:57:09].[00:58:63]你看我虚荣模样 你该怎么补偿.[01:04:53].[01:07:40]我多高尚 向自尊开了枪.[01:16:00].[01:17:26]你同情的眼光 我特别的欣赏.[01:22:49].[01:23:15]哀而不伤.[01:26:42].[01:27:17]我多慌张 怕人闯入我围墙.[01:35:62].[01:36:88]窥探五官不详 见我原本模样.[01:42:01].[01:42:53]还能 模仿 任何形状.[01:49:15].[02:00:55]越恶劣的情况 越要想象.[02:07:31].[02:10:24]狼藏起反犬旁 像从了良.[02:17:47].[02:20:72]张牙舞爪 的人在散谎.[02:27:20].[02:29:92]愿形容我的词 别太荒唐.[02:36:26].[02:40:88]贪念表现恰当 就像索要嫁妆.[02:45:90]在情理上.[02:48:80].[02:49:79]请当我孤芳自赏 还规矩条条框框.[02:57:32].[02:59:28]我多高尚 向自尊开了枪.[03:07:35].[03:08:86]你异样的眼光 我特别的欣赏.[03:14:08].[03:14:71]让人难忘.[03:18:63]我多风光 你别闯入我围墙.[03:27:12].[03:28:33]你要什么真相 不就图个皮囊.[03:33:42].[03:34:07]不如 让我 留在橱窗.[03:40:09].[03:52:49]我多难忘 像秀色可餐的模样.[04:00:91].[04:01:97]感谢你又打赏 你用词越恰当.[04:07:87]我越膨胀.[04:11:44].[04:11:99]我的疯狂 连我自己都看不上.[04:20:44].[04:21:35]阴里怪气的愿望 那屈辱的轻伤.[04:27:15]谁能给我 发个奖章.[04:34:85].[04:43:45]我多向往 有个美丽的地方.[04:52:21].[04:53:41]我最初的模样 没痛也不会痒.[04:59:88].[05:00:96]能把赏赐 都烧光.[05:10:86]制作人：周以力.[05:11:93]编曲：周以力.[05:12:73]大提琴：郎莹.[05:13:53]鼓：尹森.[05:14:43]贝斯：陈然然.[05:14:63]吉他：张凇.[05:14:80]Vocal录音室：江苏广电总台录音室.[05:15:26]乐器录音室：北京录顶技录音室.[05:15:72]乐器录音师：王晓海/鲍锐（鼓）.[05:16:22]混音工程师：鲍锐@录顶技Studio.[05:16:65]母带工程师：Friedemann Tishmeyer@Hambug Studio";
    }
    ;
    if (s == "85") {
        ly = ".[00:00:14]几个你 - 薛之谦.[00:19:38]买醉过几个夜晚 喝几杯咖啡.[00:25:03]和几个人聊天.[00:29:44]我搬过几个地址 谈几次恋爱.[00:35:14]偶尔给你邮件.[00:39:69]我听过几种音乐 配几种画面.[00:45:39]偶尔还是流泪.[00:49:89]放纵过几个黑夜 尽力的狂欢.[00:55:59]在青春快逝去.[01:02:69]车速要开到多少 往哪个方向.[01:08:49]才能追回你.[01:12:79]我去过几个城市 有几个地址.[01:18:49]仿佛能听见你.[01:22:94]为什么折磨自己 也折磨着你.[01:28:79]也许你不在意.[01:33:29]旧朋友几次提起 有你的消息.[01:38:94]说谁在照顾你.[01:45:89]我还要遇见几个你 才可以忘记你.[01:58:09]我还要拒绝几个你 才可以不想起.[02:08:14]这城市怎么都是你 可你在哪里.[02:18:48]这世界怎么都是你 原来你住在我心里.[02:39:55]车速要开到多少 往哪个方向.[02:45:50]才能追回你.[02:49:70]我去过几个城市 有几个地址.[02:55:40]仿佛能听见你.[02:59:70]为什么折磨自己 也折磨着你.[03:05:80]也许你不在.[03:10:10]旧朋友几次提起 还是你的消息.[03:15:75]说谁在陪着你.[03:19:80]我还要遇见几个你 才可以忘记你.[03:29:80]我还要拒绝几个你 才可以不想起.[03:39:85]这城市怎么都是你 可你在哪里.[03:50:06]这世界怎么都是你 原来你住在我和心里.[04:05:46]我还要遇见几个你 才可以忘记你.[04:16:61]我还要拒绝几个你 才可以不想起.[04:26:76]这城市怎么都是你 可你在哪里.[04:36:90]这世界怎么都是你 原来你住在我心里";
    }
    ;
    if (s == "86") {
        ly = ".[00:02:86]绅士 - 薛之谦.[00:03:84]作词：薛之谦 作曲：薛之谦.[00:19:41]好久没见了什么角色呢.[00:23:58]细心装扮着.[00:25:04]白色衬衫的袖扣是你送的.[00:31:98]尽量表现着像不在意的.[00:35:93]频繁暴露了自欺欺人者.[00:41:34]越掩饰越深刻.[00:44:40]你说我说听说.[00:47:52]忍着言不由衷的段落.[00:51:79]我反正决定自己难过.[01:01:61]我想摸你的头发.[01:03:38]只是简单的试探啊.[01:09:82]我想给你个拥抱.[01:11:83]像以前一样可以吗.[01:17:71]你退半步的动作认真的吗.[01:21:50]小小的动作伤害还那么大.[01:25:53]我只能扮演个绅士.[01:28:83]才能和你说说话.[01:35:38]我能送你回家吗.[01:36:94]可能外面要下雨啦.[01:43:63]我能给你个拥抱.[01:45:76]像朋友一样可以吗.[01:51:16]我忍不住从背后抱了一下.[01:55:31]尺度掌握在不能说想你啊.[01:59:12]你就当刚认识的绅士.[02:02:60]闹了个笑话吧.[02:21:60]尽量表现着善解人意的.[02:25:33]频繁暴露了不欲人知的.[02:31:26]越掩饰越深刻.[02:33:85]想说听说别说.[02:37:02]忍着言不由衷的段落.[02:41:43]我反正注定留在角落.[02:51:17]我想摸你的头发.[02:52:99]只是简单的试探啊.[02:59:35]我想给你个拥抱.[03:01:47]像以前一样可以吗.[03:07:20]你退半步的动作认真的吗.[03:11:11]小小的动作伤害还那么大.[03:15:31]我只能扮演个绅士.[03:18:51]才能和你说说话.[03:24:56]我能送你回家吗.[03:26:48]可能外面要下雨啦.[03:32:91]我能给你个拥抱.[03:35:17]像朋友一样可以吗.[03:40:80]我忍不住从背后抱了一下.[03:44:85]尺度掌握在不能说想你啊.[03:48:61]你就当刚认识的绅士.[03:52:17]闹了个笑话吧.[03:58:37]你能给我只左手.[04:00:20]牵你到马路那头吗.[04:06:84]我会像以前一样.[04:08:61]看着来往的车子啊.[04:14:55]我们的距离在眉间皱了下.[04:18:32]迅速还原成路人的样子啊.[04:22:49]越有礼貌我越害怕.[04:26:06]绅士要放得下";
    }
    ;
    if (s == "87") {
        ly = ".[00:00] 成都.[00:02] 作曲：赵雷.[00:04] 编曲：赵雷,喜子.[00:06] 演唱：赵雷.[00:08] 歌词编辑：果果.[00:10]QQ:765708831.[00:12]歌词网：http://www:lrcgc:com/.[00:14].[00:18]让我掉下眼泪的 不止昨夜的酒.[00:26]让我依依不舍的 不止你的温柔.[00:33]余路还要走多久 你攥着我的手.[00:41]让我感到为难的 是挣扎的自由.[00:50].[00:51]分别总是在九月 回忆是思念的愁.[00:59]深秋嫩绿的垂柳 亲吻着我额头.[01:07]在那座阴雨的小城里 我从未忘记你.[01:15]成都 带不走的 只有你.[01:22].[01:23]和我在成都的街头走一走.[01:32]直到所有的灯都熄灭了也不停留.[01:40]你会挽着我的衣袖 我会把手揣进裤兜.[01:48]走到玉林路的尽头 坐在小酒馆的门口.[01:58].[02:31]分别总是在九月 回忆是思念的愁.[02:39]深秋嫩绿的垂柳 亲吻着我额头.[02:47]在那座阴雨的小城里 我从未忘记你.[02:55]成都 带不走的 只有你.[03:02].[03:03]和我在成都的街头走一走.[03:11]直到所有的灯都熄灭了也不停留.[03:19]你会挽着我的衣袖 我会把手揣进裤兜.[03:27]走到玉林路的尽头 坐在小酒馆的门口.[03:36].[04:37].[03:39]和我在成都的街头走一走.[04:44].[03:47]直到所有的灯都熄灭了也不停留.[03:55]和我在成都的街头走一走.[04:03]直到所有的灯都熄灭了也不停留.[04:11]你会挽着我的衣袖 我会把手揣进裤兜.[04:19]走到玉林路的尽头 走过小酒馆的门口.[04:30].[04:52]";
    }
    ;
    if (s == "88") {
        ly = ".[00:01:03]岁月缝花(电影《小时代4：灵魂尽头》片尾曲) - 陈学冬.[00:29:56]过去 像一场大雨.[00:36:10]时间的谷底 岁月层层累积.[00:44:12]也许 不会再相遇.[00:50:95]此刻的别离 我们沉默不语.[00:58:78]不经世的我们 约好下一个路口等.[01:06:61]心跳就像秒针 敲打着倒数的青春.[01:13:45]飞不高的风筝 是年少轻狂的我们.[01:21:33]害怕孤独的人 有发烫的灵魂.[01:28:06]有些人 交错后就转身.[01:35:84]只留下背影从此不再过问.[01:42:57]风的余温.[01:45:39]盛夏的雨声像繁花缝进灵魂.[01:51:26]是谁还守着 最后一盏灯.[01:57:45]有些人 还留在原地等.[02:05:69]捧着炙热的眼泪不肯转身.[02:11:88]每道伤痕.[02:14:86]都在黑暗里拥抱孤独的灵魂.[02:21:09]这一秒 这一分 是最后的旅程.[02:52:20]不经世的我们 约好下一个路口等.[02:59:87]心跳就像秒针 敲打着倒数的青春.[03:06:80]你教会我成长 把勋章戴上我肩膀.[03:14:65]你给我的力量 让我一直闯荡.[03:25:08]有些人 还留在原地等.[03:33:03]灯光慢慢亮起也不肯起身.[03:39:44]每道伤痕.[03:42:39]都在黑暗里拥抱孤独的灵魂.[03:47:95]再等一分钟 再陪我一程.[03:54:45]而我们 是最好的我们.[04:02:52]有你在我就不怕大雨倾盆.[04:08:95]每当夜深.[04:11:96]总有记忆敲打着小小的心门.[04:18:27]你和我变成了年少时的我们";
    }
    ;
    if (s == "89") {
        ly = ".[00:00:10]童话镇-陈一发.[00:00:53]作曲 : 暗杠.[00:00:97]作词 : 竹君.[00:22:78]听说白雪公主在逃跑 .[00:26:16]小红帽在担心大灰狼.[00:29:66]听说疯帽喜欢爱丽丝 .[00:32:97]丑小鸭会变成白天鹅.[00:36:34]听说彼得潘总长不大 .[00:39:84]杰克他有竖琴和魔法.[00:43:10]听说森林里有糖果屋 .[00:46:34]灰姑娘丢了心爱的玻璃鞋.[00:50:16]只有睿智的河水知道 .[00:53:28]白雪是因为贪玩跑出了城堡.[00:56:91]小红帽有件抑制自己 .[01:00:09]变成狼的大红袍.[01:03:53]总有一条蜿蜒在童话镇里七彩的河.[01:10:66]沾染魔法的乖张气息 .[01:14:10]却又在爱里曲折.[01:17:47]川流不息扬起水花 .[01:20:53]又卷入一帘时光入水.[01:24:28]让所有很久很久以前 .[01:27:85]都走到幸福结局的时刻.[01:46:80]听说睡美人被埋藏 .[01:50:11]小人鱼在眺望金殿堂.[01:53:42]听说阿波罗变成金乌 .[01:56:92]草原有奔跑的剑齿虎.[02:00:36]听说匹诺曹总说着谎 .[02:03:80]侏儒怪拥有宝石满箱.[02:07:11]听说悬崖有颗长生树 .[02:10:48]红鞋子不知疲倦地在跳舞.[02:14:11]只有睿智的河水知道 .[02:17:36]睡美人逃避了生活的煎熬.[02:20:92]小人鱼把阳光抹成眼影 .[02:24:11]投进泡沫的怀抱.[02:27:24]总有一条蜿蜒在童话镇里七彩的河.[02:34:67]沾染魔法的乖张气息 .[02:38:05]却又在爱里曲折.[02:41:42]川流不息扬起水花 .[02:44:42]又卷入一帘时光入水.[02:48:30]让所有很久很久以前 .[02:51:86]都走到幸福结局的时刻.[02:54:98]总有一条蜿蜒在童话镇里梦幻的河.[03:02:05]分隔了理想分隔现实 .[03:05:48]又在前方的山口汇合.[03:08:92]川流不息扬起水花 .[03:11:98]又卷入一帘时光入水.[03:15:67]让所有很久很久以前 .[03:19:17]都走到幸福结局的时刻 又陌生.[03:24:49]啊~~啊~~啊~~啊~~.[04:08:10]";
    }
    ;
    if (s == "90") {
        ly = ".[00:01:25]温柔乡 - 陈雅森.[00:32:31]酒红灯绿的灿烂春光.[00:35:56]醉了多少个无知的疯狂.[00:40:08]谁都有权利做梦一场.[00:43:51]最后的结局是梦断情殇.[00:47:97]眼花缭乱的欲望天堂.[00:51:48]有多少人迷失了方向.[00:56:10]看不清那些虚伪心肠.[00:59:51]可偏偏还想尝尝爱的芬芳.[01:04:03]Wow wow wow wow.[01:08:12]不需要真相.[01:11:93]Wow wow wow wow.[01:16:28]信仰在何方.[01:20:28]你把心丢在了温柔乡.[01:23:72]整天拥抱着爱的幻想.[01:28:29]曾经的承诺当作儿戏一场.[01:32:12]所有的幸福都是你给的想象.[01:36:22]你把心丢在了温柔乡.[01:39:75]只想沉醉在花的海洋.[01:44:31]多少真爱已经悄然散场.[01:48:02]你是否还能回到当初的模样.[02:08:26]眼花缭乱的欲望天堂.[02:11:23]有多少人迷失了方向.[02:15:98]看不清那些虚伪心肠.[02:19:51]可偏偏还想尝尝爱的芬芳.[02:24:21]Wow wow wow wow.[02:28:34]不需要真相.[02:32:01]Wow wow wow wow.[02:36:29]信仰在何方.[02:40:26]你把心丢在了温柔乡.[02:43:75]整天拥抱着爱的幻想.[02:48:28]曾经的承诺当作儿戏一场.[02:52:09]所有的幸福都是你给的想象.[02:56:32]你把心丢在了温柔乡.[02:59:36]只想沉醉在花的海洋.[03:04:22]多少真爱已经悄然散场.[03:07:69]你是否还能回到当初的模样.[03:12:36]你把心丢在了温柔乡.[03:15:44]整天拥抱着爱的幻想.[03:20:20]曾经的承诺当作儿戏一场.[03:24:13]所有的幸福都是你给的想象.[03:28:37]你把心丢在了温柔乡.[03:31:46]只想沉醉在花的海洋.[03:36:00]多少真爱已经悄然散场.[03:39:75]你是否还能回到当初的模样.[03:43:95]多少真爱已经悄然散场.[03:47:73]你是否还能回到当初的模样";
    }
    ;
    if (s == "91") {
        ly = ".[00:01:75]七月上 - Jam.[00:02:68]词：Jam.[00:03:97]曲：Jam.[00:13:06]我化尘埃飞扬.[00:16:95]追寻赤裸逆翔.[00:21:00]奔去七月刑场.[00:25:02]时间烧灼滚烫.[00:28:99]回忆撕毁臆想.[00:33:19]路上行走匆忙.[00:37:15]难能可贵世上.[00:41:16]散播留香磁场.[00:48:85]我欲乘风破浪.[00:50:97]踏遍黄沙海洋.[00:53:17]与其误会一场.[00:55:44]也要不负勇往.[00:57:59]我愿你是个谎.[00:59:90]从未出现南墙.[01:01:90]笑是神的伪装.[01:04:09]笑是强忍的伤.[01:06:34]就让我走向你.[01:08:43]走向你的床.[01:10:68]就让我看见你.[01:12:79]看见你的伤.[01:14:97]我想你就站在.[01:17:21]站在大漠边疆.[01:19:32]我想你就站在.[01:21:53]站在七月上.[01:38:43]我化尘埃飞.[01:42:28]追寻赤裸逆翔.[01:46:54]奔去七月刑场.[01:50:50]时间烧灼滚烫.[01:54:70]回忆撕毁臆想.[01:58:94]路上行走匆忙.[02:03:07]难能可贵世上.[02:07:04]散播留香磁场.[02:14:74]我欲乘风破浪.[02:16:83]踏遍黄沙海洋.[02:19:08]与其误会一场.[02:21:31]也要不负勇往.[02:23:47]我愿你是个谎.[02:25:55]从未出现南墙.[02:27:74]笑是神的伪装.[02:29:95]笑是强忍的伤.[02:32:11]就让我走向你.[02:34:17]走向你的床.[02:36:38]就让我看见你.[02:38:57]看见你的伤.[02:40:79]我想你就站在.[02:42:85]站在大漠边疆.[02:44:93]我想你就站在.[02:47:09]站在七月上.[02:50:85]";
    }
    ;
    if (s == "92") {
        ly = ".[00:04:29]最美情侣 - 白小白.[00:06:38]作词：白小白.[00:08:33]作曲：白小白.[00:10:38]编曲: 曲彭涛.[00:17:34]那天你找我谈心.[00:20:91]阳光下看到你羞涩的表情.[00:25:26]并没有太多太多的话语.[00:29:60]可我已经意识到这段感情.[00:34:81]我们一起坐在咖啡厅.[00:38:35]我们一起吃你爱吃的冰淇淋.[00:42:64]我们是对方 最美的记忆.[00:46:98]你挽着我的手臂幸福的走在人群里.[00:55:80]就在一起谁让我们相遇.[01:00:13]以后的日子我们一起相依.[01:04:88]我会宠着你 我会纵容你.[01:09:20]谁要欺负你我就站出保护你.[01:13:30]就在一起一生相守不弃.[01:17:70]就在一起谁都不许说分离.[01:22:32]这段恋情 是上天给予 .[01:26:59]会让我们成为这个世界上.[01:32:89]最美的情侣.[01:38:38]你笑我陪着你笑.[01:41:56]你哭我就在你身边逗你开心.[01:46:03]如果你生气不理我.[01:50:32]我就会厚着脸皮向你贴近.[01:55:57]在这我们共同呼吸.[01:59:09]不管未来怎样都无所畏惧.[02:03:36]一辈子都说我爱你.[02:07:79]让整个城市聆听着我们幸福的声音.[02:14:39]就在一起谁让我们相遇.[02:18:68]以后的日子我们一起相依.[02:23:39]我会宠着你 我会纵容你.[02:27:74]谁要欺负你我就站出保护你.[02:31:83]就在一起一生相守不弃.[02:36:21]就在一起谁都不许说分离.[02:40:90]这段恋情  是上天给予.[02:45:14]会让我们成为这个世界上.[02:51:41]最美的情侣.[02:56:19]在一起谁让我们相遇.[03:00:10]以后的日子我们一起相依.[03:04:82]我会宠着你我会纵容你.[03:09:20]谁要欺负你我就站出保护你.[03:13:25]就在一起一生相守不弃.[03:17:65]就在一起谁都不许说分离.[03:22:22]这段恋情 是上天给予.[03:26:49]会让我们成为这个世界上.[03:32:93]最美的情侣.[03:37:41]会让我们成为这个世界上.[03:43:91]最美的情侣.[03:47:56]";
    }
    ;
    if (s == "93") {
        ly = ".[00:00:59]手放开 - 李圣杰.[00:21:63]我把自己关起来只留下一个阳台.[00:26:00]每当天黑推开城门对着夜幕发呆.[00:30:06]看着往事一幕一幕.[00:34:44]再次演出你我的爱.[00:40:89]我把电视机打开听着别人的对白.[00:45:26]也许那些故事可以给我一个交代.[00:49:33]你要的爱我学不来.[00:53:59]眼睁睁看情变坏.[00:55:67]认真真看情感慨.[00:59:54]不能给你未来我还你现在.[01:04:04]安静结束也是另一种对待.[01:08:55]当眼泪留下来.[01:10:86]伤已悄在.[01:12:49]分开也是另一种明白.[01:16:08]我给你最后的疼爱是手放开.[01:20:83]不要一张双人床中间隔着一片海.[01:25:30]感情的污点就留给时间慢慢漂白.[01:30:18]把爱收进胸前左边口袋.[01:34:47]最后的疼爱是手放开.[01:37:99]不想用言语拉扯所以选择不责怪.[01:42:55]感情就像候车月台.[01:45:01]有人走有人来.[01:47:38]我的心是一个站牌写着等待.[02:10:29]不能给你未来我还你现在.[02:14:67]安静结束也是另一种对待.[02:19:31]当眼泪留下来.[02:21:58]伤已悄在.[02:23:20]分开也是另一种明白.[02:26:76]我给你最后的疼爱是手放开.[02:31:58]不要一张双人床中间隔着一片海.[02:36:30]感情的污点就留给时间慢慢漂白.[02:40:91]把爱收进胸前左边口袋.[02:45:18]最后的疼爱是手放开.[02:48:68]不想用言语拉扯所以选择不责怪.[02:53:26]感情就像候车月台.[02:55:77]有人走有人来.[02:58:07]我的心是一个站牌写着等待.[03:06:53]最后的疼爱是手放开.[03:10:11]不要一张双人床中间隔着一片海.[03:14:67]感情的污点就留给时间慢慢漂白.[03:19:42]把爱收进胸前左边口袋.[03:23:71]最后的疼爱是手放开.[03:27:29]不想用言语拉扯所以选择不责怪.[03:31:80]感情就像候车月台.[03:34:23]有人走有人来.[03:36:55]我的心是一个站牌写着等待.[03:45:32]我把收音机打开听着别人的失败.[03:49:51]哽咽的声音仿佛诉说着相同悲哀.[03:53:53]你的依赖还在胸怀.[03:57:90]我无法轻易推开.[04:00:09]我无法随便走开.[04:03:82]感情中专心的人容易被伤害";
    }
    ;
    if (s == "94") {
        ly = ".[00:00:40]痴心绝对-(电视剧《爱上痞子男》片头曲)	 - 李圣杰.[00:18:13]想用一杯Latte把你灌醉.[00:22:63]好让你能多爱我一点.[00:27:03]暗恋的滋味你不懂这种感觉.[00:31:82]早有人陪的你永远不会.[00:38:35]看见你和他在我面前.[00:42:82]证明我的爱只是愚昧.[00:47:29]你不懂我的 那些憔悴.[00:51:83]是你永远不曾过的体会.[00:58:53]为你付出那种伤心你永远不了解.[01:02:79]我又何苦勉强自己爱上你的一切.[01:07:29]你又狠狠逼退 我的防备.[01:12:06]静静关上门来默数我的泪.[01:16:35]明知道让你离开他的世界不可能会.[01:20:75]我还傻傻等到奇迹出现的那一天.[01:25:27]直到那一天 你会发现.[01:30:05]真正爱你的人独自守着伤悲.[02:10:53]看见你和他在我面前.[02:14:93]证明我的爱只是愚昧.[02:19:63]你不懂我的 那些憔悴.[02:24:03]是你永远不曾过的体会.[02:30:32]明知道让你离开他的世界不可能会.[02:35:28]我还傻傻等到奇迹出现的那一天.[02:39:76]直到那一天 你会发现.[02:44:27]真正爱你的人独自守着伤悲.[02:53:32]曾经我以为我自己会后悔.[02:57:69]不想爱得太多痴心绝对.[03:02:23]为你落第一滴泪.[03:04:12]为你作任何改变.[03:06:44]也唤不回你对我的坚决.[03:13:46]为你付出那种伤心你永远不了解.[03:17:69]我又何苦勉强自己爱上你的一切.[03:22:46]你又狠狠逼退 我的防备.[03:26:88]静静关上门来默数我的泪.[03:31:15]明知道让你离开他的世界不可能会.[03:35:66]我还傻傻等到奇迹出现的那一天.[03:40:18]直到那一天 你会发现.[03:44:90]真正爱你的人独自守着伤悲.[03:53:90]直到那一天 你会发现.[03:58:89]真正爱你的人独自守着伤悲";
    }
    ;
    if (s == "95") {
        ly = ".[00:01:03]年少有你 - 李易峰.[00:06:09]词：好妹妹乐队.[00:07:70]曲：好妹妹乐队.[00:28:81]时常会想起那年斑驳的课桌.[00:35:96]发呆时总望着你的轮廓.[00:42:48]你也许不知道那时小小的我.[00:49:25]年少的秘密藏在心中的角落.[00:56:44]路口等着你有我和我的单车.[01:03:35]微凉的傍晚有你陪着我.[01:10:20]晚霞再美不及你眼眸的颜色.[01:16:63]没有说再见 离别总是沉默.[01:27:38]是否 你也会偶尔想起我.[01:33:76]像我时常也把往事轻轻诉说.[01:40:38]我们在春风秋雨里无话不说.[01:47:56]却在春去秋来中失去了联络.[01:54:46]是否 你也会偶尔想起我.[02:01:21]还是你在过着与我无关的生活.[02:08:28]幸好彼此的青春都没有错过.[02:15:00]我的年少有你 你的青春有我.[02:46:10]路口等着你有我和我的单车.[02:52:83]微凉的傍晚有你陪着我.[02:59:80]晚霞再美不及你眼眸的颜色.[03:06:34]没有说再见 离别总是沉默.[03:13:57]是否 你也会偶尔想起我.[03:19:83]像我时常也把心事轻轻诉说.[03:27:17]我们在春风秋雨里无话不说.[03:33:77]却在春去秋来中失去了联络.[03:41:11]是否 你也会偶尔想起我.[03:47:46]还是你在过着与我无关的生活.[03:54:60]幸好彼此的青春都没有错过.[04:01:23]我的年少有你 你的青春有我.[04:08:06]我的年少有你 你的青春有我.[04:17:06]";
    }
    ;
    if (s == "96") {
        ly = ".[00:00:85]拯救(《拿什么拯救你，我的爱人》片尾曲) - 孙楠 .[00:48:19]灯火辉煌的街头.[00:54:25]突然袭来了一阵寒流.[01:00:15]遥远的温柔.[01:02:95]解不了近愁.[01:05:41]是否在随波逐流.[01:11:66]夜深人静的时候.[01:17:57]我就潜伏在你的伤口.[01:23:37]梦是氢气球.[01:26:37]向天外飞走 最后.[01:30:67]都化作乌有.[01:35:08]一个人在梦游.[01:38:13]像奔跑的犀牛.[01:41:03]不到最后不罢休.[01:46:88]爱若需要厮守.[01:49:78]恨更需要自由.[01:53:24]爱与恨纠缠不休.[01:59:24]我拿什么拯救.[02:05:05]当爱覆水难收.[02:10:85]谁能把谁保佑.[02:14:90]心愿为谁等待.[02:22:65]我拿什么拯救.[02:28:57]情能见血封喉.[02:34:48]谁能把谁保佑.[02:38:34]能让爱永不朽.[03:34:82]夜深人静的时候.[03:40:62]我就潜伏在你的伤口.[03:46:53]梦是氢气球.[03:49:43]向天外飞走 最后.[03:53:75]都化作乌有.[03:58:10]一个人在梦游.[04:01:10]像奔跑的犀牛.[04:05:09]不到最后不罢休.[04:10:19]爱若需要厮守.[04:13:15]恨更需要自由.[04:16:69]爱与恨纠缠不休.[04:22:66]我拿什么拯救.[04:28:46]当爱覆水难收.[04:34:37]谁能把谁保佑.[04:38:40]心愿为谁等待.[04:46:15]我拿什么拯救.[04:51:96]情能见血封喉.[04:57:81]谁能把谁保佑.[05:01:87]能让爱永不朽";
    }
    ;
    if (s == "97") {
        ly = ".[00:00:02]假装 - 陈雪凝.[00:01:62]红了樱桃 绿了芭蕉.[00:06:86]你走你的独木桥 我唱我调.[00:12:22]谁的孤独它像似把刀.[00:17:22]杀了我的外婆桥.[00:22:06]别再犯傻 再剪短发.[00:27:06]你送的鞋子合脚它又怎会掉.[00:32:51]谁的无情它像似毒药.[00:37:18]喝下不煎熬.[00:43:90]我想留在你的身边.[00:48:91]深情款款多么可怜.[00:53:85]你无辜的像演员.[00:58:71]边说边声泪俱下表现.[01:04:09]故事开始总是很甜.[01:09:00]岁月流逝人心转变.[01:14:07]这是最后一支烟.[01:18:90]你信誓旦旦说着谎言.[01:24:88]红了樱桃 绿了芭蕉.[01:30:33]你走你的独木桥 我唱我调.[01:35:46]谁的孤独它像似把刀.[01:40:70]杀了我的外婆桥.[01:45:38]别再犯傻 再剪短发.[01:50:51]你送的鞋子合脚它又怎会掉.[01:55:87]谁的无情它像似毒药.[02:00:56]喝下不煎熬.[02:17:22]在我身后开了一枪.[02:22:37]鲜血淋漓渲染了墙.[02:27:38]用最后一丝余光.[02:32:19]我已释然你何必假装.[02:39:40]红了樱桃 绿了芭蕉.[02:44:99]你走你的独木桥 我唱我调.[02:50:21]谁的孤独它像似把刀.[02:55:13]杀了我的外婆桥.[02:59:90]别再犯傻 再剪短发.[03:05:20]你送的鞋子合脚它又怎会掉.[03:10:34]谁的无情它像似毒药.[03:15:12]喝下不煎熬.[03:20:37]当初炽热的心已凉.[03:25:67]一朝一夕笑我痴狂.[03:30:62]所有苦痛我一人扛 假装坚强.[03:40:56]你难过的 太假装.[03:45:65]你凭什么念念不忘.[03:50:81]人一定要学会成长.[03:59:34]别再犯傻 再剪短发.[04:04:41]你送的鞋子合脚它又怎会掉.[04:09:66]谁的无情它像似毒药.[04:14:43]喝下不煎熬";
    }
    ;
    if (s == "98") {
        ly = ".[00:00:66]Clsr(Aash Mehta Flip) - Aash Mehta&The Chainsmokers	.[00:48:49].[00:48:49]Hey I was doing just fine before I met you.[00:52:22]嘿遇到你之前我一切安好.[00:52:22]I drink too much and that's an issue but I'm okay.[00:57:96]虽酩酊大醉看上去一团糟但我感觉很好.[00:57:96]Hey you tell your friends it was nice to meet them.[01:02:05]嘿告诉你的朋友很高兴和他们相遇.[01:02:05]But I hope I never see them again.[01:08:19]但我希望再也看不到他们的身影.[01:08:19]I know it breaks your heart.[01:09:99]我知道这会伤了你的心.[01:09:99]Moved to the city in a broke down car.[01:13:15]驾着一辆破汽车驶向一座陌生的城市.[01:13:15]And four years no calls.[01:14:72]一去四年杳无音讯.[01:14:72]Now you're looking pretty in a hotel bar.[01:17:17]现在你的美貌闪耀在酒吧的聚光灯下.[01:17:17]And I can't stop no I can't stop.[01:26:36]我忍俊不禁浮想联翩.[01:26:36]So baby pull me closer in the backseat of your rover.[01:30:96]宝贝同我咫尺之遥在你后座上耳语呢喃如胶似漆.[01:30:96]That I know you can't afford.[01:33:18]缠绵于这辆永远付不起的路虎车上.[01:33:18]Bite that tattoo on your shoulder.[01:35:68]让我的舌尖滑过你肩上的纹身.[01:35:68]Pull the sheets right off the corner.[01:38:02]迫不及待的推开车里的钢板.[01:38:02]Of the mattress that you stole.[01:40:41]放上舒适的床垫让你我共缠绵.[01:40:41]From your roommate back in Boulder.[01:42:70]那张你从博尔德的室友那偷来的床垫.[01:42:70]We ain't ever getting older.[02:05:17]今夜我们激情永葆.[02:05:17]You look as good as the day I met you.[02:09:25]回首过去我遇到你的那日多美好.[02:09:25]I forget just why I left you I was insane.[02:14:72]我也忘记我为何离你而去大概是脑子一热.[02:14:72]Stay and play that Blink-182 song.[02:18:81]彻夜未眠放着Blink-182乐队的歌.[02:18:81]That we beat to death in Tucson okay.[02:25:17]那曲我们曾在图森恣意敲打的节奏.[02:25:17]I know it breaks your heart.[02:26:75]我知道这会伤了你的心.[02:26:75]Moved to the city in a broke down car.[02:28:95]驾着一辆破汽车驶向一座陌生的城市.[02:28:95]And four years no calls.[02:31:49]一去四年杳无音讯.[02:31:49]Now I'm looking pretty in a hotel bar.[02:33:38]现在我的闪耀在酒吧的聚光灯下.[02:33:38]And I can't stop.[02:38:51]我忍俊不禁.[02:38:51]No I can't stop.[02:43:25]浮想联翩.[02:43:25]So baby pull me closer in the backseat of your rover.[02:47:74]宝贝同我咫尺之遥在你后座上耳语呢喃如胶似漆.[02:47:74]That I know you can't afford.[02:50:11]缠绵于这辆永远付不起的路虎车上.[02:50:11]Bite that tattoo on your shoulder.[02:52:41]让我的舌尖滑过你肩上的纹身.[02:52:41]Pull the sheets right off the corner.[02:54:89]迫不及待的推开车里的钢板.[02:54:89]Of the mattress that you stole.[02:57:10]放上舒适的床垫让你我共缠绵.[02:57:10]From your roommate back in Boulder.[02:59:55]那张你从博尔德的室友那偷来的床垫.[02:59:55]We ain't ever getting older.[03:22:12]今夜我们激情永葆.[03:22:12]Baby pull me closer in the backseat of your rover.[03:26:13]宝贝同我咫尺之遥在你后座上耳语呢喃如胶似漆.[03:26:13]That I know you can't afford.[03:28:37]缠绵于这辆永远付不起的路虎车上.[03:28:37]Bite that tattoo on your shoulder.[03:30:83]让我的舌尖滑过你肩上的纹身.[03:30:83]Pull the sheets right off the corner.[03:33:20]迫不及待的推开车里的钢板.[03:33:20]Of the mattress that you stole.[03:35:65]放上舒适的床垫让你我共缠绵.[03:35:65]From your roommate back in Boulder.[03:38:04]那张你从博尔德的室友那偷来的床垫.[03:38:04]We ain't ever getting older.[03:40:73]今夜我们激情永葆.[03:40:73]We ain't ever getting older no we ain't ever getting older.[03:45:11]我们的青春永不褪色.[03:45:11]We ain't ever getting older no we ain't ever getting older.[03:49:94]我们的青春永不褪色.[03:49:94]We ain't ever getting older we ain't ever getting older.[03:54:72]我们的青春永不褪色.[03:54:72]We ain't ever getting older no we ain't ever getting older.[04:01:72]我们的青春永不褪色.[04:01:72]";
    }
    ;
    if (s == "99") {
        ly = ".[00:00:65]Hymn For The Weekend(Remix) - Alan Walker&Coldplay.[00:01:01].[00:01:01]I, oh I, oh I.[00:05:93]我:::我:::我:::.[00:05:93]I, so high, so high.[00:09:04]如同在九重云霄.[00:09:04]Oh, angel sent from up above.[00:13:81]你如同天仙下凡般.[00:13:81]You know you make my world light up.[00:19:00]我的世界因你而熠熠生辉.[00:19:00]When I was down, when I was hurt.[00:23:94]当我落魄，千疮百孔.[00:23:94]You came to lift me up.[00:29:15]你令我重新振作.[00:29:15]Life is a drink, and love's a drug.[00:33:92]生活令人迷醉，爱情令人沉醉.[00:33:92]Oh, now I think I must be miles up.[00:38:99]噢，我想我现在已迷茫不已.[00:38:99]When I was a river, dried up.[00:44:24]当我如同河流，干涸枯竭时.[00:44:24]You came to rain a flood.[00:49:98]你为我降下甘霖.[00:49:98]I, oh, I, oh.[00:53:66]我:::我:::我:::.[00:53:66]Got me feeling drunk and high.[00:55:92]我如痴如醉，畅快淋漓.[00:55:92]So high, so high.[00:59:60]如同在九重云霄.[00:59:60]I, oh, I, oh, I, oh.[01:03:71]我:::我:::我:::.[01:03:71]Now I'm feeling drunk and high.[01:05:80]我如痴如醉，畅快淋漓.[01:05:80]So high, so high.[01:31:53]如同在九重云霄.[01:31:53]Oh, angel sent from up above.[01:36:31]你如同天仙下凡般.[01:36:31]I feel it coursing through my blood.[01:41:52]我感觉全身血液沸腾.[01:41:52]Life is a drink, your love's about.[01:46:42]生活令人迷醉，而你的爱.[01:46:42]To make the stars come out.[01:51:77]使得天上繁星闪烁.[01:51:77]Drink from me, drink from me.[01:56:67]在这仙乐之中.[01:56:67]Pour on a symphony.[01:59:78]与我共进一杯吧.[01:59:78]When I'm low, low, low, low.[02:02:56]当我低落之时.[02:02:56]I, oh I, oh I.[02:06:01]我:::我:::我:::.[02:06:01]Got me feeling drunk and high.[02:08:37]如痴如醉，畅快淋漓.[02:08:37]So high, so high.[02:12:02]如同在九重云霄.[02:12:02]Oh I, oh I, oh I.[02:15:98]我:::我:::我:::.[02:15:98]I'm feeling drunk and high.[02:18:35]我如痴如醉，畅快淋漓.[02:18:35]So high, so high.[02:27:61]如同在九重云霄.[02:27:61]I, oh I, oh I.[02:44:97]我:::我:::我:::.[02:44:97]I, oh I, oh I.[02:48:29]我:::我:::我:::.[02:48:29]La la la la la la la.[02:50:75]啦啦啦 啦啦 啦啦.[02:50:75]So high, so high.[02:54:96]如同在九重云霄.[02:54:96]I, oh I, oh I.[02:58:20]我:::我:::我:::.[02:58:20]I'm feeling drunk and high.[03:00:68]我如痴如醉，畅快淋漓.[03:00:68]So high, so high.[03:03:55]如同在九重云霄.[03:03:55]Then we'll shoot across the sky.[03:08:26]我们如同流星般，划过天际.[03:08:26]Then we'll shoot across the:::.[03:13:36]我们如同流星一般.[03:13:36]Then we'll shoot across the sky.[03:18:20]我们如同流星般，划过天际.[03:18:20]Then we'll shoot across the:::.[03:23:51]我们如同流星一般.[03:23:51]Then we'll shoot across the sky.[03:28:40]我们如同流星般，划过天际.[03:28:40]Then we'll shoot across the:::.[03:33:20]我们如同流星一般.[03:33:20]Then we'll shoot across the sky.[03:38:33]我们如同流星般，划过天际.[03:38:33]Then we'll shoot across the:::.[03:42:23]我们如同流星一般.[03:42:23]";
    }
    ;
    if (s == "100") {
        ly = ".[00:01:86]盗心贼 - 黑龙.[00:03:33]词：邢榕.[00:04:29]曲：高进.[00:04:97]编曲：张亮.[00:06:18]录音：侯春阳.[00:07:70]混音：侯春阳.[00:26:78]像心里有鬼 这一个轮回.[00:31:20]我知道再也不能心如止水.[00:35:25]爱情的心事 幸福而憔悴.[00:39:53]有几人能逃过这大喜大悲.[00:43:75]长天和秋水 明媚的花蕊.[00:48:12]连擦肩而过都像一场宿醉.[00:52:42]你一颦一笑 荡漾几多回.[00:56:57]整个世界都被你占领心扉.[01:00:85]哦 你就这样来了.[01:02:42]盗心的贼.[01:05:13]突然袭来就让我没有防备.[01:09:32]我的心被你掏了无怨无悔.[01:13:14]谁能够体会.[01:17:78]哦 你就这样来了.[01:19:38]盗心的贼.[01:22:01]我的一腔热血就化作眼泪.[01:26:27]不要再让我悲伤 如痴如醉.[01:30:40]再爱一回.[01:34:79]长天和秋水 明媚的花蕊.[01:39:09]连擦肩而过都像一场宿醉.[01:43:32]你一颦一笑 荡漾几多回.[01:47:51]整个世界都被你占领心扉.[01:51:64]哦 你就这样来了.[01:53:41]盗心的贼.[01:56:06]突然袭来就让我没有防备.[02:00:32]我的心被你掏了无怨无悔.[02:04:11]谁能够体会.[02:08:84]哦 你就这样来了.[02:10:32]盗心的贼.[02:13:00]我的一腔热血就化作眼泪.[02:17:30]不要再让我悲伤 如痴如醉.[02:21:40]再爱一回.[02:42:77]哦 你就这样来了.[02:44:36]盗心的贼.[02:46:92]突然袭来就让我没有防备.[02:51:17]我的心被你掏了无怨无悔.[02:54:94]谁能够体会.[02:59:85]哦 你就这样来了.[03:01:36]盗心的贼.[03:03:98]我的一腔热血就化作眼泪.[03:08:23]不要再让我悲伤 如痴如醉.[03:12:13]再爱一回.[03:16:74]不要再让我悲伤 如痴如醉.[03:20:71]再爱一回";
    }
    ;
    if (s == "101") {
        ly = ".[00:01:76]岁月神偷 (Demo) - 金玟岐.[00:19:12]能够握紧的就别放了.[00:23:18]能够拥抱的就别拉扯.[00:27:27]时间着急的 冲刷着.[00:31:66]剩下了什么.[00:35:16]原谅走过的那些曲折.[00:39:32]原来留下的都是真的.[00:43:32]纵然似梦啊 半醒着.[00:47:65]笑着哭着都快活.[00:51:70]谁让.[00:54:73]时间是让人猝不及防的东西.[00:58:99]晴时有风阴有时雨.[01:02:87]争不过朝夕 又念着往昔.[01:07:16]偷走了青丝却留住一个你.[01:11:03]岁月是一场有去无回的旅行.[01:15:04]好的坏的都是风景.[01:18:91]别怪我贪心 只是不愿醒.[01:23:00]因为你只为你愿和我一起.[01:26:86]看云淡风轻.[01:43:03]时间是让人猝不及防的东西.[01:46:90]晴时有风阴有时雨.[01:50:67]争不过朝夕 又念着往昔.[01:54:90]偷走了青丝却留住一个你.[01:59:00]岁月是一场有去无回的旅行.[02:02:99]好的坏的都是风景.[02:06:81]别怪我贪心 只是不愿醒.[02:10:85]因为你只为你愿和我一起.[02:16:48]看云淡风轻.[02:20:48]";
    }
    ;
    if (s == "102") {
        ly = "本音乐暂无歌词";
    }
    ;
    if (s == "103") {
        ly = ".[00:00:00]I am you.[00:00:34]La di da di da da.[00:04:17]拉迪哒迪哒哒.[00:04:17]La di da di da da.[00:08:29]拉迪哒迪哒哒.[00:08:29]La di da di da da.[00:12:31]拉迪哒迪哒哒.[00:12:31]La da da.[00:16:74]拉哒哒.[00:16:74]I am tied by truth like an anchor.[00:25:86]我被像锚一样的真相束缚.[00:25:86]Anchored to a bottomless sea.[00:32:81]牢牢地扎在在无边无际的海洋.[00:32:81]I am floating freely in the heavens.[00:42:11]我自由自在地游走在天上.[00:42:11]Held in by your heart's gravity.[00:49:36]被你深深吸引着.[00:49:36]All because of love.[00:53:30]这一切都是因为爱.[00:53:30]All because of love.[00:57:64]这一切都是因为爱.[00:57:64]Even though sometimes you don't know who I am.[01:05:65]虽然有时你不知道我是谁.[01:05:65]I am you, everything you do.[01:13:75]我就是你，你做的一切.[01:13:75]Anything you say, you want me to be.[01:21:63]你说的任何话语，你想我成为什么样的人.[01:21:63]You're me with your arms on a chain.[01:30:00]你就是我，你的手被链条束缚着.[01:30:00]Linked eternally in what we can't undo.[01:37:80]永远地系在一起，我们都无法解开.[01:37:80]And I am you.[01:42:01]我就是你.[01:42:01]La di da di da da.[01:46:04]拉迪哒迪哒哒.[01:46:04]La di da di da da.[01:50:08]拉迪哒迪哒哒.[01:50:08]La da da.[01:54:15]拉哒哒.[01:54:15]All my senses awaken to the changes.[02:02:72]我察觉到了那些变化.[02:02:72]And I feel alive inside my own skin.[02:10:55]我感到全身充满了活力.[02:10:55]All my reasons tell me just how strange it is.[02:18:73]我的理智告诉我那有多么地奇怪.[02:18:73]Coming home to a place I've always been.[02:26:96]回家了，回到那个其实我一直都在的地方.[02:26:96]And it's all for love.[02:30:71]这都是为了爱.[02:30:71]And it's all for love.[02:35:01]这都是为了爱.[02:35:01]Even though sometimes, I don't know who I am.[02:42:75]尽管有时候我不知道我是谁.[02:42:75]I am you, everything you do.[02:51:13]我是你，你做的一切.[02:51:13]Anything you say, you want me to be.[02:58:76]你说的任何话语，你想我成为什么样的人.[02:58:76]You're me with your arms on a chain.[03:07:33]你和我，我们的手在一条链上.[03:07:33]Linked eternally in what we can't undo.[03:15:36]永远地系在一起，我们都无法解开.[03:15:36]I'm you.[03:19:44]我是你.[03:19:44]La di da di da da.[03:23:19]拉迪哒迪哒哒.[03:23:19]La di da di da da.[03:27:46]拉迪哒迪哒哒.[03:27:46]La da da.[03:31:26]拉哒哒.[03:31:26]La di da di da da.[03:35:35]拉迪哒迪哒哒.[03:35:35]La di da di da da.[03:39:18]拉迪哒迪哒哒.[03:39:18]La di da di da da.[03:43:25]拉迪哒迪哒哒.[03:43:25]La da da.[03:46:06]拉哒哒.[03:46:06]";
    }
    ;
    if (s == "104") {
        ly = ".[00:00:42]Dream it Possible - 张靓颖.[00:02:21] .[00:02:21]词：Andy Love.[00:02:93] .[00:02:93]曲：Andy Love.[00:08:24] .[00:08:24]I will run I will climb I will soar.[00:12:31]我奔跑 我登攀 我要展翅翱翔.[00:12:31]I'm undefeated.[00:16:30]我所向披靡.[00:16:30]Jumping out of my skin pull the chord.[00:20:64]挣脱自我的桎梏 拨动琴弦.[00:20:64]Yeah I believe it.[00:23:61]是啊 我坚信.[00:23:61]The past is everything we were don't make us who we are.[00:31:41]历史决定曾经 但并不能决定现在的你我.[00:31:41]So I'll dream until I make it real and all I see is stars.[00:38:81]所以我会不懈梦想直到梦成真 直到窥见漫天星光.[00:38:81]It's not until you fall that you fly.[00:43:44]不再畏惧跌倒 直到你展翅高飞的那一刻.[00:43:44]When your dreams come alive you're unstoppable.[00:47:04]当梦想成真 你便无可阻挡.[00:47:04]Take a shot chase the sun find the beautiful.[00:51:14]挥舞双翅 追随阳光 找寻美好.[00:51:14]We will glow in the dark turning dust to gold.[00:55:24]我们会在黑暗中耀发光芒 点石成金.[00:55:24]And we'll dream it possible.[01:06:75]我们期盼梦想成真.[01:06:75]Possible.[01:16:32]梦想成真.[01:16:32]I will chase I will reach I will fly.[01:20:68]我追随 我向前 我会展翅翱翔.[01:20:68]Until I'm breaking until I'm breaking.[01:24:45]直到跌倒 直到毁灭的那一刻.[01:24:45]Out of my cage like a bird in the night.[01:28:51]走出自我的牢笼 像黑夜中自由高飞的鸟儿般.[01:28:51]I know I'm changing I know I'm changing.[01:32:76]我知道我在蜕变 在蜕变.[01:32:76]In into something big better than before.[01:39:36]变得未曾有过的强大.[01:39:36]And if it takes takes a thousand lives.[01:42:73]如果需要牺牲成千上万条性命.[01:42:73]Then it's worth fighting for.[01:47:01]那这更值得去不懈奋斗.[01:47:01]It's not until you fall that you fly.[01:51:53]不再畏惧跌倒 直到你展翅高飞的那一刻.[01:51:53]When your dreams come alive you're unstoppable.[01:54:99]当梦想成真 你便无可阻挡.[01:54:99]Take a shot chase the sun find the beautiful.[01:59:12]挥舞双翅 追随阳光 寻找美好.[01:59:12]We will glow in the dark turning dust to gold.[02:03:51]我们会在黑暗中耀发光芒 点石成金.[02:03:51]And we'll dream it possible possible possible possible.[02:23:87]我们期盼梦想成真 梦想成真.[02:23:87]From the bottom to the top.[02:26:18]从低谷到巅峰.[02:26:18]We're sparking wild fire's.[02:27:91]我们犹如燎燃的野火.[02:27:91]Never quit and never stop.[02:29:97]决不放弃 永不退缩.[02:29:97]The rest of our lives.[02:31:94]穷尽余生 不懈奋斗.[02:31:94]From the bottom to the top.[02:33:91]从低谷到巅峰.[02:33:91]We're sparking wild fire's.[02:35:95]我们犹如燎燃的野火.[02:35:95]Never quit and never stop.[02:38:96]决不放弃 永不退缩.[02:38:96]It's not until you fall that you fly.[02:45:46]不再畏惧跌倒 直到你展翅高飞的那一刻.[02:45:46]When your dreams come alive you're unstoppable.[02:49:05]当梦想成真 你便无可阻挡.[02:49:05]Take a shot chase the sun find the beautiful.[02:53:12]挥舞双翅 追随阳光 寻找美好.[02:53:12]We will glow in the dark turning dust to gold.[02:57:19]我们会在黑暗中耀发光芒 点石成金.[02:57:19]And we'll dream it possible.[03:05:04]我们期盼梦想成真.[03:05:04]Possible possible possible.[03:13:77]梦想成真 梦想成真 梦想成真.[03:13:77]We'll dream it possible.[03:18:69]我们期盼梦想成真.[03:18:69]";
    }
    ;
    if (s > 104) {
        ly = "[00:00] 翻唱音乐,暂无歌词";
    }
    ;

    return ly;
}

function show(t)//显示歌词
{
    var div1 = document.getElementById("lyr");//取得层
    document.getElementById("lyr").innerHTML = " ";//每次调用清空以前的一次
    if (t < lytime[lytime.length - 1])//先舍弃数组的最后一个
    {
        for (var k = 0; k < lytext.length; k++) {
            if (lytime[k] <= t && t < lytime[k + 1]) {
                scrollh = k * 25;//让当前的滚动条的顶部改变一行的高度
                div1.innerHTML += "<font color=#fa3b4a style=font-weight:bold>" + lytext[k] + "</font><br>";
            }
            else if (t < lytime[lytime.length - 1])//数组的最后一个要舍弃
                div1.innerHTML += lytext[k] + "<br>";
        }
    }
    else//加上数组的最后一个
    {
        for (var j = 0; j < lytext.length - 1; j++)
            div1.innerHTML += lytext[j] + "<br>";
        div1.innerHTML += "<font  color=#fa3b4a style=font-weight:bold>" + lytext[lytext.length - 1] + "</font><br>";
    }
}

function scrollBar()//设置滚动条的滚动
{
    if (document.getElementById("lyr").scrollTop <= scrollh)
        document.getElementById("lyr").scrollTop += 1;
    if (document.getElementById("lyr").scrollTop >= scrollh + 50)
        document.getElementById("lyr").scrollTop -= 1;
    window.setTimeout("scrollBar()", delay);
}

function getReady(s)//在显示歌词前做好准备工作
{
    var ly = getLy(s);//得到歌词
    //alert(ly);
    // lytext.length=0;
    // lytime.length=0;
    // lytext = new Array();
    // lytime = new Array();
    if (ly == "" || ly == null || typeof(ly) == "undefined") {
        $("#lry").html("本歌暂无歌词！");
    }
    ;
    var arrly = ly.split(".");//转化成数组
    //alert(arrly[1]);
    tflag = 0;
    for (var i = 0; i < lytext.length; i++) {
        lytext[i] = "";
    }
    for (var i = 0; i < lytime.length; i++) {
        lytime[i] = "";
    }
    $("#lry").html(" ");
    document.getElementById("lyr").scrollTop = 0;
    for (var i = 0; i < arrly.length; i++)
        sToArray(arrly[i]);
    // alert(lytext[2]);
    // alert(lytime[2]);
    sortAr();
    //$("#lyr").html("");
    // for(var j=0;j<lytext.length;j++)
    //   {
    //      document.getElementById("lyr").innerHTML+=lytime[j]+lytext[j]+"<br>";
    //   }
    scrollBar();
}

function sToArray(str)//解析如“[02:02][00:24]没想到是你”的字符串前放入数组
{

    var left = 0;//"["的个数
    var leftAr = new Array();
    for (var k = 0; k < str.length; k++) {
        if (str.charAt(k) == "[") {
            leftAr[left] = k;
            left++;
        }
    }
    if (left != 0) {
        for (var i = 0; i < leftAr.length; i++) {
            lytext[tflag] = str.substring(str.lastIndexOf("]") + 1);//放歌词
            lytime[tflag] = conSeconds(str.substring(leftAr[i] + 1, leftAr[i] + 6));//放时间
            tflag++;
        }
    }
    //alert(str.substring(leftAr[0]+1,leftAr[0]+6));
}

function sortAr()//按时间重新排序时间和歌词的数组
{
    var temp = null;
    var temp1 = null;
    for (var k = 0; k < lytime.length; k++) {
        for (var j = 0; j < lytime.length - k; j++) {
            if (lytime[j] > lytime[j + 1]) {
                temp = lytime[j];
                temp1 = lytext[j];
                lytime[j] = lytime[j + 1];
                lytext[j] = lytext[j + 1];
                lytime[j + 1] = temp;
                lytext[j + 1] = temp1;
            }
        }
    }
}

function conSeconds(t)//把形如：01：25的时间转化成秒；
{
    var m = t.substring(0, t.indexOf(":"));
    var s = t.substring(t.indexOf(":") + 1);
    m = parseInt(m.replace(/0/, ""));
    //if(isNaN(s)) s=0;
    var totalt = parseInt(m) * 60 + parseInt(s);
    //alert
    // (parseInt(s.replace(//b(0+)/gi,"")));
    //if(isNaN(totalt))  return 0;

    return totalt;
}

// function getSeconds()//得到当前播放器播放位置的时间
// { var t=getPosition(); t=t.toString();//数字转换成字符串
//  var s=t.substring(0,t.lastIndexOf("."));//得到当前的秒
//  //alert(s);
//  return s;
//  }
//  function getPosition()//返回当前播放的时间位置
//   { var mm=document.getElementById("MediaPlayer1");
//    //var mmt=;
//    //alert(mmt);
//    return mm.CurrentPosition;
// }
function mPlay()//开始播放
{
    // var ms=parseInt(getSeconds());
    // if(isNaN(ms)) show(0);
    // else show(ms);
    var ms = audio.currentTime;
    show(ms);
    window.setTimeout("mPlay()", 100)
}

function fPlay(songIndex) {
    $(".start em[sonN=" + songIndex + "]").click();
}

// window.setTimeout("mPlay()",100);
// window.setTimeout("getReady()",100);
// function test()//测试使用，
// { 
// 	alert(lytime[lytime.length-1]); 
// }

// [00:00]漂洋过海来看你 .[00:04]演唱：刘明湘 .[00:08]作词：李宗盛 .[00:12]作曲：李宗盛 .[00:18]为你 我用了半年的积蓄 .[00:21]飘洋过海的来看你 .[00:26]为了这次相聚 .[00:28]我连见面时的呼吸 都曾反复练习 .[00:33] .[00:35]言语从来没能将我的情意 .[00:38]表达千万分之一 .[00:43]为了这个遗憾 我在夜里想了又想 .[00:48]不肯睡去 .[00:51] .[00:52]记忆它总是慢慢的累积 .[00:56]在我心中无法抹去 .[01:00]为了你的承诺 .[01:02]我在最绝望的时候 都忍着不哭泣 .[01:08] .[01:11]陌生的城市啊 熟悉的角落里 .[01:19]也曾彼此安慰 也曾相拥叹息 .[01:23]不管将会面对什么样的结局 .[01:27] .[01:28]在漫天风沙里望着你远去 .[01:31]我竟悲伤的不能自已 .[01:36]多盼能送君千里 直到山穷水尽 .[01:40]一生和你相依 .[01:44] .[02:03]陌生的城市啊 熟悉的角落里 .[02:12]也曾彼此安慰 也曾相拥叹息 .[02:16]不管将会面对什么样的结局 .[02:20] .[02:20]在漫天风沙里望着你远去 .[02:24]我竟悲伤的不能自已 .[02:28]多盼能送君千里 直到山穷水尽 .[02:33]一生和你相依 .[02:36] .[02:39]多盼能送君千里 直到山穷水尽 .[02:47]一生和你相依 .[02:55] 
//[00:00] 漂洋过海来看你.[00:02] 演唱：刘明湘.[00:04] 词曲：李宗盛.[00:08] 歌词编辑：丁仔.[00:15] 中文歌词库 www.dingzai.com.[00:21] 为你我用了半年的积蓄.[00:24] 飘洋过海的来看你.[00:29] 为了这次相聚.[00:31] 我连见面时的呼吸 都曾反复练习.[00:36] .[00:38] 言语从来没能将我的情意.[00:42] 表达千万分之一.[00:47] 为了这个遗憾 我在夜里想了又想.[00:51] 不肯睡去.[00:54] .[00:55] 记忆它总是慢慢的累积.[00:59] 在我心中无法抹去.[01:04] 为了你的承诺.[01:05] 我在最绝望的时候 都忍着不哭泣.[01:13] .[01:14] 陌生的城市啊 熟悉的角落里.[01:23] 也曾彼此安慰 也曾相拥叹息.[01:26] 不管将会面对什么样的结局.[01:30] .[01:31] 在漫天风沙里望着你远去.[01:35] 我竟悲伤的不能自已.[01:39] 多盼能送君千里 直到山穷水尽.[01:44] 一生和你相依.[01:49] .[02:07] 陌生的城市啊 熟悉的角落里.[02:15] 也曾彼此安慰 也曾相拥叹息.[02:19] 不管将会面对什么样的结局.[02:23] .[02:23] 在漫天风沙里望着你远去.[02:27] 我竟悲伤的不能自已.[02:32] 多盼能送君千里 直到山穷水尽.[02:36] 一生和你相依.[02:42] .[02:43] 多盼能送君千里 直到山穷水尽.[02:50] 一生和你相依


//[00:00]盛夏光年（live）.[00:03]作词：阿信·五月天.[00:04]作曲：阿信·五月天.[00:05]演唱：陈冰.[00:12].[00:14]我骄傲的破坏.[00:17]我痛恨的平凡.[00:19]才想起那些是我最爱.[00:23].[00:24]让盛夏去贪玩.[00:27]把残酷的未来.[00:29]狂放到光年外.[00:34].[00:34]放弃规则 放纵去爱.[00:39]放肆自己 放空未来.[00:44]我不转弯 我不转弯.[00:49]我不转弯 我不转弯.[00:56].[01:14]我要我疯 我要我爱 就是.[01:17]我要我疯 我要我爱.[01:19]一万首的mp3 一万次疯狂的爱.[01:21]灭不了一个渺小的孤单.[01:24].[01:25]我要我疯 我要我爱 就是.[01:27]我要我疯 我要我爱.[01:29]盛夏的一场狂欢 来到了光年之外.[01:32]长大难道是人必经的溃烂.[01:35].[01:36]放弃规则 放纵去爱.[01:40]放肆自己 放空未来.[01:45]我不转弯 我不转弯.[01:50]我不转弯 我不转弯.[01:58].[02:05]我不转弯.[02:15]我不转弯我不 我不转弯我不 我不转弯.[02:25]我不转弯.[02:36]
