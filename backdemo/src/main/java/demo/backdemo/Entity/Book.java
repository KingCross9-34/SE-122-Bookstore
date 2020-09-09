package demo.backdemo.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "books")
public class Book {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Basic
    @Column(name = "ISBN")
    private String ISBN;
    @Basic
    @Column(name = "bookname")
    private String bookname;
    @Basic
    @Column(name = "author")
    private String author;
    @Basic
    @Column(name = "languages")
    private String languages;
    @Basic
    @Column(name = "years")
    private String years;
    @Basic
    @Column(name = "price")
    private Integer price;
    @Basic
    @Column(name = "stock")
    private Integer stock;
    @Basic
    @Column(name = "publication")
    private String publication;
    @Transient
    private String detail;
    @Transient
    private String image;

    public Book() {}

    public Book(String ISBN, String bookname, String author, String languages, String years,
                String publication, String detail, String image, Integer price, Integer stock) {
        this.ISBN = ISBN;
        this.bookname = bookname;
        this.author = author;
        this.languages = languages;
        this.years = years;
        this.publication = publication;
        this.detail = detail;
        this.image = image;
        this.price = price;
        this.stock = stock;
    }
}

