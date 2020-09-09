package demo.backdemo.Entity;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class OrderInfo {
    private Integer orderid;
    private List<JSONObject> orderitem;
    private List<Book> soldoutbooks;
    private String username;
    private String nickname;
    private String ordertime;
    private Integer totals;
}
