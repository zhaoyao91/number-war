import Users from '../../common/collections/users';
import {Meteor} from 'meteor/meteor';
import {CronJob} from 'cron';

export default function () {
    if (process.env.CLEAR_DAY_COUNTS_CRONTIME) {
        new CronJob(process.env.CLEAR_DAY_COUNTS_CRONTIME, Meteor.bindEnvironment(()=>{
            console.log('clear day counts of users at ' + new Date);
            Users._collection.update({}, {$set: {dayWinCount: 0, dayLoseCount: 0, dayScore: 0}}, {multi: true});
        }), null, true, 'UTC')
    }
}