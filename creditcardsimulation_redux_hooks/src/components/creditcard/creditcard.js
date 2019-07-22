/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './creditcard.css'
import { getCardColor } from './cardUtil';
import { Scrollbars } from 'react-custom-scrollbars';

export const CreditCard = (props) => {

    const [cardColorClass, setCardColorClass] = useState('card');

    useEffect(() => {

        let classNames = cardColorClass.split(' ')
        classNames.push(getCardColor(props.type))
        setCardColorClass(classNames.join(' '));

    }, [])

    return (
        <div class='col-xl-3 col-lg-4 col-md-6 col-sm-12 p-3'>
            <div class={cardColorClass}>
                <a class=" card-delete" onClick={() => props.deleteCard(props.number)} href='#'>
                    <i class="fa fa-times" aria-hidden="true" /></a>
                <Scrollbars
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={160}
                    renderTrackHorizontal={props => <div {...props} style={{ display: 'none' }} />}
                    renderView={props => (
                        <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
                    )}
                    renderThumbVertical={
                        ({ style, ...props }) =>
                            <div {...props} style={{ ...style, backgroundColor: '#ffffff', opacity: 0.5 }} />
                    }>
                    <div class="card-body row">
                        <h2 class="card-title col-12 mb-0">{props.number}</h2>
                        <h4 class="card-text col-12 mb-3">{props.month + '/' + props.year}</h4>
                        <h5 class="card-text col-6 text-left text-uppercase mb-0 pt-4">{props.name}</h5>
                        <h5 class="card-text col-6 text-right"><small>{props.type}</small></h5>
                    </div>
                </Scrollbars>
            </div>
        </div>)
}

CreditCard.propTypes = {
    onEdit: PropTypes.func.isRequired,
}
