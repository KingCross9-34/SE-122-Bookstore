package demo.backdemo.Repository;

import demo.backdemo.Entity.Order;
import demo.backdemo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUser(User user);
    List<Order> findOrdersByUserAndOrdertimeBetween(User user, String startTime, String endTime);
    List<Order> findOrdersByOrdertimeBetween(String startTime, String endTime);
}
