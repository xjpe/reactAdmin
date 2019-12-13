import React, { Component } from 'react';
import { Card, Table, Button, Icon, message } from "antd";
import { reqCategotys } from '../../api';

import LinkButton from '../../components//link-button';
import './category.less';
/**
 * 商品分类路由
 */

export default class Category extends Component {

    state = {
        categorys: [],  //一级分类列表
        loading: false,
    }

    /**
     *初始化Table所有列的数组
     *
     * @memberof Category
     */
    initColumns() {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                dataIndex: '',  //显示对应的属性名
                width: 260,
                key: 'x',
                render: () => (     //返回需要显示的操作标签
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                )
            },

        ];
    }


    /**
     *异步获取一级分类列表
     *
     * @memberof Category
     */
    async getCategory() {
        this.setState({ loading: true })
        const res = await reqCategotys('0');
        this.setState({ loading: false })
        if (res.status === 0) {
            const categotys = res.data;
            this.setState({ categotys })
        } else {
            message.error('获取列表失败')
        }
    }


    /**
     *componentWillMount: 将要装载，在render之前调用
     *为第一次render()准备数据
     * @memberof Category
     */
    componentWillMount() {
        this.initColumns();
    }



    /**
     *componentWillMount: 装载完成，在render之后调用
     *发送请求, 执行异步任务
     * @memberof Category
     */
    componentDidMount() {
        this.getCategory()
    }


    render() {
        const { categorys, loading } = this.props;
        const title = '一级分类列表';
        const extra = (
            <Button type="primary">
                <Icon type="plus" />
                添加
            </Button>
        )
        return (
            <Card title={title} extra={extra} style={{ width: '100%' }}>
                <Table rowKey='_id' bordered dataSource={categorys} columns={this.columns} loading={loading} pagination={{ defaultPageSize: 5, showQuickJumper: true }} />;
            </Card>
        )
    }
}