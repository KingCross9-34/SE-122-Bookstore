package demo.backdemo.Repository;

import demo.backdemo.Entity.Order;
import demo.backdemo.Entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    List<OrderItem> findAllByOrder(Order order);
    List<OrderItem> findOrderItemsByOrderIn(List<Order> orders);
}
