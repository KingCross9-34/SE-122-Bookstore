package demo.backdemo.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "bookstore")
public class BookDetail {
    @Id
    private Integer id;
    private String detail;
    private String image;
    private String _class;

    public BookDetail(Integer id, String detail, String image) {
        this.id = id;
        this.detail = detail;
        this.image = image;
    }
}
