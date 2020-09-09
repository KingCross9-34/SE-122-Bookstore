package demo.backdemo.Dao;

import demo.backdemo.Entity.*;

import java.util.List;
import java.util.Map;

public interface OrderDao {
    List<Chart> getChart(User user);
    Chart getOneChartItem(Integer id);
    void addChart(Chart chart);
    void removeChartItem(Integer id);
    Chart findByUseridAndBookid(User user, Book book);
    List<Order> getOrders(User user);
    List<Order> findAll();
    List<OrderItem> getItems(Order order);
    void order(Order order);
    void orderitem(List<OrderItem> orderItems);
    List<Order> findByUserAndTime(User user, String startTime, String endTime);
    List<Order> findAllByTime(String startTime, String endTime);
    List<OrderItem> findByOrders(List<Order> orders);
}
