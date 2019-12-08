import React, { Component } from "react";
import './login.less';
import logo from './images/logo.jpg';
import { Form, Icon, Input, Button, message} from 'antd';
import { reqLogin } from '../../api';
import memoryUtils from "../../utils/memoryUtils";

// 登录路由组件
class Login extends Component {
    handleSubmit = (e) => {
        //阻止默认行为
        e.preventDefault();

        //对所有表单字段验证
        this.props.form.validateFields(async (err, values) => {
            // 校验成功
            if (!err) {
                const { username, password } = values;
                const res = await reqLogin(username, password);
                if (res.status===0) {   //登录成功
                    message.success('登录成功');
                    const user = res.data;
                    memoryUtils.user = user;    //存储当前用户的user
                    this.props.history.replace('/');
                }else{
                    message.error(res.msg);
                }
            } else {
                console.log('error');
            }
        });

        // const form = this.props.form;
        //获取表单项的输入数据
        // const values = form.getFieldsValue();
        // console.log(values);
    }


    /**
     *  @memberof Login
     *  自定义密码验证规则
     * 
     */
    validatorPwd = (rule, value, callback) => {
        
        if (!value) {
            callback('必须输入密码!');
        } else if (value.length < 4) {
            callback('密码不能小于4位!');
        } else if (value.length > 12) {
            callback('密码不能大于12位!');
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线!');
        } else {
            callback()  //验证通过
        }
    }

    render() {
        //得到form对象
        const form = this.props.form;
        const { getFieldDecorator } = form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="" />
                    <h1>React：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username', {
                                    //声明式验证, 直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        { required: true, whitespace: true, message: '必须输入用户名!' },
                                        { min: 4, message: '用户名最少4位!' },
                                        { max: 12, message: '用户名最多12位!' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线!' },
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {
                                            validator: this.validatorPwd
                                        }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />,
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                        </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/**
 * 1.高阶函数   
        1).一类特别的函数
            a.接受函数类型的参数
            b.返回值是函数
        2).常见
            a. 定时器: setTimeout()/setInterval()
            b. Promise: Promise(() => {})   then(value => {}, reason => {})
            c. 数组遍历相关的方法: forEach() / filter() / map() / find() findIndex()
            d. fn.bind()
            e. Form.create()(Login)
        3).高阶函数更新状态, 更加具有扩展性
 * 2.高阶组件
        1).本质就是一个函数 
        2).接受一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
        3).作用: 扩展组件的功能
        4).作用: 高阶组件也是高阶函数, 接受一个组件函数, 返回的是一个新的组件函数
 */

//包装Form组件 生成一个新的组件 Form(Login)
//新组件会向Form组件传递一个对象属性: form
const wrapLogin = Form.create()(Login);
export default wrapLogin;
