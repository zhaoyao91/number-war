import {Accounts} from 'meteor/accounts-base';
import GameUtils from '../../common/utils/game';

export default function () {
    Accounts.onCreateUser(function (options, user) {
        if (options.profile) {
            user.profile = options.profile;
        }

        user.number = GameUtils.getNewNumber();
        user.fightMode = GameUtils.getRandomFightMode();
        user.fightOrder = 0;
        
        return user;
    })
}
