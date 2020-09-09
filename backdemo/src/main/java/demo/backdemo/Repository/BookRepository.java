package demo.backdemo.Repository;

import demo.backdemo.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("select b from Book b")
    List<Book> getBooks();

    Book findDistinctById(Integer id);
}
