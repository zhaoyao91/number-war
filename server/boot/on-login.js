import {Accounts} from 'meteor/accounts-base';
import _ from 'lodash';
import Users from '../../common/collections/users';

export default function () {
    Accounts.onLogin((attempt)=> {
        const user = attempt.user;
        if (_.get(user, 'services.wechat-mp')) {
            Users.update(user._id, {
                $set: {
                    nickname: _.get(user, 'services.wechat-mp.nickname'),
                    avatar: _.get(user, 'services.wechat-mp.headimgurl')
                }
            })
        }
    })
}
