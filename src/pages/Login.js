import React from 'react';
import {Icon, Form, Input, Button, message} from 'antd';
import {post} from '../utils/request';
require('../styles/login-page.css');
import createHistory from 'history/createHashHistory';
const history = createHistory();
const FormItem = Form.Item;

class Login extends React.Component {
    constructor () {
        super();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if(!err) {
                post('http://localhost:3000/login', values)
                    .then(res => {
                        message.info('登陆成功');
                        history.push('/');
                    })
            }else {
                message.info('登录失败，账号或密码错误');
            }
        })
    }

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <div className='wrapper'>
                <div className='body'>
                    <header className='header'>ReactManager</header>
                    <section className='form'>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('account', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入管理员账号',
                                            type: 'string'
                                        }
                                    ]
                                })(
                                    <Input type="text" addonBefore={<Icon type="user" />} />
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码',
                                            type: 'string'
                                        }

                                    ]
                                })(
                                    <Input type="password" addonBefore={<Icon type="lock" />} />
                                )}
                            </FormItem>

                            <Button className='btn' type="primary" htmlType="submit">Sign In</Button>
                        </Form>
                    </section>
                </div>
            </div>
        )
    }
}

Login = Form.create()(Login);

export default Login;