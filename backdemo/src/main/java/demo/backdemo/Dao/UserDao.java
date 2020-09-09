package demo.backdemo.Dao;

import demo.backdemo.Entity.Book;
import demo.backdemo.Entity.Order;
import demo.backdemo.Entity.OrderItem;
import demo.backdemo.Entity.User;

import java.util.List;

public interface UserDao {
    User findOne(Integer id);
    User login(String username, String password);
    List<User> findByUsername(String username);
    List<User> findAll();
    void save(User user);
    Integer getIdByUsername(String username);
    boolean checkUsername(String username);
}
