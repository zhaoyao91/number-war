import React from 'react';
import {Button, Panel, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import Alert from 'react-s-alert';
import {FlowRouter} from 'meteor/kadira:flow-router';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        const {username, password} = this.state;

        return <div>
            <h1 style={{textAlign: 'center'}}>数字大战</h1>

            <Panel style={{margin: 'auto', maxWidth: '400px', marginTop: '20px'}}>
                <form onSubmit={e=>{e.preventDefault(); this.login()}}>
                    <FormGroup>
                        <ControlLabel>用户名</ControlLabel>
                        <FormControl value={username} onChange={e=>this.setState({username: e.target.value})}/>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>密码</ControlLabel>
                        <FormControl type="password" value={password}
                                     onChange={e=>this.setState({password: e.target.value})}/>
                    </FormGroup>

                    <Button bsStyle="primary" style={{width: '100%'}} type="submit">注册 / 登录</Button>
                </form>
            </Panel>
        </div>
    }

    login() {
        const username = this.state.username.trim();
        const password = this.state.password.trim();

        if (!username) {
            return Alert.error('请输入用户名。');
        }

        if (!password) {
            return Alert.error('请输入密码。')
        }

        Meteor.loginWithPassword({username: username}, password, (err)=> {
            if (err) {
                if (err.reason === 'User not found') {
                    // try to signup
                    Accounts.createUser({username: username, password: password}, (err)=> {
                        if (err) {
                            Alert.error('注册失败。');
                            console.error(err);
                        }
                        else {
                            FlowRouter.go('help');
                        }
                    })
                }
                else if (err.reason === 'Incorrect password') {
                    Alert.error('密码错误。');
                }
                else {
                    Alert.error('登录失败');
                    console.error(err);
                }
            }
            else {
                FlowRouter.go('game');
            }
        })
    }
}

export default Page;