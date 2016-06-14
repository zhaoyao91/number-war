import onCreateUser from './boot/on-create-user';
import publications from './boot/publications';
import methods from './boot/methods';
import clearDayCount from './boot/clear-day-count';
import configWechatMP from './boot/config-wechat-mp';
import onLogin from './boot/on-login';

onCreateUser();
publications();
methods();
clearDayCount();
configWechatMP();
onLogin();