package demo.backdemo.Controller;

import demo.backdemo.Entity.User;
import demo.backdemo.Service.LoginService;
import demo.backdemo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class LoginController {
    @Autowired
    private LoginService loginService;

    @RequestMapping(value = "/login")
    @ResponseBody
    public Response<User> login(@RequestBody Map<String, String> map) {
        System.out.println(map.get("username"));
        System.out.println(map.get("password"));
        return loginService.Login(map.get("username"), map.get("password"));
    }
}
