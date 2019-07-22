exports.decryptCard = (cardNum) => {
    return cardNum.split('@').map(
        ele => ele.split(',').map(
            (x, i) => String.fromCharCode(Number(x) - i)
        ).join('')
    ).join('-');
}