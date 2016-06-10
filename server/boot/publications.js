import Users from '../../common/collections/users';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
    Meteor.publish('Users.fighters', function () {
        return Users.find({}, {
            fields: {
                nickname: 1,
                number: 1,
                fightOrder: 1,
                // winCount: 1,
                // loseCount: 1,
                // dayWinCount: 1,
                // dayLoseCount: 1,
                // lastWinAt: 1,
                // lastLoseAt: 1,
                // lastFight: 1
            },
            sort: {
                fightOrder: -1
            },
            limit: 100
        })
    });

    Meteor.publish('Users.gameData', function (userId) {
        check(userId, String);
        return Users.find({_id: userId}, {
            fields: {
                number: 1,
                fightMode: 1,
                winCount: 1,
                loseCount: 1,
                dayWinCount: 1,
                dayLoseCount: 1,
                lastWinAt: 1,
                lastLoseAt: 1,
                lastFight: 1,
                score: 1,
                dayScore: 1
            }
        })
    });

    Meteor.publish('Users.top100', function () {
        return Users.find({}, {
            fields: {
                nickname: 1,
                // number: 1,
                // winCount: 1,
                // loseCount: 1,
                // dayWinCount: 1,
                // dayLoseCount: 1,
                // lastWinAt: 1,
                // lastLoseAt: 1,
                // lastFight: 1,
                score: 1,
                dayScore: 1
            },
            sort: {
                score: -1
            },
            limit: 100
        })
    });

    Meteor.publish('Users.dayTop100', function () {
        return Users.find({}, {
            fields: {
                nickname: 1,
                // number: 1,
                // winCount: 1,
                // loseCount: 1,
                // dayWinCount: 1,
                // dayLoseCount: 1,
                // lastWinAt: 1,
                // lastLoseAt: 1,
                // lastFight: 1,
                score: 1,
                dayScore: 1
            },
            sort: {
                dayScore: -1
            },
            limit: 100
        })
    });
}