import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import Alert from 'react-s-alert';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {ActiveRoute} from 'meteor/zimme:active-route';

class Layout extends React.Component {
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
                                <NavItem href="#" onClick={this.logout.bind(this)}>退出</NavItem>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Navbar>
            </header>

            <main>
                <div className="container">
                    {main}
                </div>
                <Alert stack={{limit: 3}} effect="scale" position="bottom-left"/>
            </main>

            <footer>

            </footer>
        </div>
    }

    logout() {
        Meteor.logout();
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
    const user = Meteor.user();

    if (!Meteor.loggingIn() && !user && !ActiveRoute.name('login')) {
        FlowRouter.go('login');
    }

    return {
        user: user
    }
}, Layout);

export default Container