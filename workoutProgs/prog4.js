import { resolve } from "dns";

function isAnagram(str1 = '', str2 = '') {

    let flag = false
    if (str1.length === str2.length) {
        let str = str1 + str1
        return str.indexOf(str2) !== -1
    }

    return flag;
}


function currying(x) {
    let sum = x;
    return function next(y) {
        if (y) {
            sum += y;
            return next
        }
        else
            return sum;
    };
}

function getDetails(user) {
    return new Promise((resolve, reject) => fetch(`https://api.github.com/search/users?q=${user}`)
        .then(response => response.json())
        .then(json => resolve(json.items))
        .catch(err => reject(err))
    )
}

function getSubscriptions(sub_url) {
    return new Promise((resolve, reject) => fetch(sub_url)
        .then(response => response.json())
        .then(json => json.map(eachSub => {
            return {
                repo: eachSub.full_name,
                owner: eachSub.owner.login,
                url: eachSub.html_url,
                desc: eachSub.description,
            }
        }))
        .then(subs=>resolve(subs))
        .catch(err => reject(err))
    )
}

async function searchUser(user) {
    let details = await getDetails(user)
    details.map(async detail => {
        let subs = await getSubscriptions(detail.subscriptions_url)
        subs.map(sub => {
            console.log(detail.login, sub)
        })
    })
}