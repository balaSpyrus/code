export function printTree(strArr = []) {
    let treeStr = []
    strArr.forEach(eachStr => {
        eachStr.split('/').forEach((eachDir, hr) => {
            let str = ''
            str = '';
            for (; hr !== 0; hr--)
                str += '|\t';
            str += '|-' + eachDir + '\n';
            if (!treeStr.includes(str) && eachStr)
                treeStr.push(str);
        })
    })
    treeStr.forEach(eachTree => {
        console.log(eachTree);

    })
}
}