import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 /**
  * BrowserRouter : 没有 "#",
  * HashRouter: 带有 "#",
 */
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
// 应用的根组件
export default class App extends Component {

    render() {
        return (
            
            <BrowserRouter> {/**由于是第一层路由, 所以外层需要先写个路由器 */}
                <Switch>    {/**只匹配其中一个 */}
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>
                </Switch>

            </BrowserRouter>
        )
    }
}