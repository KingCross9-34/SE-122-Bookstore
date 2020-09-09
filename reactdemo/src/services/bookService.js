import {ajax} from "../utils/ajax";
import {message} from "antd";

export const getBooks = (callback) => {
    const url = "http://localhost:8080/getbooks"
    ajax(url, null, callback);
};

export const getBook = (id ,callback) => {
    const url = "http://localhost:8080/getbook";
    ajax(url, id, callback);
}

export const RemoveBooks = (removedata, callback) => {
    const url = "http://localhost:8080/remove";
    ajax(url, removedata, callback);
}

export const RemoveOneBook = (removedata, callback) => {
    const url = "http://localhost:8080/removeone";
    ajax(url, removedata, callback);
}

export const addBook = (data) => {
    const url = "http://localhost:8080/add";
    const callback = (data) => {
        if (data.status === 0) {
            message.success("Successfully add")
        }
        else {
            message.error(data.msg)
        }
    }
    ajax(url, data, callback);
}

export const editBook = (data, callback) => {
    const url = "http://localhost:8080/edit";
    ajax(url, data, callback);
}
