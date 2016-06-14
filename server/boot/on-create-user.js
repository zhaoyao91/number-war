import {Accounts} from 'meteor/accounts-base';
import GameUtils from '../../common/utils/game';
import _ from 'lodash';

export default function () {
    Accounts.onCreateUser(function (options, user) {
        // we do not need profile
        // if (options.profile) {
        //     user.profile = options.profile;
        // }

        user.nickname = user.username || _.get(user, 'services.wechat-mp.nickname') || _.get(user, 'emails[0].address') || ('用户' + Math.floor(Math.random() * 1e6));
        user.avatar = _.get(user, 'services.wechat-mp.headimgurl');
        user.number = GameUtils.getNewNumber();
        user.fightMode = GameUtils.getRandomFightMode();
        user.fightOrder = 0;
        
        return user;
    })
}
