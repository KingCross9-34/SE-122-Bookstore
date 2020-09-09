package demo.backdemo.Controller;

import com.alibaba.fastjson.JSONObject;
import demo.backdemo.Entity.Book;
import demo.backdemo.Entity.BookDetail;
import demo.backdemo.Service.BookService;
import demo.backdemo.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class BookController {
    @Autowired
    private BookService bookService;

    @RequestMapping("/getbooks")
    @ResponseBody
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @RequestMapping("/getbook")
    @ResponseBody
    public Book getOneBook(@RequestBody Integer id) {
        return bookService.getOneBook(id);
    }

    @RequestMapping("/remove")
    @ResponseBody
    public List<Book> remove(@RequestBody JSONObject request) {
        Integer adminID = request.getInteger("adminID");
        String str = JSONObject.toJSONString(request.getJSONArray("bookIDs"));
        List<Integer> bookIDs = JSONObject.parseArray(str, Integer.class);
        bookService.remove(adminID, bookIDs);
        return getBooks();
    }

    @RequestMapping("/removeone")
    @ResponseBody
    public List<Book> removeone(@RequestBody JSONObject request) {
        Integer adminID = request.getInteger("adminID");
        Integer bookid = request.getInteger("bookIDs");
        bookService.removeone(adminID, bookid);
        return getBooks();
    }

    @RequestMapping("/add")
    @ResponseBody
    public Response add(@RequestBody JSONObject request) {
        String bookname = request.getString("bookname");
        String author = request.getString("author");
        String language = request.getString("language");
        String year = request.getString("year");
        String isbn = request.getString("isbn");
        String publication = request.getString("publication");
        String detail = request.getString("detail");
        String image = request.getString("imgUrl");
        Integer price = request.getInteger("price");
        Integer stock = request.getInteger("stock");
        boolean flag = ((bookname!=null) && (author!=null) && (language!=null) && (year!=null) && (isbn!=null) &&
                (publication!=null) && (detail!=null) && (image!=null) && (price!=null) && (stock!=null));
        Response response = new Response();
        if (flag) {
            Book book = new Book(isbn, bookname, author, language, year, publication, detail, image, price, stock);
            //System.out.println(book);
            bookService.add(book);
            response.setStatus(0);
            response.setMsg("Success");
        }
        else {
            response.setMsg("Please input all information!");
            response.setStatus(1);
        }
        return response;
    }

    @RequestMapping("/edit")
    @ResponseBody
    public Book edit(@RequestBody JSONObject request) {
        Integer id = request.getInteger("id");
        String bookname = request.getString("bookname");
        String author = request.getString("author");
        String language = request.getString("language");
        String year = request.getString("year");
        String isbn = request.getString("isbn");
        String publication = request.getString("publication");
        String detail = request.getString("detail");
        String image = request.getString("imgUrl");
        Integer price = request.getInteger("price");
        Integer stock = request.getInteger("stock");
        bookService.edit(id, bookname, author, isbn, language, year, publication, price, stock, image, detail);
        return getOneBook(id);
    }
}
