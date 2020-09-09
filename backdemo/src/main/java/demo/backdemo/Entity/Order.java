package demo.backdemo.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Basic
    @Column(name = "ordertime")
    private String ordertime;
    @Basic
    @Column(name = "totals")
    private Integer totals;
    @ManyToOne
    @JoinColumn(name = "usersid", referencedColumnName = "id")
    private User user;
}
