package com.nuance.catamaran.logging;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;
import org.apache.log4j.spi.LoggingEvent;

public class CreditCardFilteringLayout extends PatternLayout
{

    private static final String MASKCARD = "$1************";
    private static final Pattern PATTERNCARD
                                 = Pattern.compile("([0-9]{4})[0-9]{11,12}");

    @Override
    public String format(LoggingEvent event)
    {
        if (event.getMessage() instanceof String)
        {
            String message = event.getRenderedMessage();
            Matcher matcher = PATTERNCARD.matcher(message);
            if (matcher.find())
            {

                String maskedMessage = matcher.replaceAll(MASKCARD);
                Throwable throwable
                          = event.getThrowableInformation() != null
                            ? event.getThrowableInformation().getThrowable() : null;
                LoggingEvent maskedEvent = new LoggingEvent(
                        event.fqnOfCategoryClass,
                        Logger.getLogger(event.getLoggerName()),
                        event.timeStamp,
                        event.getLevel(),
                        maskedMessage,
                        throwable);
                return super.format(maskedEvent);
            }
        }

        return super.format(event);
    }
}
