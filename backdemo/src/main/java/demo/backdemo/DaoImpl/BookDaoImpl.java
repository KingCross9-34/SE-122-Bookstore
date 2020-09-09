package demo.backdemo.DaoImpl;

import demo.backdemo.Dao.BookDao;
import demo.backdemo.Entity.Book;
import demo.backdemo.Entity.BookDetail;
import demo.backdemo.Repository.BookDetailRepository;
import demo.backdemo.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookDetailRepository bookDetailRepository;

    @Override
    public List<Book> getBooks() {
        List<Book> books = bookRepository.getBooks();
        for (Book book : books) {
            BookDetail bookDetail = bookDetailRepository.findById(book.getId()).get();
            book.setDetail(bookDetail.getDetail());
            book.setImage(bookDetail.getImage());
        }
        return books;
    }
    @Override
    public Book getOneBook(Integer id) {
        BookDetail bookDetail = bookDetailRepository.findById(id).get();
        Book book = bookRepository.findDistinctById(id);
        book.setDetail(bookDetail.getDetail());
        book.setImage(bookDetail.getImage());
        return book;
    }

    @Override
    public BookDetail getOneDetail(Integer id) {
        return bookDetailRepository.findById(id).get();
    }

    @Override
    public void save(List<Book> book) {
        for (Book b : book) {
            bookRepository.save(b);
        }
    }

    @Override
    public void remove(Book book) {
        BookDetail bookDetail = bookDetailRepository.findById(book.getId()).get();
        bookDetailRepository.delete(bookDetail);
        bookRepository.delete(book);
    }

    @Override
    public void add(Book book) {
        bookRepository.save(book);
        BookDetail bookDetail = new BookDetail(book.getId(), book.getDetail(), book.getImage());
        //System.out.println("detail");
        //System.out.println(bookDetail);
        bookDetailRepository.save(bookDetail);
    }
}
