<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>员工信息修改</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/4.1.0/css/bootstrap.min.css">
    <script src="https://cdn.staticfile.org/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/popper.js/1.12.5/umd/popper.min.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/4.1.0/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
    <form class="form-inline" action="/staff/updateStaff" method="post">
        <label for="name">姓名：</label>
        <br>
        <input type="text"  name="staffName" class="form-control" id="name" placeholder="Enter name">
        <br>
        <label for="departId">部门</label>
        <br>
        <%--<input type="text" class="form-control" id="departId" placeholder="Enter id">--%>
        <select name="departId" id="departId">
            <option value="1">前台</option>
            <option value="2">服务部</option>
            <option value="3">维修部</option>
        </select>
        <br>
        <label for="phone">号码：</label>
        <br>
        <input type="text"  name="phone" class="form-control" id="phone" placeholder="Enter phone">
      <%--  <label for="time">入职时间:</label>
        <br>
        <input type="password" class="form-control" id="time" placeholder="Enter time">--%>
        <br>
      <%--  <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox"> Remember me
            </label>
        </div>--%>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>

</body>
</html>