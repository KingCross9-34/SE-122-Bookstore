import {ajax} from "../utils/ajax";

export const addToChart = (cartdata, callback) => {
    const url = "http://localhost:8080/addcart";
    ajax(url, cartdata, callback);
};

export const removeFromChart = (cartdata, callback) => {
    const url = "http://localhost:8080/removecart";
    ajax(url, cartdata, callback);
}

export const getChart = (userid, callback) => {
    const url = "http://localhost:8080/getcart";
    ajax(url, userid, callback);
};

export const orderBooks = (data, callback) => {
    const url = "http://localhost:8080/order";
    ajax(url, data, callback);
}

export const makeSta = (data, callback) => {
    const url = "http://localhost:8080/statistic";
    ajax(url, data, callback);
}
