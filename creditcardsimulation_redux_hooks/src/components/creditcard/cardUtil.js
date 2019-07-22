const getRange = (a, b) => Array((b - a) + 1).fill(a).map((ele, i) => ele + i)

const CARD_VALIDATION = {
    'American Express': { range: [34, 37], color: 'card-ae' },
    'China UnionPay': { range: [62, 88], color: 'card-cup' },
    'Diners ClubCarte Blanche': { range: getRange(300, 305), color: 'card-dcb' },
    'Diners Club International': { range: [309, 36, 38, 39], color: 'card-dci' },
    'Diners Club US & Canada': { range: [54, 55], color: 'card-diners-us-can' },
    'Discover Card': { range: [6011, 65].concat(getRange(622126, 622925)).concat(getRange(644, 649)), color: 'card-dc' },
    'JCB': { range: getRange(3528, 3589), color: 'card-jcb' },
    'Laser': { range: [6304, 6706, 6771, 6709], color: 'card-laser' },
    'Maestro': { range: [5018, 5020, 5038, 5612, 5893, 6759, 6761, 6762, 6763, 604, 6390], color: 'card-mastro' },
    'Dankort': { range: [5019], color: 'card-dnkrt' },
    'MasterCard': { range: getRange(50, 53), color: 'card-mc' },
    'Visa': { range: [4], color: 'card-visa' },
    'Visa Electron': { range: [4026, 417500, 4405, 4508, 4844, 4913, 4917], color: 'card-ve' }
}

export const getCardColor = (type = 'UNKNOWN') => {
    if (CARD_VALIDATION.hasOwnProperty(type)) {
        return CARD_VALIDATION[type].color
    }

    return 'card-others'
}


export const getCardType = (cardNum, cardType = 'UNKNOWN') => {

    if (cardNum) {
        for (let [type, sets] of Object.entries(CARD_VALIDATION)) {
            // eslint-disable-next-line no-loop-func
            sets.range.forEach(eachSet => {
                if (eachSet + '' === cardNum.substr(0, (eachSet + '').length)) {
                    cardType = type;
                }
            })
        }
    }
    return cardNum ? cardType : 'UNKNOWN';
}

export const encryptCard = (cardNum) => {
    return cardNum.split('-').map(
        ele => ele.split('').map(
            (x, i) => {
                let data = Number(x.charCodeAt(0)) + i
                if (i !== (ele.length - 1))
                    data = data + ','
                return data;
            }
        ).join('')
    ).join('@')
}
