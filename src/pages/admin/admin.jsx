import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import memoryUtils from "../../utils/memoryUtils";
// 后台管理路由组件
export default class Admin extends Component {
   
    render() {
        const user = memoryUtils.user;
        console.log(user);
        if (!user || !user.id) {
            return <Redirect to="/login" />
        }
        return (
            <div>{user.username}</div>
        )
    }
}