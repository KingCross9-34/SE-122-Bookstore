package demo.backdemo.ServiceImpl;

import demo.backdemo.Dao.BookDao;
import demo.backdemo.Dao.UserDao;
import demo.backdemo.Entity.Book;
import demo.backdemo.Entity.BookDetail;
import demo.backdemo.Entity.User;
import demo.backdemo.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Access;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;
    @Autowired
    private UserDao userDao;

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }

    @Override
    public Book getOneBook(Integer id) {
        return bookDao.getOneBook(id);
    }

    @Override
    public void remove(Integer adminID, List<Integer> bookIDs) {
        User admin = userDao.findOne(adminID);
        if (admin.getAuthority() == 2) {
            for (Integer bookid : bookIDs) {
                Book book = bookDao.getOneBook(bookid);
                bookDao.remove(book);
            }
        }
    }

    @Override
    public void removeone(Integer adminID, Integer bookid) {
        User admin = userDao.findOne(adminID);
        if (admin.getAuthority() == 2) {
            Book book = bookDao.getOneBook(bookid);
            bookDao.remove(book);
        }
    }

    @Override
    public void add(Book book) {
        bookDao.add(book);
    }

    @Override
    public void edit(Integer id, String bookname, String author, String isbn, String language, String year,
                     String publication, Integer price, Integer stock, String img, String detail) {
        Book book = bookDao.getOneBook(id);
        //System.out.println("edit book");
        //System.out.println(book);
        book.setBookname(bookname);
        book.setAuthor(author);
        book.setISBN(isbn);
        book.setLanguages(language);
        book.setYears(year);
        book.setPublication(publication);
        book.setPrice(price);
        book.setStock(stock);
        book.setDetail(detail);
        book.setImage(img);
        //System.out.println("price");
        //System.out.println(book.getPrice());
        bookDao.add(book);
    }
}
