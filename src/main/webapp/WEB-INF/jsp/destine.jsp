<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" pageEncoding="UTF-8" isELIgnored="false" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
    <base href="<%=basePath%>">
    <title></title>
    <script type="text/javascript" src="../../static/regist/js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../static/compartment/js/compartment.js"></script>
</head>
<body>
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
<span style="color: red">${overTime}</span>
<c:forEach items="${compartmentList}" var="compartments">
    <p>${compartments.compartmentName}</p>
    <c:choose>
        <c:when test="${compartments.allState != '-1'}">
            <img src="../../static/compartment/img/"/>
            已经预定
            <c:if test="${compartments.allState == user.userId}">
                <a href="/compartment/cancelDestine?compartmentId=${compartments.compartmentId}">取消预定</a>
            </c:if>
        </c:when>
        <c:otherwise>
            <img src="../../static/compartment/img/"/>
            未预定
            <button onclick="verifyDestine('${compartments.compartmentId}')">点击预定</button>
        </c:otherwise>
    </c:choose>
</c:forEach>
<button onclick="myDestine()">我的预定</button>
<a href="/compartment/return">返回</a>
</body>
</html>