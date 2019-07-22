function getDecryptedString(arr = []) {
    let t = arr[0]
    for (let i = 1; i < arr.length; i = i + 2) {
        t--;
        console.log(`Case #${arr[0] - (t)}: ${decrypt(arr[i].split(' ')[0], arr[i + 1].split(' '))}`)

    }
}

function getRange(n = 2, x = []) {
    let range = {};
    for (let each of x) {
        factors(each).forEach(value => {
            range[value] = each;
        })
    }
    return Object.keys(range);
}

function factors(num) {

    let factors = [];
    while (num % 2 === 0) {
        factors.push(2);
        num = num / 2;
    }

    let sqrtNum = Math.sqrt(num);
    for (var i = 3; i <= sqrtNum; i++) {
        while (num % i === 0) {
            factors.push(i);
            num = num / i;
        }
    }

    if (num > 2) {
        factors.push(num);
    }

    return factors;
}

function decrypt(n = 2, x = []) {
    let range = getRange(n, x);
    let first = 0, str = '', code = 65;

    for (let i = 0; i < range.length; i++) {
        if (x[0] % range[i] === 0) {
            first = range[i];
            if (x[1] % (x[0] / first) === 0)
                i = range.length;
        }
    }
    str = String.fromCharCode(code + range.indexOf(first));

    x.forEach(each => {
        str += String.fromCharCode(code + (range.indexOf("" + (each / first))));
        first = each / first;
    })

    return str;

}