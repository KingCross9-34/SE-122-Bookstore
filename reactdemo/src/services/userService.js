import {message} from "antd";
import {history} from "../utils/history";
import {ajax} from "../utils/ajax";

export const login = (logindata) => {
    const callback = (data) => {
        if (data.status === 0) {
            localStorage.setItem("user", JSON.stringify(data.data));
            message.success("Successfully login!")
            history.push("/home");
        }
        else {
            message.error(data.msg);
        }
    }
    const url = "http://localhost:8080/login";
    ajax(url, logindata, callback);
};

export const register = (registerdata) => {
    const callback = (data) => {
        if (data.status === 0) {
            localStorage.setItem("user", JSON.stringify(data.data));
            message.success("Successfully register!");
            history.push("/login");
        }
        else {
            message.error(data.msg);
        }
    };
    const url = "http://localhost:8080/register";
    ajax(url, registerdata, callback);
}

export const getOrders = (userid, callback) => {
    const url = "http://localhost:8080/getorder";
    ajax(url, userid, callback);
}

export const getUsers = (adminID, callback) => {
    const url = "http://localhost:8080/getuser";
    ajax(url, adminID, callback);
}

export const prohibit = (users, callback) => {
    const url = "http://localhost:8080/prohibit";
    ajax(url, users, callback);
}

export const lift = (users, callback) => {
    const url = "http://localhost:8080/lift";
    ajax(url, users, callback);
}

export const topup = (data, callback) => {
    const url = "http://localhost:8080/topup";
    ajax(url, data, callback);
}

export const test = () => {
    const url = "http://localhost:8888/getDepartmentNotices"
    fetch(url, {
        method: "POST",
        headers: {
            'Authentication': 'Bearer eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJpc3MiOiJTbmFpbENsaW1iIiwiaWF0IjoxNTk3MzgyOTA4LCJzdWIiOiIxMjMiLCJleHAiOjE1OTc5ODc3MDh9.Tab0z_ruzpIHOQfMDRsOaxawDE0LBEabAH69dSMvqM8',
            'Content-Type': 'application/json'
        }
    }).then((res)=>{return res.json()}).then((data)=>{console.log(data)}).catch((err)=>{console.log(err)})
}
