class Emitter {

    constructor() {
        this.emObj = {}
    }

    on = (key = '', cb) => {
        if (!this.emObj[key])
            this.emObj[key] = [];
        this.emObj[key].push(cb)

        return () => {
            this.emObj[key] = this.emObj[key].filter(eachCb => cb !== eachCb)
            console.log('deleted the emitter');

        }
    }
    emit = (key = '') => {
        if (this.emObj[key]) {
            this.emObj[key].forEach(cb => {
                cb();
            });
        }
        else
            console.log('invalid emitter');

    }
}

let em = new Emitter()
em.on('xx', () => {
    console.log('xx');

})
let foo = em.on('xx', () => {
    console.log('xxx');

})
let foo1 = em.on('xx', () => {
    console.log('xxxx');

})
em.on('xy', () => {
    console.log('xy');

})
em.emit('xx')
em.emit('xy')
em.emit('xxx')
em.emit('xx')
foo();
em.emit('xx')
foo1();
em.emit('xx')



