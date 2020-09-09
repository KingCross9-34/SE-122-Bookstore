package demo.backdemo.Service;

import demo.backdemo.Entity.Chart;
import demo.backdemo.Entity.OrderInfo;
import demo.backdemo.Entity.Statistic;
import demo.backdemo.utils.Response;

import java.util.List;

public interface OrderService {
    List<Chart> getChart(Integer userid);
    void addChart(Integer userid, Integer bookid, Integer num);
    void removeChartItem(List<Integer> chartids);
    Response<OrderInfo> order(Integer userid, List<Integer> orders, String time);
    List<OrderInfo> getOrders(Integer id);
    Statistic getSta(Integer userid, String startTime, String endTime, String type);
}
