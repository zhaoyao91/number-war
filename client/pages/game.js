import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import _ from 'lodash';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import Users from '../../common/collections/users';
import Alert from 'react-s-alert';
import UserGameInfoModal from '../app-comps/user-game-info-modal';
import {FlowRouter} from 'meteor/kadira:flow-router';

class Page extends React.Component {
    componentWillMount() {
        this.observeUserFight(this.props.user);
    }

    componentWillUpdate(nextProps) {
        if (_.get(this.props.user, '_id') !== _.get(nextProps.user, '_id')) {
            setTimeout(()=>this.observeUserFight(nextProps.user), 0);
        }
    }

    componentWillUnmount() {
        this.observer && this.observer.stop();
    }

    render() {
        const {user, winners} = this.props;

        const number = _.get(user, 'number');

        return <div>
            <h1 style={{margin: '0 0 20px 0'}}>战斗吧！</h1>

            <p style={{marginBottom: '20px'}}>还不会玩？<a href={FlowRouter.path('help')}>赶紧学一把！</a></p>

            <p style={{marginBottom: '20px'}}>打累了？<a href={FlowRouter.path('rank')}>看看排行~</a></p>

            <ListGroup style={{marginBottom: '101px'}}>
                {
                    winners.map(winner=> {
                        return <TargetUserNumberItem key={winner._id} user={winner}/>
                    })
                }
            </ListGroup>

            <UserNumberPanel user={user}/>
        </div>
    }

    observeUserFight(user) {
        const userId = _.get(user, '_id');

        this.observer && this.observer.stop();
        if (userId) {
            this.noLastFight = !_.get(Users.findOne({_id: userId}), 'lastFight');
            this.observer = Users.find({_id: userId}).observeChanges({
                changed: (id, fields)=> {
                    console.log(id, fields);
                    if (fields.lastFight) {
                        if (this.noLastFight) {
                            this.noLastFight = false;
                        }
                        else {
                            if (fields.lastFight.result === 'win') {
                                Alert.success(`你战胜了${fields.lastFight.username}。`, {timeout: 2000})
                            }
                            else {
                                Alert.info(`你败给了${fields.lastFight.username}。`, {timeout: 2000})
                            }
                        }
                    }
                }
            });
        }
    }
}

const Container = createContainer((props)=> {
    const user = Meteor.user();
    const userId = _.get(user, '_id', '');

    Meteor.subscribe('Users.gameData', userId);
    Meteor.subscribe('Users.latestWinners');

    const winners = Users.find({_id: {$ne: userId}}, {sort: {lastWinAt: -1}}).fetch();

    return {
        user: user,
        winners: winners
    }
}, Page);

export default Container;

class UserNumberPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    render() {
        const {user} = this.props;

        return <div className="container" style={{position: 'fixed', left: 0, right: 0, bottom: 0}}>
            <Panel
                style={{marginBottom: 0, backgroundColor: '#eeeeee', cursor: 'pointer'}}
                onClick={this.openModal.bind(this)}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1 style={{flexShrink: 1, overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '20px', minWidth: 0}}>{_.get(user, 'username')}</h1>
                    <h1>{_.get(user, 'number')}</h1>
                </div>
                <UserGameInfoModal show={this.state.showModal} onClose={this.closeModal.bind(this)}
                                   userId={_.get(user, '_id')}/>
            </Panel>
        </div>
    }

    openModal() {
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false})
    }
}

class TargetUserNumberItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    render() {
        const {user} = this.props;

        return <ListGroupItem style={{display: 'flex', justifyContent: 'space-between'}}
                              onClick={this.fight.bind(this, _.get(user, '_id'))}>
            <h1 style={{overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '20px', minWidth: 0}}>{_.get(user, 'username')}</h1>
            <h1>{_.get(user, 'number')}</h1>
            <UserGameInfoModal show={this.state.showModal} onClose={this.closeModal.bind(this)}
                               userId={_.get(user, '_id')}/>
        </ListGroupItem>
    }

    openModal() {
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false})
    }

    fight(userId) {
        Meteor.call('Game.fight', userId, (err, win)=> {
            if (err) {
                if (err.error === 'too-many-requests') {
                    Alert.error('这也太快了吧>w<', {timeout: 2000})
                }
                else {
                    Alert.error('游戏失败。');
                    console.error(err);
                }
            }
        })
    }
}