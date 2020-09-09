package demo.backdemo.Entity;

import lombok.Data;

@Data
public class BookSta {
    Book book;
    Integer num;

    public BookSta(Book book, Integer num) {
        this.book = book;
        this.num = num;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        BookSta other = (BookSta) obj;
        if (book == null) {
            return other.book == null;
        }
        else return book.equals(other.book);
    }
}
