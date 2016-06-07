const NUMBER_LENGTH = 1e4;

const utils = {
    getNewNumber() {
        return Math.floor(Math.random() * NUMBER_LENGTH);
    },

    fight(attackNumber, defenceNumber) {
        const reducedAttackNumber = utils.reduceNumber(attackNumber);
        const reducedDefenceNumber = utils.reduceNumber(defenceNumber);
        return reducedAttackNumber > reducedDefenceNumber;
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
        return utils.getNewNumber();
    }
};

export default utils;