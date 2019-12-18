import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
    Form,
    Select,
    Input
} from 'antd';

const { Option } = Select;

class AddForm extends Component {

    static propTypes = {
        categorys: propTypes.array.isRequired,  //一级分类数组
        parentId: propTypes.string.isRequired,  //父分类Id
        setForm : propTypes.func.isRequired     //用来传递form对象的函数
    }

    componentWillMount() {
        //将form对象通过setForm()传提给父组件
        this.props.setForm(this.props.form)   
    }

    render() {
        const {categorys, parentId} = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Form.Item>
                    {getFieldDecorator('parentId', {
                        initialValue:parentId 
                     })( 
                        <Select>
                            <Option value="0">一级分类</Option>
                            {
                                categorys.map((c, index) => <Option value={c._id} key={index}>{c.name}</Option>)
                                
                            }
                        </Select>
                     )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('categorysName', {
                        initialValue:'',
                        rules: [{ required: true, message: '分类名称必须输入!' }],
                    })(
                        <Input placeholder="请输入分类名称" />
                    )}
                    
                </Form.Item> 
            </Form>
        )
    }
}
const warpAddForm = Form.create()(AddForm);
export default warpAddForm;