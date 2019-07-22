export function getLowestOccurence(arr = [], k = 0) {
    if (!k || !arr.length) {
        return 'invalid';
    }
    let stash = {}, min = arr[0], minvalueMatching = 0
    arr.forEach((ele) => {

        if (ele < min)
            min = ele;

        if (!stash[ele])
            stash[ele] = 1;
        else
            stash[ele]++;

    })

    Object.keys(stash).forEach((key) => {
        if (stash[key] === k)
            if (!minvalueMatching)
                minvalueMatching = key;
            else if (key < minvalueMatching)
                minvalueMatching = key;
    })

    return minvalueMatching;
}