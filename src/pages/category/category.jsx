import React, { Component } from 'react'
import {
    Card,
    Table,
    Button,
    Icon,
    message,
    Modal
} from 'antd'

import LinkButton from '../../components/link-button'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'

import AddForm from './components/add-form.jsx'
import UpdateForm from './components/update-form.jsx'

/*
商品分类路由
 */
export default class Category extends Component {

    state = {
        loading: false, // 是否正在获取数据中
        categorys: [], // 一级分类列表
        subcategorys: [], // 二级分类列表
        parentId: '0',  //当前需要显示的分类列表的parendId
        parentName: '',  //当前需要显示的分类列表的父分类名称
        showStatus: 0,  //标识添加 / 修改的确认框是否展示, 0:都不显示  1:显示添加  2:显示修改
    }

    /*
    初始化Table所有列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                title: '分类',
                dataIndex: 'name', // 显示数据对应的属性名
            },
            {
                title: '操作',
                width: 300,
                render: (category) => ( // 返回需要显示的界面标签
                    <span>
                        <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
                        {/*如何向事件回调函数传递参数: 先定义一个匿名函数, 在函数调用处理的函数并传入数据*/}
                        {this.state.parentId === '0' ? <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看子分类</LinkButton> : null}
                    </span>
                )
            }
        ]
    }

    /**
     * 异步获取一级 / 二级分类列表
     * 如果parentId没有指定, 则根据状态中的parentId请求
     */
    getCategorys = async (parentId) => {
        this.setState({ loading: true });
        parentId = parentId || this.state.parentId;
        console.log(parentId);
        const res = await reqCategorys(parentId);
        this.setState({ loading: false })
        if (res.status === 0) {
            //取出分类数组（可能是一级，也可能是二级）
            const categorys = res.data;

            if (parentId === '0') {
                //一级分类列表数据
                this.setState({
                    categorys
                })
            } else {
                //二级分类列表数据
                this.setState({
                    subCategorys: categorys
                })
            }

        } else {
            message.error('获取分类列表失败')
        }

    }

    /**
     * 显示指定一级分类对应的二级分类列表
     */
    showSubCategorys(category) {
        //更新状态
        this.setState({
            parentId: category._id,
            parentName: category.name,
        }, () => {    //在状态更新且重新render（）后调用
            this.getCategorys()
        })
        //setState()不能立即获取最新的状态：因为setState()是异步更新状态的
    }

    /**
     * 点击显示一级分类列表
     */
    showCategorys() {
        //更新为显示一级列表的状态
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }

    /**
     * 点击取消: 隐藏确定框
     */
    handleCancel() {

        this.form.resetFields()

        this.setState({ showStatus: 0 })
    }

    /**
     * 点击显示'添加'的确定框
     */
    showAdd() {
        this.setState({ showStatus: 1 })
    }

    /**
     * 点击显示'修改'的确定框
     */
    showUpdate(category) {
        this.category = category;
        this.setState({ showStatus: 2 })
    }

    /**
     * 添加分类
     */
    addCategory() {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //1.隐藏确定框
                this.setState({ showStatus: 0 });
                console.log(this.form.getFieldsValue());
                const { parentId, categorysName } = values;
                //清除输入数据
                this.form.resetFields();
                console.log(parentId, this.state.parentId);
                //2.发送请求修改分类
                const res = await reqAddCategory(categorysName, parentId)
                if (res.status === 0) {

                    //添加的分类就是当前分类列表下的分类
                    if (parentId === this.state.parentId) {
                        //3.重新渲染当前列表
                        this.getCategorys()
                    } else if (parentId === '0') {    //(二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级分类列表
                        this.getCategorys('0')
                    }
                } else {
                    message.error(res.msg)
                }
            }
        })
    }

    /**
     * 修改分类
     */
    updateCategory() {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //1.隐藏确定框
                this.setState({ showStatus: 0 });

                const categoryId = this.category._id;
                const { categoryName } = values

                //清除输入数据
                this.form.resetFields()

                //2.发送请求修改分类
                const res = await reqUpdateCategory({ categoryId, categoryName })
                if (res.status === 0) {
                    //3.重新渲染列表
                    this.getCategorys('0')
                }
            }
        });

    }

    /*
    为第一次render()准备数据
     */
    componentWillMount() {
        this.initColumns()
    }

    /*
    执行异步任务: 发异步ajax请求
     */
    componentDidMount() {
        // 获取一级分类列表显示
        this.getCategorys();
    }

    render() {

        // 读取状态数据
        const { categorys, subCategorys, parentId, parentName, loading, showStatus } = this.state;
        const category = this.category || {};
        // 读取指定的分类
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategorys.bind(this)}>一级分类列表</LinkButton>
                <Icon type="arrow-right" style={{ marginRight: 5 }} />
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button type="primary" onClick={this.showAdd.bind(this)}>
                <Icon type="plus"></Icon>
                添加
        </Button>
        )

        return (

            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    dataSource={parentId === '0' ? categorys : subCategorys}    //parendId等于‘0’，渲染一级分类， 否则展示二级分类
                    columns={this.columns}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                />

                <Modal
                    title="增加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <AddForm categorys={categorys} parentId={parentId} setForm={(form) => { this.form = form }} />
                </Modal>
                <Modal
                    title="修改分类"
                    visible={showStatus === 2}
                    onOk={this.updateCategory.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <UpdateForm categoryName={category.name} setForm={(form) => { this.form = form }} />
                </Modal>
            </Card>
        )
    }
}