import {ServiceConfigration} from 'meteor/service-configuration';

export default function () {
    ServiceConfiguration.configurations.upsert({
        service: "wechat-mp"
    }, {
        $set: {
            appId: process.env.WECHAT_MP_APPID,
            secret: process.env.WECHAT_MP_SECRET,
            scope: 'base_userinfo',
            loginStyle: 'redirect',
            mainId: 'openId'
        }
    });
}