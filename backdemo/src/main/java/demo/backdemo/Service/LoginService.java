package demo.backdemo.Service;


import com.alibaba.fastjson.JSONObject;
import demo.backdemo.Entity.User;
import demo.backdemo.utils.Response;

public interface LoginService {
    public Response<User> Login(String username, String password);
}
