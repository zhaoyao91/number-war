import Users from '../../common/collections/users';
import {Meteor} from 'meteor/meteor';
import gameUtils from '../../common/utils/game';
import {check} from 'meteor/check';
import {DDPRateLimiter} from 'meteor/ddp-rate-limiter';
import _ from 'lodash';

export default function () {
    Meteor.methods({
        'Users.setNickname'(nickname) {
            check(nickname, String);

            const userId = Meteor.userId();
            if (!userId) {
                throw new Meteor.Error('not-login', 'user is not logged-in');
            }

            Users.update({_id: userId}, {
                $set: {
                    nickname: nickname
                }
            });
        },

        'Game.fight'(targetUserId) {
            check(targetUserId, String);

            // check login
            const user = Meteor.user();
            if (!user) {
                throw new Meteor.Error('not-login', 'user is not logged-in');
            }

            // find target user
            const targetUser = Users.findOne({_id: targetUserId});
            if (!targetUser) {
                throw new Meteor.Error('no-target-user', 'cannot find target user');
            }

            if (user._id === targetUser._id) {
                throw new Meteor.Error('same-user', 'user cannot fight with itself');
            }

            // fight the game
            const win = gameUtils.fight(user.fightMode, user.number, targetUser.number);
            let winner, loser;
            if (win) {
                winner = user;
                loser = targetUser;
            }
            else {
                winner = targetUser;
                loser = user;
            }

            const now = new Date;

            // update winner
            const winnerSet = {
                number: gameUtils.updateWinNumber(winner.number, loser.number),
                fightMode: gameUtils.getRandomFightMode(),
                fightOrder: now.getTime() - _.result(winner, 'lastLoseAt.getTime', 0),
                lastWinAt: now,
                lastFight: {
                    result: 'win',
                    username: loser.username,
                    fightAt: now
                },
                score: winner.winCount + 1 - winner.loseCount,
                dayScore: winner.dayWinCount + 1 - winner.dayLoseCount
            };
            const winnerInc = {
                winCount: 1,
                dayWinCount: 1
            };
            Users.update({_id: winner._id}, {
                $set: winnerSet,
                $inc: winnerInc
            }, err=>err && console.error(err));

            // update loser
            const loserSet = {
                number: gameUtils.updateLoseNumber(loser.number, winner.number),
                fightMode: gameUtils.getRandomFightMode(),
                fightOrder: _.result(loser, 'lastWinAt.getTime', 0) - now.getTime(),
                lastLoseAt: now,
                lastFight: {
                    result: 'lose',
                    username: winner.username,
                    fightAt: now
                },
                score: loser.winCount - (loser.loseCount + 1),
                dayScore: loser.dayWinCount - (loser.dayLoseCount + 1)
            };
            const loserInc = {
                loseCount: 1,
                dayLoseCount: 1
            };
            Users.update({_id: loser._id}, {
                $set: loserSet,
                $inc: loserInc
            }, err=>err && console.error(err));

            return win;
        }
    });

    DDPRateLimiter.addRule({
        userId: userId=>true,
        type: 'method',
        name: 'Game.fight'
    }, 1, 1000);
}