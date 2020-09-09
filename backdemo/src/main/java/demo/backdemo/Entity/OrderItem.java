package demo.backdemo.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "orderitems")
public class OrderItem {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "bookid", referencedColumnName = "id")
    private Book book;
    @ManyToOne
    @JoinColumn(name = "ordersid", referencedColumnName = "id")
    private Order order;
    @Basic
    @Column(name = "num")
    private Integer num;
}
