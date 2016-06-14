import {ServiceConfigration} from 'meteor/service-configuration';

export default function () {
    ServiceConfiguration.configurations.upsert({
        service: "wechat-mp"
    }, {
        $set: {
            appId: 'wxcda6b0f59aaae1d8',
            secret: 'ffc0b67f4f10099cd457a2e469b7ea4b',
            scope: 'base_userinfo',
            loginStyle: 'redirect',
            mainId: 'openId'
        }
    });
}