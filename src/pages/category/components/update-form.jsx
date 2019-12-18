import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
    Form,
    Input
} from 'antd';


class UpdateForm extends Component {

    static propTypes = {
        categoryName: propTypes.string.isRequired,
        setForm : propTypes.func.isRequired
    }

    componentWillMount() {
        //将form对象通过setForm()传提给父组件
        this.props.setForm(this.props.form)   
    }

    render() {
        const {categoryName} = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Form.Item>
                    {getFieldDecorator('categorysName', {
                        initialValue: categoryName,
                        rules: [{ required: true, message: '分类名称必须输入!' }],
                    })(
                        <Input placeholder="请输入分类名称" />
                    )}
                    
                </Form.Item>
            </Form>
        )
    }
}
const warpUpdateForm = Form.create()(UpdateForm);
export default warpUpdateForm;