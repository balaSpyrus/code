export const SPINNER_TYPE = {
    DOT: 'dot',
    CLASSIC: 'classic'
}
const DEFAULT_VALUE = {
    color: '#565656',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: `50%`,
    [SPINNER_TYPE.CLASSIC]: {
        borderWidth: 4,
        animationDuration: 1000
    },
    [SPINNER_TYPE.DOT]: {
        dots: 3,
        size: '20px',
        animationDuration: 400
    }
}

export const normalizeSize = (size = '100px', type) => {
    size = normalizeValue(size)
    switch (type) {
        case SPINNER_TYPE.DOT:
            return { width: size, height: 'auto' }
        case SPINNER_TYPE.CLASSIC:
        default:
            return { width: size, height: size }
    }

}

const normalizeValue = value => value + ''.match(/[A-Za-z%]/g) ? value : value + 'px'


export const constructClassicSpinnerData = (data, config) => {

    let color = config.color ? config.color : DEFAULT_VALUE.color
    let borderTopColor = config.isTransparent ? 'transparent' : DEFAULT_VALUE.borderColor
    let animationDuration = config.animationDuration ?
        config.animationDuration : DEFAULT_VALUE[SPINNER_TYPE.CLASSIC].animationDuration
    let thickness = config.thickness ? config.thickness : DEFAULT_VALUE[SPINNER_TYPE.CLASSIC].borderWidth;

    data.border = `${DEFAULT_VALUE[SPINNER_TYPE.CLASSIC].borderWidth}px solid`;
    data.borderRadius = DEFAULT_VALUE.borderRadius
    data.borderTopColor = borderTopColor
    data.borderBottomColor = color
    data.borderLeftColor = color
    data.borderRightColor = color
    data.animation = `spinner2 ${animationDuration}ms linear infinite`;
    data.borderWidth = normalizeValue(thickness)
    data.width = `calc(100% - ${thickness * 2}px)`
    data.height = `calc(100% - ${thickness * 2}px)`

}

export const constructDotLoaderData = (data, config) => {

    let color = config.color ? config.color : DEFAULT_VALUE.color
    let { width, height } = normalizeSize(config.dotSize ? config.dotSize : DEFAULT_VALUE[SPINNER_TYPE.DOT].size)

    data.borderRadius = DEFAULT_VALUE.borderRadius
    data.backgroundColor = color
    data.width = width
    data.height = height
    data.dots = config.dots ? config.dots : DEFAULT_VALUE[SPINNER_TYPE.DOT].dots;
    data.animationDuration = config.animationDuration ?
        config.animationDuration : DEFAULT_VALUE[SPINNER_TYPE.DOT].animationDuration;
}