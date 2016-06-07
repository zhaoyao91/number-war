import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import _ from 'lodash';
import {createContainer} from 'meteor/react-meteor-data';
import Users from '../../common/collections/users';

class Comp extends React.Component {
    render() {
        const {user, show, onClose} = this.props;

        return <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{_.get(user, 'username')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>今日战胜：{_.get(user, 'dayWinCount', 0)}</p>
                <p>今日战败：{_.get(user, 'dayLoseCount', 0)}</p>
                <p>今日得分：{_.get(user, 'dayScore', 0)}</p>
                <hr/>
                <p>历史战胜：{_.get(user, 'winCount', 0)}</p>
                <p>历史战败：{_.get(user, 'loseCount', 0)}</p>
                <p>历史得分：{_.get(user, 'score', 0)}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>关闭</Button>
            </Modal.Footer>
        </Modal>
    }
}

const Container = createContainer(props=> {
    const {userId=''} = props;
    Meteor.subscribe('Users.gameData', userId);
    return {
        user: Users.findOne({_id: userId})
    };    
}, Comp);

export default Container;