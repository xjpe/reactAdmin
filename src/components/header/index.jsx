import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import './index.less'
import { reqWeather } from '../../api';
import { formatDate } from '../../utils/dateUtils'
import memoryUtyils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import weatherConfig from '../../config/weatherConfig';
import menuList from '../../config/menuConfig';
import LinkButton from '../link-button';

const { confirm } = Modal;

class Header extends Component {

    state = {
        currentTime: formatDate(Date.now()),    //当前时间字符串
        weather: '',    //天气文本 
        dayPictureUrl: '',   //天气图片url
        temperature: '',    //温度
    }

    /**
     *获取时间
     *
     * @memberof Header
     */
    getTime = () => {
        this.timer = setInterval(() => {
            const currentTime = formatDate(Date.now());
            this.setState({ currentTime });
        }, 1000)
    }

    /**
     *处理天气图片
     *
     * @memberof Header
     */
    manageWeatherImg = () => {
        const { weather } = this.state;
        let dayPictureUrl = '';
        weatherConfig.forEach(item => {
            if (item.name === weather) dayPictureUrl = item.url;
        })
        this.setState({ dayPictureUrl });
    }

    
    /**
     *获取天气
     *
     * @memberof Header
     */
    getWeather = async () => {
        const KEY = '42ead96daf4425f9c7cb82f9cfefc480';
        const res = await reqWeather('310000', KEY);
        const { weather, temperature } = res.lives[0];
        this.setState({ weather, temperature })
    }

    /**
     *获取标题
     *
     * @returns
     * @memberof Header
     */
    getTitle() {
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                //在所有子item中查找匹配
                const cItem = item.children.find(cItem => cItem.key === path);
                if (cItem) title = cItem.title;
            }
        })
        return title;
    }

    /**
     *退出登录
     *
     * @param {*} e
     * @memberof Header
     */
    logOut(e) {
        e.preventDefault();
        confirm({
            content: '确定退出吗',
            onOk:() => {
                storageUtils.removeUser();
                memoryUtyils.user = {};
                this.props.history.replace('/login');
            }
        });
    }
    /**
     *componentDidMount: 装载完成，在render之后调用
     *
     * @memberof Header
     */
    async componentDidMount() {
        this.getTime();
        await this.getWeather();
        this.manageWeatherImg();
    }

    /**
     *componentWillUnmount: 组件卸载之前调用
     *
     * @memberof Header
     */
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { currentTime, weather, dayPictureUrl, temperature } = this.state;
        const username = memoryUtyils.user.username;
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton onClick={this.logOut.bind(this)}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span style={{ marginRight: 8 }}>{weather}</span>
                        <span>{temperature}℃</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)