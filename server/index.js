import onCreateUser from './boot/on-create-user';
import publications from './boot/publications';
import methods from './boot/methods';
import clearDayCount from './boot/clear-day-count';

onCreateUser();
publications();
methods();
clearDayCount();