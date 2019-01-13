<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <title>修改</title>
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<form class="form-horizontal" role="form" action="/user/updateByPhone" method="get">
    <div class="form-group">
        <label class="col-sm-2 control-label">黑名单</label>
        <div class="col-sm-10">
            <input id="phoneId" name="phone" hidden="true" value="${requestScope.phone}">
            <select name="isBlock">
                <option value ="1">是</option>
                <option value ="0">否</option>
            </select>
            <input type="submit" value="修改">
        </div>
    </div>
</form>
</body>
</html>