package demo.backdemo.Entity;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Statistic {
    private List<BookSta> bookStas;
    private List<UserSta> userStas;
    private Integer totals;
    private Integer totalNumber;

    public void transferBookSta() {
        List<BookSta> result = new ArrayList<>();
        for (int i = 0; i < bookStas.size(); i++) {
            BookSta b1 = bookStas.get(i);
            if (!result.contains(b1)) {
                for (int j = i+1; j < bookStas.size(); j++) {
                    BookSta b2 = bookStas.get(j);
                    if (b1.equals(b2)) {
                        b1.setNum(b1.getNum()+b2.getNum());
                    }
                }
                result.add(b1);
            }
        }
        this.setBookStas(result);
    }
}
