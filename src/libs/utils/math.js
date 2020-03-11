export function getRandomNumber(number) {
    return Math.random() * (number - 1);
}

export function getNextRoundRobin(total, current) {
    console.log('---------getNext----',current);
    if(current > total) {
        return 0;
    }
    return current=current+1;
}