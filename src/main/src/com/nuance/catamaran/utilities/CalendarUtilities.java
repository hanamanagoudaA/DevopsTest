package com.nuance.catamaran.utilities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class CalendarUtilities
{

    public static Calendar GetTodayMinusDays(int days)
    {
        Calendar todayMinusDays = Calendar.getInstance();
        todayMinusDays.add(Calendar.DATE, -days);
        return todayMinusDays;
    }

    public static Calendar GetToday()
    {
        Calendar today = Calendar.getInstance();
        return today;
    }

    public static String getYYYYMMDDString(Calendar cal)
    {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String calString = new String();

        if (cal != null)
        {
            calString = sdf.format(cal.getTime());
        }
        return calString;
    }

    public static Calendar getCalendarFromYYYYMMDDString(String dateString) throws ParseException
    {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        cal.setTime(sdf.parse(dateString));
        return cal;
    }

    public static String getMMsDDsYYYYFromYYYYMMDDString(String dateString)
    {
        if (dateString != null && !dateString.equals("") && dateString.trim().length() == 8)
        {
            String year = dateString.substring(0, 4);
            String month = dateString.substring(4, 6);
            String day = dateString.substring(6, 8);
            return month + "/" + day + "/" + year;
        }
        else
        {
            return dateString;
        }
    }
    
    public static Calendar getCalendarFromMMYYString(String dateString) throws ParseException
    {
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("MMyy");
        cal.setTime(sdf.parse(dateString));
        return cal;
    }
}
