package demo.backdemo.Repository;

import demo.backdemo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findDistinctByUsernameAndPassword(String username, String password);
    User findDistinctByUsername(String username);
    List<User> findByUsername(String username);
    boolean existsByUsername(String username);
    User findDistinctById(Integer id);
}
