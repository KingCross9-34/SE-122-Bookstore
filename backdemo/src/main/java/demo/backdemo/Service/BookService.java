package demo.backdemo.Service;

import demo.backdemo.Entity.Book;
import demo.backdemo.Entity.BookDetail;

import java.util.List;

public interface BookService {
    List<Book> getBooks();
    Book getOneBook(Integer id);
    void remove(Integer adminID, List<Integer> bookIDs);
    void removeone(Integer adminID, Integer bookid);
    void add(Book book);
    void edit(Integer id, String bookname, String author, String isbn, String language, String year,
              String publication, Integer price, Integer stock, String img, String detail);
}
