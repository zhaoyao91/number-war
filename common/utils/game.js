import _ from 'lodash';
import Random from 'seed-random';

const NUMBER_LENGTH = 1e3;

const utils = {
    getNewNumber() {
        return Math.floor(Math.random() * NUMBER_LENGTH);
    },

    getRandomFightMode() {
        return Math.random() > 0.5 ? 'bigger' : 'smaller';
    },

    getNextFightMode(myNumber, targetNumber) {
        return Random(myNumber * 3 + targetNumber + 7)() > 0.5 ? 'bigger' : 'smaller';
    },

    fight(fightMode, attackNumber, defenceNumber) {
        const reducedAttackNumber = utils.reduceNumber(attackNumber);
        const reducedDefenceNumber = utils.reduceNumber(defenceNumber);

        if (fightMode === 'bigger') return reducedAttackNumber > reducedDefenceNumber;
        else if (fightMode === 'smaller') return reducedAttackNumber < reducedDefenceNumber;
        else return null;
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
        return utils.floatToInteger(Random(winNumber + loseNumber)());
    },

    updateLoseNumber(loseNumber, winNumber) {
        return utils.floatToInteger(Random(winNumber - loseNumber)());
    },

    floatToInteger(float) {
        return Math.floor(float * NUMBER_LENGTH);
    }
};

export default utils;