import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

const {Footer, Sider, Content } = Layout;
// 后台管理路由组件
export default class Admin extends Component {

    render() {
        const user = memoryUtils.user;
        console.log(user);
        if (!user || !user._id) {
            return <Redirect to="/login" />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor:'#fff'}}>Content</Content>
                    <Footer style={{textAlign:'center',color:'#7F7F7F'}}>推荐使用谷歌浏览器，以便获得更好的页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}