import React from 'react';
import {Button, Modal, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';
import {Accoutns} from 'meteor/accounts-base';
import Alert from 'react-s-alert';

class Comp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }

    render() {
        const {show, onClose} = this.props;

        return <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>修改密码</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <FormGroup>
                        <ControlLabel>旧密码</ControlLabel>
                        <FormControl type="password" value={this.state.oldPassword}
                                     onChange={e=>this.setState({oldPassword: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>新密码</ControlLabel>
                        <FormControl type="password" value={this.state.newPassword}
                                     onChange={e=>this.setState({newPassword: e.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>确认新密码</ControlLabel>
                        <FormControl type="password" value={this.state.confirmPassword}
                                     onChange={e=>this.setState({confirmPassword: e.target.value})}/>
                    </FormGroup>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="primary" onClick={this.changePassword.bind(this)}>修改密码</Button>
                <Button onClick={onClose}>关闭</Button>
            </Modal.Footer>
        </Modal>
    }

    changePassword() {
        const {oldPassword, newPassword, confirmPassword} = this.state;
        if (!oldPassword) return Alert.error('请输入旧密码。');
        if (!newPassword) return Alert.error('请输入新密码。');
        if (!confirmPassword) return Alert.error('请确认新密码。');
        if (newPassword !== confirmPassword) return Alert.error('两次输入的密码不相同。');

        Accounts.changePassword(oldPassword, newPassword, err=> {
            if (err) {
                if (err.reason === 'Incorrect password') {
                    Alert.error('密码错误。')
                }
                else {
                    console.error(err);
                    Alert.error('修改密码失败。')
                }
            }
            else {
                Alert.success('修改密码成功。');
                this.props.onClose();
            }
        })
    }
}

export default Comp;