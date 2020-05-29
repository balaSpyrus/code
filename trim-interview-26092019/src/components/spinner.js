import React, { useEffect, useState } from 'react';
import './spinner.css';
import { normalizeSize, SPINNER_TYPE, constructDotLoaderData, constructClassicSpinnerData } from './spinnerUtil';

export const TYPE = SPINNER_TYPE;

export const Spinner = (props) => {

    const [spinnerData, setSpinnerData] = useState({})
    const [container, setContainer] = useState({})

    const className = props.className ? props.className : '';

    useEffect(() => {
        console.log('on changes props');

        constructSpinnerData(props.type)
    }, [props.color,
    props.isTransparent,
    props.thickness,
    props.animationDuration,
    props.dots,
    props.dotSize,
    props.type])

    useEffect(() => {

        console.log('on changes size');

        let { width,
            height } = normalizeSize(props.size, props.type)
        setContainer(prev => ({ ...prev, width, height }))
    }, [props.size, props.type])

    const getSpinner = (type = SPINNER_TYPE.CLASSIC) => {

        switch (type) {
            case SPINNER_TYPE.DOT:
                let { dots, animationDuration, ...style } = spinnerData;
                let dotsArr = new Array(dots).fill(1).map((key, i) => (
                    <div key={i + key + ''} style={{
                        ...style,
                        animation: `pulse ${animationDuration}ms ease .${i * 2}s infinite alternate`
                    }} />
                ))

                return <div className="pulse-container">
                    {dotsArr}
                </div>

            case SPINNER_TYPE.CLASSIC:
            default:
                return <div style={spinnerData} />;
        }
    }

    const constructSpinnerData = (type = SPINNER_TYPE.CLASSIC) => {

        let stateData = {}

        switch (type) {
            case SPINNER_TYPE.DOT:
                constructDotLoaderData(stateData, props)
                break;
            case SPINNER_TYPE.CLASSIC:
            default:
                constructClassicSpinnerData(stateData, props)
                break;
        }
        setSpinnerData(stateData)
    }

    return (
        <div className={"spinner-box " + className} style={container}>
            {props.children ? props.children : getSpinner(props.type)}
        </div>
    )
}
