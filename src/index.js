// 入口文件
import React from "react";
import ReactDOM from "react-dom";
// import "antd/dist/antd.css";
import App from "./App";
import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";

const user = storageUtils.getUser();
console.log(user);
console.log(window.localStorage.username);
memoryUtils.user = user;

//将App组件标签渲染到index.html的div上
ReactDOM.render(<App />, document.getElementById('root'))
