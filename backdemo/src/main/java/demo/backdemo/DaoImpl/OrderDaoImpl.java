package demo.backdemo.DaoImpl;

import demo.backdemo.Dao.OrderDao;
import demo.backdemo.Entity.*;
import demo.backdemo.Repository.BookDetailRepository;
import demo.backdemo.Repository.ChartRepository;
import demo.backdemo.Repository.OrderItemRepository;
import demo.backdemo.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    private ChartRepository chartRepository;
    @Autowired
    private BookDetailRepository bookDetailRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public List<Chart> getChart(User user) {
        List<Chart> charts = chartRepository.findByUser(user);
        for (Chart chart: charts) {
            BookDetail bookDetail = bookDetailRepository.findById(chart.getBook().getId()).get();
            chart.getBook().setImage(bookDetail.getImage());
        }
        return charts;
    }

    @Override
    public Chart getOneChartItem(Integer id) {
        return chartRepository.getOne(id);
    }

    @Override
    public void addChart(Chart chart) {
        chartRepository.save(chart);
    }

    @Override
    public void removeChartItem(Integer id) {
        chartRepository.deleteById(id);
    }

    @Override
    public Chart findByUseridAndBookid(User user, Book book) {
        return chartRepository.findDistinctByUserAndBook(user, book);
    }

    @Override
    public List<Order> getOrders(User user) {
        return orderRepository.findByUser(user);
    }

    @Override
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Override
    public List<OrderItem> getItems(Order order) {
        return orderItemRepository.findAllByOrder(order);
    }

    @Override
    public void order(Order order) {
        orderRepository.save(order);
    }

    @Override
    public void orderitem(List<OrderItem> orderItems) {
        for (OrderItem orderItem : orderItems) {
            orderItemRepository.save(orderItem);
        }
    }

    @Override
    public List<Order> findByUserAndTime(User user, String startTime, String endTime) {
        return orderRepository.findOrdersByUserAndOrdertimeBetween(user, startTime, endTime);
    }

    @Override
    public List<Order> findAllByTime(String startTime, String endTime) {
        return orderRepository.findOrdersByOrdertimeBetween(startTime, endTime);
    }

    @Override
    public List<OrderItem> findByOrders(List<Order> orders) {
        return orderItemRepository.findOrderItemsByOrderIn(orders);
    }
}
