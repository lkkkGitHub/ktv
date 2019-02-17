<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" pageEncoding="UTF-8" isELIgnored="false" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <meta charset="utf-8">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no"/>

    <link rel="shortcut icon" href="favicon.ico"/>
    <link href="../../static/destine/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/destine/css/jquery-ui.structure.min.css" rel="stylesheet" type="text/css"/>
    <link href="../../static/destine/css/jquery-ui.min.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link href="../../static/destine/css/style.css" rel="stylesheet" type="text/css"/>
    <title>Let's Travel</title>
</head>
<body data-color="theme-1">

<div class="main-wraper padd-90">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="second-title">
                    <h2>包房预定</h2>
                    <!--	  <p class="color-grey">Curat ut, congue bibendum nulla. Suspendisse id tor.</p>-->
                </div>
            </div>
        </div>
        <div>
            <a href="/compartment/getState?period=0">上午场</a>
            <a href="/compartment/getState?period=1">下午场</a>
            <a href="/compartment/getState?period=2">晚场</a>
            <h4>
                当前时间段：
                <c:choose>
                    <c:when test="${sessionScope.period==0}">
                        上午场
                    </c:when>
                    <c:when test="${sessionScope.period==1}">
                        下午场
                    </c:when>
                    <c:otherwise>
                        晚场
                    </c:otherwise>
                </c:choose>
            </h4>
            <button onclick="myDestine()">我的预定</button>
            <a href="/compartment/return">返回</a>
            <span style="color: red">${overTime}</span>
        </div>
        <div class="row">
            <c:forEach items="${compartmentList}" var="compartments" varStatus="status">
                <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <div class="radius-mask tour-block hover-aqua">
                        <div class="clip">
                            <div class="bg bg-bg-chrome act"
                                 style="background-image:url(../../static/destine/img/home_1/sea_tour_img_${status.index + 1}.jpg)">
                            </div>
                        </div>
                        <div class="tour-layer delay-1"></div>
                        <div class="tour-caption">
                            <div class="vertical-align">
                                <h3 class="hover-it">${compartments.compartmentName}</h3>
                                <div class="rate">
                                    <span class="fa fa-star color-yellow"></span>
                                    <span class="fa fa-star color-yellow"></span>
                                    <span class="fa fa-star color-yellow"></span>
                                    <span class="fa fa-star color-yellow"></span>
                                    <span class="fa fa-star color-yellow"></span>
                                </div>
                                <!--<h4>from <b>$860</b></h4>  -->
                            </div>
                            <div class="vertical-bottom">
                                <c:choose>
                                    <c:when test="${compartments.allState != '-1'}">
                                        <span>已经预定</span>
                                        <span href="#" class="c-button b-50 bg-aqua hv-transparent fr">
                                            <c:if test="${compartments.allState == user.userId}">
                                                <a href="/compartment/cancelDestine?compartmentId=${compartments.compartmentId}">取消预定</a>
                                            </c:if>
                                            <img src="../../static/destine/img/home_1/flag_icon.png" alt="">
                                        </span>
                                    </c:when>
                                    <c:otherwise>
                                        <span>未预定</span>
                                        <span href="#" class="c-button b-50 bg-aqua hv-transparent fr">
                                            <img src="../../static/destine/img/home_1/flag_icon.png" alt="">
                                            <span onclick="verifyDestine('${compartments.compartmentId}')">点击预定</span>
                                        </span>
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>
</div>


</footer>
<script type="text/javascript" src="../../static/regist/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="../../static/compartment/js/compartment.js"></script>
<script src="../../static/destine/js/jquery-2.1.4.min.js"></script>
<script src="../../static/destine/js/bootstrap.min.js"></script>
<script src="../../static/destine/js/jquery-ui.min.js"></script>
<script src="../../static/destine/js/idangerous.swiper.min.js"></script>
<script src="../../static/destine/js/jquery.viewportchecker.min.js"></script>
<script src="../../static/destine/js/isotope.pkgd.min.js"></script>
<script src="../../static/destine/js/jquery.mousewheel.min.js"></script>
<script src="../../static/destine/js/all.js"></script>
</body>
</html>				   