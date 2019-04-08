<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="../../static/backstage/css/amazeui.min.css"/>
    <link rel="stylesheet" href="../../static/backstage/css/admin.css"/>
</head>

<body>
<div class="admin-content-body">
    <div class="am-cf am-padding am-padding-bottom-0">
        <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">用户管理</strong>
            <small></small>
        </div>
    </div>

    <hr>

    <div class="am-g">
        <div class="am-u-sm-12 am-u-md-6">
            <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                    <button type="button" class="am-btn am-btn-default"><span class="am-icon-plus"></span> 新增</button>
                </div>
            </div>
        </div>
        <div class="am-u-sm-12 am-u-md-3">

        </div>
        <div class="am-u-sm-12 am-u-md-3">
            <div class="am-input-group am-input-group-sm">
                <input type="text" class="am-form-field" placeholder="请输入用户">
                <span class="am-input-group-btn">
            <button class="am-btn am-btn-default" type="button">搜索</button>
          </span>
            </div>
        </div>
    </div>
    <div class="am-g">
        <div class="am-u-sm-12">
            <form class="am-form">
                <table class="am-table am-table-striped am-table-hover table-main">
                    <thead>
                    <tr>
                        <th class="table-check"><input type="checkbox"></th>
                        <th class="table-id">用户名</th>
                        <th class="table-title">性别</th>
                        <th class="table-title">年龄</th>
                        <th class="table-title">电话</th>
                        <th class="table-title">黑名单</th>
                        <th class="table-set">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach items="${tbUsers}" var="user">
                    <tr>
                            <td><input type="checkbox"></td>
                            <td>${user.userName}</td>
                            <c:if test="${user.sex==0}">
                                <td>男</td>
                            </c:if>
                            <c:if test="${user.sex == 1}">
                                <td>女</td>
                            </c:if>
                            <c:if test="${user.sex== 2} ">
                                <td>保密</td>
                            </c:if>
                            <td>${user.age}</td>
                            <td>${user.phone}</td>
                            <c:if test="${user.isBlock == 0}">
                                <td>否</td>
                            </c:if>
                            <c:if test="${user.isBlock == 1}">
                                <td>是</td>
                            </c:if>
                            <td>
                                <div class="am-btn-toolbar">
                                    <div class="am-btn-group am-btn-group-xs">
                                        <a href="/user/updateUser?phone=${user.phone}"class="am-btn am-btn-default am-btn-xs am-text-secondary">
                                            <span class="am-icon-pencil-square-o"></span> 编辑
                                        </a>
                                        <%--<button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span
                                                class="am-icon-pencil-square-o"></span> 编辑
                                        </button>--%>
                                        <a href="/user/deleteByPhone?phone=${user.phone}" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only">
                                            <span class="am-icon-trash-o"></span> 删除
                                        </a>
                                       <%-- <button class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only">
                                            <span class="am-icon-trash-o"></span> 删除
                                        </button>--%>
                                    </div>
                                </div>
                            </td>
                    </tr>
                    </c:forEach>
                    </tbody>
                </table>
                <%--<div class="am-cf">--%>
                    <%--<div class="am-fr">--%>
                        <%--<ul class="am-pagination">--%>
                            <%--<li class="am-disabled">--%>
                                <%--<a href="#">«</a>--%>
                            <%--</li>--%>
                            <%--<li class="am-active">--%>
                                <%--<a href="#">1</a>--%>
                            <%--</li>--%>
                            <%--<li>--%>
                                <%--<a href="#">2</a>--%>
                            <%--</li>--%>
                            <%--<li>--%>
                                <%--<a href="#">3</a>--%>
                            <%--</li>--%>
                            <%--<li>--%>
                                <%--<a href="#">4</a>--%>
                            <%--</li>--%>
                            <%--<li>--%>
                                <%--<a href="#">5</a>--%>
                            <%--</li>--%>
                            <%--<li>--%>
                                <%--<a href="#">»</a>--%>
                            <%--</li>--%>
                        <%--</ul>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <hr>
            </form>
        </div>

    </div>
</div>


</body>

</html>