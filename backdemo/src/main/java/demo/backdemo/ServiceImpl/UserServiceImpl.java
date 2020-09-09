package demo.backdemo.ServiceImpl;

import com.alibaba.fastjson.JSONObject;
import demo.backdemo.Dao.BookDao;
import demo.backdemo.Dao.OrderDao;
import demo.backdemo.Dao.UserDao;
import demo.backdemo.Entity.*;
import demo.backdemo.Service.UserService;
import demo.backdemo.utils.Response;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public List<User> getUsers(Integer adminID) {
            return userDao.findAll();
    }

    @Override
    public Response<User> register(String username, String password, String nickname, String email) {
        Response<User> result = new Response<>();
        if (userDao.checkUsername(username)) {
            result.setStatus(4);
            result.setMsg("Username already exists.");
        }
        else {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setNickname(nickname);
            user.setEmail(email);
            user.setAuthority(1);
            user.setProhibited(false);
            user.setAccount(0);
            userDao.save(user);
            user.setId(userDao.getIdByUsername(username));
            result.setMsg("Success");
            result.setStatus(0);
            result.setData(user);
        }
        return result;
    }

    @Override
    public void Prohibit(List<Integer> users) {
        for (Integer userid : users) {
            User user = userDao.findOne(userid);
            user.setProhibited(true);
            //System.out.println(user);
            userDao.save(user);
        }
    }

    @Override
    public void Lift(List<Integer> users) {
        for (Integer userid : users) {
            User user = userDao.findOne(userid);
            user.setProhibited(false);
            userDao.save(user);
        }
    }

    @Override
    public void Topup(Integer userid, Integer amount) {
        User user = userDao.findOne(userid);
        user.setAccount(user.getAccount() + amount);
        userDao.save(user);
    }
}
