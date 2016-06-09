import onCreateUser from './boot/on-create-user';
import publications from './boot/publications';
import methods from './boot/methods';
import clearDayCount from './boot/clear-day-count';
import logTestDate from './boot/log-test-date';

onCreateUser();
publications();
methods();
clearDayCount();
logTestDate();