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
        <div class="am-fl am-cf"><strong class="am-text-primary am-text-lg">员工管理</strong>
            <small></small>
        </div>
    </div>

    <hr>

    <div class="am-g">
        <div class="am-u-sm-12 am-u-md-6">
            <div class="am-btn-toolbar">
                <div class="am-btn-group am-btn-group-xs">
                    <a href="/addStaff" class="am-btn am-btn-default">
                        <span class="am-icon-plus"></span> 新增
                    </a>
                    <%--<button type="button" class="am-btn am-btn-default"><span class="am-icon-plus"></span> 新增</button>--%>
                </div>
            </div>
        </div>
        <div class="am-u-sm-12 am-u-md-3">

        </div>
        <form action="/staff/queryByName" method="post">
        <div class="am-u-sm-12 am-u-md-3">
            <div class="am-input-group am-input-group-sm">
                <input type="text" name="staffName" class="am-form-field" placeholder="请输入员工名字">
                <span class="am-input-group-btn">
            <button class="am-btn am-btn-default" type="submit">搜索</button>
          </span>
            </div>
        </div>
        </form>
    </div>
    <div class="am-g">
        <div class="am-u-sm-12">
            <form class="am-form">
                <table class="am-table am-table-striped am-table-hover table-main">
                    <thead>
                    <tr>
                        <th class="table-check"><input type="checkbox"></th>
                        <th class="table-id">ID</th>
                        <th class="table-title">名字</th>
                        <th class="table-title">部门</th>
                        <th class="table-title">电话</th>
                        <th class="table-title">入职时间</th>
                        <th class="table-set">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach items="${tbStaffs}" var="staff">
                    <tr>
                            <td><input type="checkbox"></td>
                            <td>${staff.staffId}</td>
                            <td>${staff.staffName}</td>
                            <td>${staff.departName}</td>
                           <td>${staff.phone}</td>
                           <td>${staff.startTime }</td>
                            <td>
                                <div class="am-btn-toolbar">
                                    <div class="am-btn-group am-btn-group-xs">
                                        <a href="/staff/update?staffId=${staff.staffId}"class="am-btn am-btn-default am-btn-xs am-text-secondary">
                                            <span class="am-icon-pencil-square-o"></span> 编辑
                                        </a>
                                        <%--<button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span
                                                class="am-icon-pencil-square-o"></span> 编辑
                                        </button>--%>
                                        <a href="/staff/deleteById?staffId=${staff.staffId}" class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only">
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