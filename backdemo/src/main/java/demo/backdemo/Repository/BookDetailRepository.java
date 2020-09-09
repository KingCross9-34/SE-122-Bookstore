package demo.backdemo.Repository;

import demo.backdemo.Entity.BookDetail;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookDetailRepository extends MongoRepository<BookDetail, Integer> {
}
