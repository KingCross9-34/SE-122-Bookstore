package demo.backdemo.utils;

import lombok.Data;

@Data
public class Response<T> {
    private int status;
    private String msg;
    private T data;
}
