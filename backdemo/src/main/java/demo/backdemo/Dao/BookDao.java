package demo.backdemo.Dao;

import demo.backdemo.Entity.Book;
import demo.backdemo.Entity.BookDetail;

import java.util.List;

public interface BookDao {
    List<Book> getBooks();
    Book getOneBook(Integer id);
    BookDetail getOneDetail(Integer id);
    void save(List<Book> book);
    void remove(Book book);
    void add(Book book);
}
