import Users from '../../common/collections/users';
import {Meteor} from 'meteor/meteor';
import {CronJob} from 'cron';

export default function () {
    if (process.env.LOG_TEST_DATE) {
        new CronJob('* * * * * *', Meteor.bindEnvironment(()=>{
            console.log('test date: ', new Date, process.env.TZ);
        }), null, true)
    }
}