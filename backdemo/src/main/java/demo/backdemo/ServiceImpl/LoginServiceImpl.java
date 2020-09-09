package demo.backdemo.ServiceImpl;

import demo.backdemo.Dao.UserDao;
import demo.backdemo.Entity.User;
import demo.backdemo.Service.LoginService;

import demo.backdemo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private UserDao userDao;

    @Override
    public Response<User> Login(String username, String password) {
        Response<User> result = new Response<User>();
        List<User> finduser = userDao.findByUsername(username);
        //System.out.println("finduser: "+ finduser);
        if (finduser.size() == 0) {
            result.setStatus(1);
            result.setMsg("Wrong username.");
            return result;
        }
        else {
            User user = finduser.get(0);
            if (password.equals(user.getPassword())) {
                if (!user.isProhibited()) {
                    result.setStatus(0);
                    result.setData(user);

                }
                else {
                    result.setStatus(3);
                    result.setMsg("You are prohibited!");
                }
                return result;
            }
            else {
                result.setStatus(2);
                result.setMsg("Wrong password");
                return result;
            }
        }
    }
}
