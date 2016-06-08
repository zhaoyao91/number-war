import schedule from 'node-schedule';
import Users from '../../common/collections/users';
import {Meteor} from 'meteor/meteor';

export default function () {
    if (process.env.CLEAR_DAY_COUNTS) {
        schedule.scheduleJob('0 0 0 * * *', Meteor.bindEnvironment(()=> {
            console.log('clear day counts of users at ' + new Date);
            Users._collection.update({}, {$set: {dayWinCount: 0, dayLoseCount: 0, dayScore: 0}}, {multi: true});
        }))
    }
}