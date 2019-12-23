import React ,{Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductHome from './components/home';
import ProductAddUpdate from './components/add-update';
import ProductDetail from './components/detail';
/**
 * 商品路由
 */

export default class Product extends Component {
    render(){
        return (
            <Switch>
                {/* exact: 精确匹配 */}
                <Route path='/product' exact component={ProductHome} />
                <Route path='/product/addupdate' component={ProductAddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
                <Redirect to='/product' />
            </Switch>
        )
    }
}