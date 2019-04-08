<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page pageEncoding="UTF-8" contentType="text/html; UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>个人资料</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="../../static/personal/person.css">
    <style type="text/css">
        #login
        {
            position: relative;
            margin: auto;
            width: 620px;
            /*border: 1px solid #d7d7d7;
            border-radius: 5px;*/
            margin-top: 20px;
            height: 400px;
        }
        .dtop{
            margin-left: 23%;
            margin-top: 30px;
            margin-bottom: 10px;
        }

        .im-g {
            text-align: left;
            margin-bottom: 2em;
        }
        .im-g img {
            border-radius: 50%;
            width: 100px;
            height: 100px;
            margin-top: 40px;

        }
        #leftzl
        {
            position: absolute;
            left: 2%;
            top: 5%;
            width: 15%;
            border-left: 3px solid red;
            line-height: 15px;
            font-size: 20px;
        }
        .sub {
            width: 150px;
            padding: 9px 15px;
            background: #617798;
            border: 0;
            font-size: 14px;
            color: #FFFFFF;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
        }
    </style>
</head>
<body>

<div class="dtop">欢迎您，<span style="color: red;">${sessionScope.user.userName}</span>！</div>
<div>
    <div id="leftzl" style="margin-left: 20px;">
        &nbsp;个人信息
    </div>
    <div id="login">
        <form class="bs-example bs-example-form" role="form" enctype="multipart/form-data" action="/user/updateById" method="post">
            <fieldset>
                <legend>个人基本信息</legend>
                <input type="hidden" name="userId" value="${sessionScope.user.userId}">
                <div style="float: left; margin-left: 40px; margin-top: 20px;">

                    <div class="input-group">

                        <span class="input-group-addon">用户名</span>
                        <input type="text" class="form-control" name="userName" value="${sessionScope.user.userName}">
                    </div>
                    <br>
                    <div class="input-group">
                        <span class="input-group-addon">性别</span>
                        <c:if test="${sessionScope.user.sex == 0}">
                            <input class="sex_m" type="radio" name="sex" value="0" checked>男</input>
                            <input class="sex_m" type="radio" name="sex" value="1">女</input>
                            <input class="sex_m" type="radio" name="sex" value="3">保密</input>
                        </c:if>
                        <c:if test="${sessionScope.user.sex ==1 }">
                            <input class="sex_m" type="radio" name="sex" value="0" >男</input>
                            <input class="sex_m" type="radio" name="sex" value="1" checked>女</input>
                            <input class="sex_m" type="radio" name="sex" value="3" >保密</input>
                        </c:if>
                        <c:if test="${sessionScope.user.sex == 3}">
                            <input class="sex_m" type="radio" name="sex" value="0" >男</input>
                            <input class="sex_m" type="radio" name="sex" value="1" >女</input>
                            <input class="sex_m" type="radio" name="sex" value="3" checked>保密</input>
                        </c:if>
                    </div>
                    <br>
                    <div class="input-group">
                        <span class="input-group-addon">年龄</span>
                       <input type="text" name="age" class="form-control" value="${sessionScope.user.age}"/>  　
                    </div>
                    <br>
                    <div class="input-group">
                        <span class="input-group-addon">电话</span>
                        <input type="text" name="phone" class="form-control" value="${sessionScope.user.phone}"/>
                    </div>
                    <br>
                 <%--   <div class="input-group">
                        <span class="input-group-addon">城市</span>
                        <input type="text" name="city" class="form-control"value="${sessionScope.loginUser.city}"/>
                    </div>
                    <br>--%>
                    <input value="修改" type="submit" class="sub">
                </div>
            </fieldset>
        </form>
    </div>
</div>
</body>
</html>