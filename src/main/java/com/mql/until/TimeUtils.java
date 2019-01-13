package com.mql.until;

import java.util.Calendar;
import java.util.Date;

public class TimeUtils {

    /**
     * 获取当前时间
     *
     * @return Date类型时间
     */
    public static Date getNowTime() {
        Calendar calendar = Calendar.getInstance();
        return calendar.getTime();
    }

    /**
     * 获取java.sql.Timestamp类型的当前时间
     *
     * @return
     */
    public static java.sql.Timestamp getNowTimestamp() {
        return new java.sql.Timestamp((new Date()).getTime());
    }

    /**
     * 在当前时间基础上加 integer 个 分钟数值
     *
     * @param integer
     * @return
     */
    public static Date addMinuteTime(Integer integer) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, integer);
        return calendar.getTime();
    }

    /**
     * 比较now是否在future之前
     *
     * @param now
     * @param future
     * @return
     */
    public static Boolean compareTime(Date now, Date future) {
        return now.before(future);
    }
}
