function isDivisible(num = 0) {
    if (num) {

        let up = 1, down = 0;
        while (num) {
            up *= num
            down += num
            num--;
        }

        return up % down === 0
    }

    return 'invalid'
}


