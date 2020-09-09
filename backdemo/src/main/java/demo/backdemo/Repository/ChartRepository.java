package demo.backdemo.Repository;

import demo.backdemo.Entity.Book;
import demo.backdemo.Entity.Chart;
import demo.backdemo.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChartRepository extends JpaRepository<Chart, Integer> {
    List<Chart> findByUser(User user);
    Chart findDistinctByUserAndBook(User user, Book book);
}
