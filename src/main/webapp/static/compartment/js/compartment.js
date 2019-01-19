function verifyDestine(compartmentId) {
    $.ajax({
        url: "/compartment/verifyDestine",
        success: function (data) {
            if (judgeIsDestine(data)) {
                window.location.href = "/compartment/destine?compartmentId=" + compartmentId + "";
            } else {
                alert("你已经预定过包房了，不能在预定了");
            }
        }
    });
}

/**
 * 遍历map判断是否预定
 * @param map
 * @returns {boolean}
 */
function judgeIsDestine(map) {
    var t1 = "";
    var t3 = "";
    var t2 = "";
    for (var key in map) {
        var list = map[key];
        if (key == 0) {
            t1 = list.length;
        } else if (key == 1) {
            t2 = list.length;
        } else {
            t3 = list.length;
        }
    }
    return t1 == 0 && t2 == t1 && t3 == t2;
}

function myDestine() {
    $.ajax({
        url: "/compartment/verifyDestine",
        success: function (data) {
            var str = "";
            if (judgeIsDestine(data)) {
                str = "你还没有预定包房";
            } else {
                str = "你已经预定了："
                for (var key in data) {
                    var list = data[key];
                    var time = "";
                    if (key == 0) {
                        time = "上午";
                    } else if (key == 1) {
                        time = "下午";
                    } else {
                        time = "晚上";
                    }
                    for (var i = 0; i < list.length; i++) {
                        str += "包房名:" + list[i].compartmentName + ",时段:" + time + "  ";
                    }
                }
            }
            alert(str);
        }
    });
}
