package demo.backdemo.Controller;

import com.alibaba.fastjson.JSONObject;
import demo.backdemo.Entity.User;
import demo.backdemo.Service.UserService;
import demo.backdemo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/register")
    @ResponseBody
    public Response<User> Register(@RequestBody Map<String, String> map) {
        return userService.register(map.get("username"), map.get("password"), map.get("nickname"), map.get("email"));
    }

    @RequestMapping("/getuser")
    @ResponseBody
    public List<User> getUsers(@RequestBody Integer adminid) {
        System.out.println(adminid);
        return userService.getUsers(adminid);
    }

    @RequestMapping("/prohibit")
    @ResponseBody
    public List<User> Prohibit(@RequestBody List<Integer> users) {
        userService.Prohibit(users);
        return getUsers(4);
    }

    @RequestMapping("/lift")
    @ResponseBody
    public List<User> Lift(@RequestBody List<Integer> users) {
        userService.Lift(users);
        return getUsers(4);
    }

    @RequestMapping("/topup")
    @ResponseBody
    public void Topup(@RequestBody JSONObject topup) {
        Integer userid = topup.getInteger("userid");
        Integer amount = topup.getInteger("amount");
        userService.Topup(userid, amount);
    }
}
