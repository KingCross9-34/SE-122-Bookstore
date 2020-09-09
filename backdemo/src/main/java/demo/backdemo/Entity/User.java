package demo.backdemo.Entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "nickname")
    private String nickname;
    @Basic
    @Column(name = "username")
    private String username;
    @Basic
    @Column(name = "passwords")
    private String password;
    @Basic
    @Column(name = "authority")
    private int authority;
    @Basic
    @Column(name = "prohibited")
    private boolean prohibited;
    @Basic
    @Column(name = "email")
    private String email;
    @Basic
    @Column(name = "account")
    private int account;
}
