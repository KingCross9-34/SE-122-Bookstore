package demo.backdemo.Entity;

import lombok.Data;

@Data
public class UserSta {
    private User user;
    private Integer booksNum;
    private Integer totals;

    public UserSta(User user, Integer booksNum, Integer totals) {
        this.user = user;
        this.booksNum = booksNum;
        this.totals = totals;
    }
}
