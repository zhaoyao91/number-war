import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const schema = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Object,
        blackbox: true,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    heartbeat: {
        type: Date,
        optional: true
    },

    // game data

    number: {
        type: Number
    },
    
    fightMode: {
        type: String,
        allowedValues: ['bigger', 'smaller']
    },

    fightOrder: {
        type: Number,
        index: true
    },

    winCount: {
        type: Number,
        index: true,
        defaultValue: 0
    },

    loseCount: {
        type: Number,
        index: true,
        defaultValue: 0
    },

    score: {
        type: Number,
        index: true,
        defaultValue: 0
    },

    dayWinCount: {
        type: Number,
        index: true,
        defaultValue: 0
    },

    dayLoseCount: {
        type: Number,
        index: true,
        defaultValue: 0
    },
    
    dayScore: {
        type: Number,
        index: true,
        defaultValue: 0
    },

    lastWinAt: {
        type: Date,
        optional: true
    },

    lastLoseAt: {
        type: Date,
        optional: true
    },

    lastFight: {
        type: new SimpleSchema({
            result: {
                type: String,
                allowedValues: ['win', 'lose']
            },
            username: {
                type: String
            },
            fightAt: {
                type: Date
            }
        }),
        optional: true
    }
});

const Users = Meteor.users;

Users.attachSchema(schema);

export default Users;