package demo.backdemo.ServiceImpl;

import com.alibaba.fastjson.JSONObject;
import demo.backdemo.Dao.BookDao;
import demo.backdemo.Dao.OrderDao;
import demo.backdemo.Dao.UserDao;
import demo.backdemo.Entity.*;
import demo.backdemo.Service.OrderService;
import demo.backdemo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private BookDao bookDao;

    @Override
    public List<Chart> getChart(Integer userid) {
        User user = userDao.findOne(userid);
        return orderDao.getChart(user);
    }

    @Override
    public void addChart(Integer userid, Integer bookid, Integer num) {

        User user = userDao.findOne(userid);
        Book book = bookDao.getOneBook(bookid);
        Chart chart = orderDao.findByUseridAndBookid(user, book);
        if (chart != null) {
            Integer newnum = chart.getNum() + num;
            chart.setNum(newnum);
        }
        else {
            chart = new Chart();
            chart.setNum(num);
            chart.setUser(user);
            chart.setBook(book);
        }
        orderDao.addChart(chart);
    }

    @Override
    public void removeChartItem(List<Integer> chartids) {
        for (Integer chartid : chartids) {
            orderDao.removeChartItem(chartid);
        }
    }

    @Override
    public Response<OrderInfo> order(Integer userid, List<Integer> orders, String time) {
        User user = userDao.findOne(userid);
        int totals = 0;
        List<Book> books = new ArrayList<>();
        List<Book> soldoutbooks = new ArrayList<>();
        List<OrderItem> orderItems = new ArrayList<>();
        List<Integer> chartids = new ArrayList<>();
        List<JSONObject> orderinfoitems = new ArrayList<>();
        Response<OrderInfo> result = new Response<>();
        OrderInfo orderInfo = new OrderInfo();

        //根据购物车ID得到要买的书籍和数量
        for (Integer order: orders) {
            Chart chart = orderDao.getOneChartItem(order);
            Book book = chart.getBook();
            //售空
            if (book.getStock() < chart.getNum()) {
                soldoutbooks.add(book);
            }
            else {
                chartids.add(chart.getId());
                book.setStock(book.getStock() - chart.getNum());
                OrderItem orderItem = new OrderItem();
                orderItem.setBook(book);
                orderItem.setNum(chart.getNum());
                orderItems.add(orderItem);
                totals = totals + book.getPrice()*chart.getNum();
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("book", book);
                jsonObject.put("num", chart.getNum());
                orderinfoitems.add(jsonObject);
                books.add(book);
            }
        }

        if (orderinfoitems.isEmpty()) {
            result.setStatus(2);
            result.setMsg("The books you bought have been sold out.");
        }

        //余额足够支付
        else if (user.getAccount() >= totals) {
            user.setAccount(user.getAccount() - totals);
            userDao.save(user);
            Order order = new Order();
            order.setOrdertime(time);
            order.setTotals(totals);
            order.setUser(user);
            orderDao.order(order);

            for (OrderItem orderItem : orderItems) {
                orderItem.setOrder(order);
            }
            bookDao.save(books);
            orderDao.orderitem(orderItems);
            removeChartItem(chartids);
            orderInfo.setOrderid(order.getId());
            orderInfo.setOrderitem(orderinfoitems);
            orderInfo.setOrdertime(time);
            orderInfo.setSoldoutbooks(soldoutbooks);
            orderInfo.setTotals(totals);
            orderInfo.setUsername(user.getUsername());
            orderInfo.setNickname(user.getNickname());
            result.setStatus(0);
            result.setData(orderInfo);
        }
        else {
            String msg = "Insufficient balance.";
            result.setStatus(1);
            result.setMsg(msg);
        }
        return result;
    }

    @Override
    public List<OrderInfo> getOrders(Integer id) {
        User user = userDao.findOne(id);
        List<OrderInfo> orderInfos = new ArrayList<>();
        List<Order> orders = new ArrayList<>();
        if (user.getAuthority() == 1) {
            orders = orderDao.getOrders(user);
        }
        else if (user.getAuthority() == 2) {
            orders = orderDao.findAll();
        }
        for (Order order : orders) {
            OrderInfo orderInfo = new OrderInfo();
            User orderuser = order.getUser();
            orderInfo.setUsername(orderuser.getUsername());
            orderInfo.setTotals(order.getTotals());
            orderInfo.setOrdertime(order.getOrdertime());
            orderInfo.setOrderid(order.getId());

            List<JSONObject> orderinfoitems = new ArrayList<>();
            List<OrderItem> orderItems = orderDao.getItems(order);
            for (OrderItem orderItem : orderItems) {
                JSONObject jsonObject = new JSONObject();
                Book book = bookDao.getOneBook(orderItem.getBook().getId());
                jsonObject.put("book", book);
                jsonObject.put("num", orderItem.getNum());
                orderinfoitems.add(jsonObject);
            }
            orderInfo.setOrderitem(orderinfoitems);
            orderInfos.add(orderInfo);
        }
        return orderInfos;
    }

    @Override
    public Statistic getSta(Integer userid, String startTime, String endTime, String type) {
        User user = userDao.findOne(userid);
        //System.out.println(user);
        Statistic statistic = new Statistic();
        if (type.equals("book")) {
            List<Order> orders = new ArrayList<>();
            List<BookSta> bookStas = new ArrayList<>();
            int totals = 0;
            int totalNum = 0;
            if (user.getAuthority() == 1) {
                orders = orderDao.findByUserAndTime(user, startTime, endTime);
                List<OrderItem> orderItems = orderDao.findByOrders(orders);
                for (OrderItem orderItem : orderItems) {
                    BookSta bookSta = new BookSta(orderItem.getBook(), orderItem.getNum());
                    totals += orderItem.getNum() * orderItem.getBook().getPrice();
                    totalNum += orderItem.getNum();
                    bookStas.add(bookSta);
                }
            }
            else if (user.getAuthority() == 2) {
                orders = orderDao.findAllByTime(startTime, endTime);
                List<Book> books = bookDao.getBooks();
                List<OrderItem> orderItems = orderDao.findByOrders(orders);
                for (Book book : books) {
                    int booknum = 0;
                    for (OrderItem orderItem : orderItems) {
                        if (book.getId().equals(orderItem.getBook().getId()))
                            booknum += orderItem.getNum();
                    }
                    BookSta bookSta = new BookSta(book, booknum);
                    totalNum += booknum;
                    totals += booknum * book.getPrice();
                    bookStas.add(bookSta);
                }
            }
            statistic.setBookStas(bookStas);
            statistic.setTotals(totals);
            statistic.setTotalNumber(totalNum);
            if (user.getAuthority() == 1)
                statistic.transferBookSta();
        }
        else if (user.getAuthority() == 2 && type.equals("user")) {
            List<User> users = userDao.findAll();
            List<UserSta> userStas = new ArrayList<>();
            int staTotal = 0;
            int staNum = 0;
            for (User user1 : users) {
                List<Order> orders = orderDao.findByUserAndTime(user1, startTime, endTime);
                List<OrderItem> orderItems = orderDao.findByOrders(orders);
                Integer bookNum = 0;
                int bookTotal = 0;
                for (OrderItem orderItem : orderItems) {
                    bookNum += orderItem.getNum();
                    bookTotal += orderItem.getNum()*orderItem.getBook().getPrice();
                }
                staNum += bookNum;
                staTotal += bookTotal;
                UserSta userSta = new UserSta(user1, bookNum, bookTotal);
                userStas.add(userSta);
            }
            statistic.setUserStas(userStas);
            statistic.setTotalNumber(staNum);
            statistic.setTotals(staTotal);
        }
        return statistic;
    }
}
