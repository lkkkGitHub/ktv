package com.mql.until;

import java.sql.Time;
import java.text.DateFormat;
import java.util.Date;

/**
 * @author mql
 * @date 2018/12/25
 */
public class TimeUtils {

    /**
     * 获取java.sql.Timestamp类型的当前时间
     *
     * @return
     */
    public static java.sql.Timestamp getNowTimestamp() {
        return new java.sql.Timestamp((new Date()).getTime());
    }

    /**
     * 获取，时分秒 时间
     *
     * @param date
     * @return
     */
    private static Time getTime(Date date) {
        return Time.valueOf(DateFormat.getTimeInstance().format(date));
    }

    /**
     * 判断当前时间所属的时间段
     *
     * @return 0 上午， 1 下午， 2晚上
     */
    public static Integer judgeTime() {
        Date date = new Date();
        Time now = getTime(date);
        date.setHours(12);
        date.setMinutes(0);
        date.setSeconds(0);
        Time t12 = getTime(date);
        date.setHours(18);
        Time t18 = getTime(date);
        if (now.after(t12)) {
            if (now.after(t18)) {
                return 2;
            }
            return 1;
        }
        return 0;
    }
}
