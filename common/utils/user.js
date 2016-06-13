import {Meteor} from 'meteor/meteor';

const utils = {
   getAvatarUrl(user) {
       return user.avatar || '/logo/logo-m.png'
   }
};

export default utils;