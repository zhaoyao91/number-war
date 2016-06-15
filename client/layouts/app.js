import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Alert from 'react-s-alert';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {ActiveRoute} from 'meteor/zimme:active-route';
import ChangePasswordModal from '../app-comps/change-password-modal';
import _ from 'lodash';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChangePasswordModal: false
        }
    }

    render() {
        const {main, user} = this.props;

        return <div>
            <header>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#" onClick={this.goHome.bind(this)}>数字大战</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem active={ActiveRoute.name('rank')} href={FlowRouter.path('rank')}>排行榜</NavItem>
                            <NavItem active={ActiveRoute.name('game')} href={FlowRouter.path('game')}>战斗</NavItem>
                            <NavItem active={ActiveRoute.name('help')} href={FlowRouter.path('help')}>训练营</NavItem>
                        </Nav>
                        {
                            user && <Nav pullRight>
                                {
                                    user.wechatUser ?
                                        <NavItem href="#" onClick={()=>Meteor.logout()}>退出</NavItem> :
                                        <NavDropdown title="设置" id="basic-nav-dropdown">
                                            <MenuItem href="#" onClick={this.setNickname.bind(this)}>修改昵称</MenuItem>
                                            <MenuItem href="#" onClick={this.setAvatar.bind(this)}>修改头像</MenuItem>
                                            <MenuItem href="#"
                                                      onClick={()=>this.setState({showChangePasswordModal:true})}>修改密码</MenuItem>
                                            <MenuItem href="#" onClick={()=>Meteor.logout()}>退出</MenuItem>
                                            <ChangePasswordModal show={this.state.showChangePasswordModal}
                                                                 onClose={()=>this.setState({showChangePasswordModal:false})}/>
                                        </NavDropdown>
                                }
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Navbar>
            </header>

            <main>
                <div className="container">
                    {main}
                </div>
                <Alert stack={{limit: 3}} effect="scale" position="top-left"/>
            </main>

            <footer>

            </footer>
        </div>
    }

    setNickname() {
        let nickname = prompt('请输入新昵称');
        if (typeof nickname === 'string') {
            nickname = nickname.trim();
            if (!nickname) return Alert.error('昵称不能为空。');
        }
        else return;

        Meteor.call('Users.setNickname', nickname, err=> {
            if (err) {
                console.error(err);
                Alert.error('昵称设置失败。')
            }
            else {
                Alert.success('昵称设置成功。')
            }
        })
    }

    setAvatar() {
        let avatar = prompt('请输入头像URL');
        if (typeof avatar === 'string') avatar = avatar.trim();
        else return;

        Meteor.call('Users.setAvatar', avatar, err=> {
            if (err) {
                console.error(err);
                Alert.error('头像设置失败。')
            }
            else {
                Alert.success('头像设置成功。')
            }
        })
    }

    goHome() {
        const {user} = this.props;
        if (user) {
            FlowRouter.go('game');
        }
        else {
            FlowRouter.go('login');
        }
    }
}

const Container = createContainer((props)=> {
    Meteor.subscribe('Users.me');

    const user = Meteor.user();

    //Meteor.user() false
    //ActiveRoute.name('login') false
    //Meteor.logginIn() false
    //没有登录 && 当前user为空 && 当前路由不在login路径
    if (!Meteor.loggingIn() && !user && !ActiveRoute.name('login')) {
        FlowRouter.go('login');
    }

    return {
        user: user
    }
}, Layout);

export default Container