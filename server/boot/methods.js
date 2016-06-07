import Users from '../../common/collections/users';
import {Meteor} from 'meteor/meteor';
import gameUtils from '../../common/utils/game';
import dateUtils from '../../common/utils/date';
import {check} from 'meteor/check';
import {DDPRateLimiter} from 'meteor/ddp-rate-limiter';

export default function () {
    Meteor.methods({
        'Game.fight'(targetUserId) {
            check(targetUserId, String);

            // check login
            const user = Meteor.user();
            if (!user) {
                throw new Meteor.Error('not-login', 'user is not logged-in');
            }

            // find target user
            const targetUser = Users.findOne({_id: targetUserId});

            // fight the game
            const win = gameUtils.fight(user.number, targetUser.number);
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
                lastWinAt: now,
                lastFightAt: now,
                lastFight: {
                    result: 'win',
                    username: loser.username,
                    fightAt: now
                },
                score: winner.winCount + 1 - winner.loseCount,
                dayScore: (dateUtils.inSameDay(winner.lastWinAt, now) ? winner.dayWinCount + 1 : 1) - (dateUtils.inSameDay(winner.lastLoseAt, now) ? winner.dayLoseCount : 0)
            };
            const winnerInc = {
                winCount: 1
            };

            if (dateUtils.inSameDay(winner.lastWinAt, now)) winnerInc.dayWinCount = 1;
            else winnerSet.dayWinCount = 1;

            Users.update({_id: winner._id}, {
                $set: winnerSet,
                $inc: winnerInc
            }, err=>err && console.error(err));

            // update loser
            const loserSet = {
                number: gameUtils.updateLoseNumber(loser.number, winner.number),
                lastLoseAt: now,
                lastFightAt: now,
                lastFight: {
                    result: 'lose',
                    username: winner.username,
                    fightAt: now
                },
                score: loser.winCount - (loser.loseCount + 1),
                dayScore: (dateUtils.inSameDay(loser.lastWinAt, now) ? loser.dayWinCount : 0) - (dateUtils.inSameDay(loser.lastLoseAt, now) ? loser.dayLoseCount + 1 : 0)
            };
            const loserInc = {
                loseCount: 1
            };
            if (dateUtils.inSameDay(loser.lastLoseAt, now)) loserInc.dayLoseCount = 1;
            else loserSet.dayLoseCount = 1;

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
    }, 5, 1000);
}