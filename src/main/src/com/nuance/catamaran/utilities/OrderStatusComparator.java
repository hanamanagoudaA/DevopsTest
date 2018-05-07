package com.nuance.catamaran.utilities;

import com.nuance.catamaran.dataaccess.objects.OrderStatus;
import java.util.Comparator;



public class OrderStatusComparator implements Comparator<OrderStatus>
{

    @Override
    public int compare(OrderStatus o1, OrderStatus o2)
    {
        return o2.getReceivedDate().compareTo(o1.getReceivedDate());
    }
}
