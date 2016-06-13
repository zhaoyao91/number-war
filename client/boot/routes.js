import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

import AppLayout from '../layouts/app';
import LoginPage from '../pages/login';
import RankPage from '../pages/rank';
import HelpPage from '../pages/help';
import GamePage from '../pages/game';

const route = FlowRouter.route.bind(FlowRouter);

export default function () {
    route('/', {
        name: 'index',
        action(p, q) {
            FlowRouter.go('game');
        }
    });

    route('/login', {
        name: 'login',
        action(p, q) {
            mount(AppLayout, {
                main: <LoginPage />
            })
        }
    });



    route('/help', {
        name: 'help',
        action(p, q) {
            mount(AppLayout, {
                main: <HelpPage />
            })
        }
    });

    route('/rank', {
        name: 'rank',
        action(p, q) {
            mount(AppLayout, {
                    main: <RankPage />
        })
        }
    });

    route('/game', {
        name: 'game',
        action(p, q) {
            mount(AppLayout, {
                main: <GamePage />
            })
        }
    });
}