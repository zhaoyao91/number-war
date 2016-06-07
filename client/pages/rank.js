import React from 'react';
import {Tabs, Tab, ListGroup, ListGroupItem} from 'react-bootstrap';
import {createContainer} from 'meteor/react-meteor-data';
import Users from '../../common/collections/users';
import UserGameInfoModal from '../app-comps/user-game-info-modal';

class Page extends React.Component {
    render() {
        const {dayRankList, rankList} = this.props;

        return <div>
            <h1 style={{margin: '0 0 20px 0'}}>排行榜</h1>
            <Tabs id="rank-tabs">
                <Tab eventKey={1} title="今日排行">
                    <ListGroup>
                        {dayRankList.map((user, index)=> {
                            return <RankItem key={index} index={index+1} user={user}/>
                        })}
                    </ListGroup>
                </Tab>
                <Tab eventKey={2} title="历史排行">
                    <ListGroup>
                        {rankList.map((user, index)=> {
                            return <RankItem key={index} index={index+1} user={user}/>
                        })}
                    </ListGroup>
                </Tab>
            </Tabs>
        </div>
    }
}

const Container = createContainer(props=> {
    Meteor.subscribe('Users.top100');
    Meteor.subscribe('Users.dayTop100');

    const rankList = Users.find({}, {sort: {score: -1}, limit: 100}).fetch();
    const dayRankList = Users.find({}, {sort: {dayScore: -1}, limit: 100}).fetch();

    return {rankList, dayRankList};
}, Page);

export default Container;

class RankItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    render() {
        const {index, user} = this.props;

        return <ListGroupItem onClick={this.openModal.bind(this)}>
            <h3>{index}. {_.get(user, 'username')}</h3>
            <p style={{overflow: 'auto'}}>
                <span style={{float: 'left', marginRight: '20px'}}>今日得分：{_.get(user, 'dayScore')}</span>
                <span style={{float: 'left'}}>历史得分：{_.get(user, 'score')}</span>
            </p>
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
}