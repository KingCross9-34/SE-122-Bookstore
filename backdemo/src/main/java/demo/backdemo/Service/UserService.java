package demo.backdemo.Service;

import demo.backdemo.Entity.*;
import demo.backdemo.utils.Response;

import java.util.List;

public interface UserService {
    List<User> getUsers(Integer adminID);
    Response<User> register(String username, String password, String nickname, String email);
    void Prohibit(List<Integer> users);
    void Lift(List<Integer> users);
    void Topup(Integer userid, Integer amount);
}
