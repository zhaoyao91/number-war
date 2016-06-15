import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import _ from 'lodash';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import Users from '../../common/collections/users';
import Alert from 'react-s-alert';
import UserGameInfoModal from '../app-comps/user-game-info-modal';
import {FlowRouter} from 'meteor/kadira:flow-router';
import userUtils from '../../common/utils/user';
import Const from '../../common/const';

let allowFight = true;
const winAudio = new Audio('/audio/win.mp3');
const loseAudio = new Audio('/audio/lose.mp3');

class Page extends React.Component {
    componentWillMount() {
        //this.observeUserFight(this.props.user);
        //this.winAudio = new Audio('/audio/win.mp3');
        //this.loseAudio = new Audio('/audio/lose.mp3');
        //allowFight = true;
    }

    componentWillUpdate(nextProps) {
        //if (_.get(this.props.user, '_id') !== _.get(nextProps.user, '_id')) {
        //    setTimeout(()=>this.observeUserFight(nextProps.user), 0);
        //}

        this.scrollTop = document.body.scrollTop;
    }

    componentDidUpdate() {
        document.body.scrollTop = this.scrollTop;
    }

    componentWillUnmount() {
        //this.observer && this.observer.stop();
    }

    render() {
        const {user, fighters} = this.props;

        const number = _.get(user, 'number');

        return <div>
            <h1 style={{margin: '0 0 20px 0'}}>战斗吧！</h1>

            <p style={{marginBottom: '20px'}}>还不会玩？<a href={FlowRouter.path('help')}>赶紧学一把！</a></p>

            <p style={{marginBottom: '20px'}}>打累了？<a href={FlowRouter.path('rank')}>看看排行~</a></p>

            <ListGroup style={{marginBottom: '71px'}}>
                {
                    fighters.map((fighter, index)=> {
                        return <TargetUserNumberItem key={fighter._id} index={index+1} user={fighter}/>
                    })
                }
            </ListGroup>

            <UserNumberPanel user={user}/>
        </div>
    }

    //observeUserFight(user) {
    //    const userId = _.get(user, '_id');
    //    this.observer && this.observer.stop();
    //    if (userId) {
    //        this.observer = Users.find({_id: userId}).observeChanges({
    //            changed: (id, fields)=> {
    //                if (fields.lastFight) {
    //                    if (fields.lastFight.result === 'win') {
    //                        Alert.success(`你战胜了${fields.lastFight.nickname}。`, {timeout: 1000});
    //                        this.winAudio.play();
    //                    } else {
    //                        Alert.info(`你败给了${fields.lastFight.nickname}。`, {timeout: 1000});
    //                        this.loseAudio.play();
    //                    }
    //                }
    //            }
    //        });
    //    }
    //}
}

const Container = createContainer((props)=> {
    const user = Meteor.user();
    const userId = _.get(user, '_id', '');

    Meteor.subscribe('Users.gameData', userId);
    Meteor.subscribe('Users.fighters');

    const fighters = Users.find({_id: {$ne: userId}}, {sort: {fightOrder: -1}, limit: 99}).fetch();

    return {
        user: user,
        fighters: fighters
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
        const fightMode = _.get(user, 'fightMode');

        return <div className="container" style={{position: 'fixed', left: 0, right: 0, bottom: 0}}>
            <Panel
                style={{marginBottom: 0, backgroundColor: '#eeeeee', cursor: 'pointer'}}
                onClick={this.openModal.bind(this)}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1 style={{margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '20px', minWidth: 0}}>
                        {
                            !fightMode ? null
                                : fightMode === 'smaller' ? '比小'
                                : fightMode === 'bigger' ? '比大'
                                : null
                        }
                    </h1>
                    <h1 style={{margin: 0}}>{_.get(user, 'number')}</h1>
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

    shouldComponentUpdate(nextProps, nextState) {
        return !(this.props.index === nextProps.index && _.isEqual(this.props.user, nextProps.user) && this.state.showModal === nextState.showModal)
    }

    render() {
        const {index, user} = this.props;

        return <ListGroupItem style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <span style={{position: 'absolute', fontSize: '0.8rem', top: 0, left: '2px'}}>{index}</span>
                <img className="img-circle" onClick={e=>{e.stopPropagation();this.openModal()}}
                     style={{width: '48px', height: '48px', marginRight: '5px'}}
                     src={userUtils.getAvatarUrl(user)}/>
                <h1 style={{margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '5px', minWidth: 0}} onClick={this.fight.bind(this, _.get(user, '_id'))}>
                    {_.get(user, 'nickname')}
                </h1>
            </div>
            <h1 style={{margin: 0}} onClick={this.fight.bind(this, _.get(user, '_id'))}>{_.get(user, 'number')}</h1>
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
        if (!allowFight) {
            return Alert.error('这也太快了吧>w<', {timeout: 1000});
        }
        allowFight = false;
        Meteor.call('Game.fight', userId, new Date, (err, {win,nickname})=> {
            console.log(win);
            if(win){
                //win
                winAudio.play();
                Alert.success(`你战胜了${nickname}。`, {timeout: 1000});
            }else{
                if(win === null){
                    Alert.error('游戏失败。');
                }else{
                    loseAudio.play();
                    Alert.info(`你败给了${nickname}。`, {timeout: 1000});
                }
            }
            setTimeout(()=> {allowFight = true}, Const.fightInterval);
            if (err) {
                Alert.error('游戏失败。');
                console.error(err);
            }
        })
    }
}