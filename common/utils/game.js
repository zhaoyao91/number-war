import _ from 'lodash';

const NUMBER_LENGTH = 1e3;

const utils = {
    getNewNumber() {
        return Math.floor(Math.random() * NUMBER_LENGTH);
    },

    getRandomFightMode() {
        return _.random(0, 1) ? 'smaller' : 'bigger';
    },

    fight(fightMode, attackNumber, defenceNumber) {
        const reducedAttackNumber = utils.reduceNumber(attackNumber);
        const reducedDefenceNumber = utils.reduceNumber(defenceNumber);
        
        if (fightMode === 'bigger') return reducedAttackNumber > reducedDefenceNumber;
        else if (fightMode === 'smaller') return reducedAttackNumber < reducedDefenceNumber;
        else return false;
    },

    reduceNumber(number) {
        number = Number(number);
        if (Number.isNaN(number)) {
            throw new Error('wrong number');
        }
        number = Math.abs(number);

        let result = 0;
        while (number > 0) {
            result = result + (number % 10);
            number = Math.floor(number / 10);
        }
        result = result % 10;

        return result;
    },

    updateWinNumber(winNumber, loseNumber) {
        return (winNumber + loseNumber) % NUMBER_LENGTH;
    },

    updateLoseNumber(loseNumber, winNumber) {
        return Math.abs(winNumber - loseNumber) % NUMBER_LENGTH;
    }
};

export default utils;