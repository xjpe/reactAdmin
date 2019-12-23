import React, { Component } from 'react';

import { Card, Select, Input, Button, Icon, Table } from "antd";
import LinkButton from '../../../components/link-button';
import {reqProducts} from '../../../api';
const { Option } = Select;
/**
 * 商品首页默认子路由页面
 */

export default class ProductHome extends Component {

    state = {
        products: [
            /*{
                "status":1,
                "img":[
                    "image-1554636776678.jpg",
                    "image-1557738385383.jpg",
                ],
                "_id":"5ca9e05db49ef916541160cd",
                "name":"联想ThinkPad Y480",
                "desc":"年度重量级新品，x390,T490全新登场,更加轻薄机身设计",
                "price":7800,
                "pCategortId":"5ca9d6c0b49ef916541160bb",
                "categortId":"5ca9db78b49ef916541160ca",
                "detail":"<p><span style=\"color:rgb(228,57,60);background-color:rgb(0,0,0)\"></span></p>",
                "__v":0
            },
            {
                "status":0,
                "img":[
                    "image-1554636776678.jpg",
                    "image-1557738385383.jpg",
                ],
                "_id":"5ca9e05db49ef916541161cd",
                "name":"苹果MacBook Pro",
                "desc":"2019年新款mbp上市, 全新15尺寸, 更大更精彩",
                "price":13600,
                "pCategortId":"5ca9d6c0b49ef916541160bb",
                "categortId":"5ca9db78b49ef916541160ca",
                "detail":"<p><span style=\"color:rgb(228,57,60);background-color:rgb(0,0,0)\"></span></p>",
                "__v":0
            }*/
        ],    //商品数组
    }

    initColumns() {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                align:'center',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                align:'center',
            },
            {
                title: '价格',
                dataIndex: 'price',
                align:'center',
                render:(price) => '￥' + price
            },
            {
                title: '状态',
                dataIndex: 'status',
                width:100,
                align:'center',
                render: (status) =>  {
                    return (
                        <span>
                            <Button type="primary">下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                align:'center',
                width:100,
                render: (product) =>  {
                    return (
                        <span>
                           <LinkButton>详情</LinkButton>
                           <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    async getProductList() {
        const res = await reqProducts('1','2');
        console.log(res);
        const products = res.data.list;
        if (res.status === 0) {
            this.setState({ products })
        }
    }

    componentDidMount() {
        this.initColumns();
        this.getProductList();
    }


    render() {

        const {products} = this.state;
            
        const title = (
            <span>
                <Select value='1' style={{ width: 150 }}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} />
                <Button type='primary'>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary'>
                <Icon type='plus' />
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table bordered rowKey='_id' dataSource={products} columns={this.columns} />;
            </Card>
        )
    }
}