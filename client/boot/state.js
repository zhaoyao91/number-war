import {Session} from 'meteor/session';

export default function() {
    Session.set('allowFight', true);
}