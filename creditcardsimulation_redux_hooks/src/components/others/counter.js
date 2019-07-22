
import React, { useState, useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';

export function Timer() {

    const [time, setTime] = useState(null)
    const [list, setList] = useState([]);
    const [controlledTime, setControlledTime] = useState(new Date())

    setInterval(() => {
        setControlledTime(new Date().toLocaleString())
    }, 1000);

    useEffect(() => {
        time && setList([...list, new Date(time).toLocaleTimeString()])
    }, [time])

    const renderBadge=(value)=>{

        let className = 'badge badge-pill badge-'

        if(value<25)
        className+='danger'
        else if(value >=25 && value <=50)
        className+='warning'
        else if(value >=50 && value <=75)
        className+='primary'
        else
        className+='success'

        return <span class={className}>{value}</span>
    }

    return <div class='counter-class'>
        <Scrollbars
            class='mt-4'
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
            autoHeight
        autoHeightMin={0}
        autoHeightMax={500}
            style={{ width: 500,}}
            renderThumbVertical={
                ({ style, ...props }) =>
                    <div {...props} style={{ ...style, backgroundColor: '#ffffff' }} />
            }>
            < div class="list-group container" >
                {
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    list.map((item, i) => <a href="#" style={{ minHeight: '60px' }}
                        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center list-group-item-secondary" key={i}>{item}
                        {renderBadge(Math.random()*100)}
                    </a>)
                }
            </div>
        </Scrollbars>
        <button type="button" class="mt-4 btn btn-outline-secondary btn-lg"
            onClick={() => setTime(controlledTime.toLocaleString())}>
            Track
            <span>{controlledTime.toLocaleString()}</span>
        </button>
    </div>


}