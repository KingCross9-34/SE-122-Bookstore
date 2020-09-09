package demo.backdemo.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "chart")
public class Chart {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "bookid", referencedColumnName = "id")
    private Book book;
    @Basic
    @Column(name = "num")
    private Integer num;
}
