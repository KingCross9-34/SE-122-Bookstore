package demo.backdemo.DaoImpl;

import demo.backdemo.Dao.UserDao;
import demo.backdemo.Entity.User;
import demo.backdemo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findOne(Integer id) {
        return userRepository.findDistinctById(id);
    }

    @Override
    public User login(String username, String password) {
        return userRepository.findDistinctByUsernameAndPassword(username, password);
    }

    @Override
    public List<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public Integer getIdByUsername(String username) {
        return userRepository.findDistinctByUsername(username).getId();
    }

    @Override
    public boolean checkUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
