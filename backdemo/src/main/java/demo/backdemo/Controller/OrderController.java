package demo.backdemo.Controller;

import com.alibaba.fastjson.JSONObject;
import demo.backdemo.Entity.Chart;
import demo.backdemo.Entity.OrderInfo;
import demo.backdemo.Entity.OrderItem;
import demo.backdemo.Entity.Statistic;
import demo.backdemo.Service.OrderService;
import demo.backdemo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class OrderController {
    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/getcart")
    @ResponseBody
    public List<Chart> getChart(@RequestBody Integer userid) {
        //System.out.println("result");
        //System.out.println(orderService.getChart(userid));
        return orderService.getChart(userid);
    }

    @RequestMapping(value = "/addcart")
    @ResponseBody
    public Response<String> addChart(@RequestBody Map<String, Integer> map) {
        Integer userid = map.get("userid");
        Integer bookid = map.get("bookid");
        Integer num = map.get("num");
        orderService.addChart(userid, bookid, num);
        Response<String> response = new Response<>();
        response.setMsg("Successfully add!");
        response.setStatus(0);
        return response;
    }

    @RequestMapping(value = "/removecart")
    @ResponseBody
    public List<Chart> removeChartItem(@RequestBody JSONObject request) {
        //System.out.println(request);
        Integer userid = request.getInteger("userid");
        String str = JSONObject.toJSONString(request.getJSONArray("removeCartItem"));
        List<Integer> chartids = JSONObject.parseArray(str, Integer.class);
        //System.out.println(chartids);
        orderService.removeChartItem(chartids);
        return orderService.getChart(userid);
    }

    @RequestMapping(value = "/order")
    @ResponseBody
    public Response<OrderInfo> order(@RequestBody JSONObject request) throws ParseException {
        String str = JSONObject.toJSONString(request.getJSONArray("orders"));
        List<Integer> orders = JSONObject.parseArray(str, Integer.class);
        String time = request.getString("time");
        //System.out.println("time");
        //System.out.println(time);
        return orderService.order(request.getInteger("userid"), orders, time);
    }

    @RequestMapping("/getorder")
    @ResponseBody
    public List<OrderInfo> getOrders(@RequestBody Integer userid) {
        return orderService.getOrders(userid);
    }

    @RequestMapping(value = "/statistic")
    @ResponseBody
    public Statistic getSta(@RequestBody JSONObject request) {
        Integer userid = request.getInteger("userid");
        String startTime = request.getString("startTime");
        String endTime = request.getString("endTime");
        String type = request.getString("type");
        //System.out.println("sta");
        return orderService.getSta(userid, startTime, endTime, type);
    }
}
