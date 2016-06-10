import {Meteor} from 'meteor/meteor';

const utils = {
   getAvatarUrl(user) {
       return user.avatar || (Meteor.absoluteUrl() + 'logo/logo-m.png')
   }
};

export default utils;