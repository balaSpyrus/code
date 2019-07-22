import React from 'react'
import PropTypes from 'prop-types'
import { CreditCard } from './creditcard';
import './cardList.css'
import { Scrollbars } from 'react-custom-scrollbars';

export const CardList = ({ creditCards, onDelete }) => (
    <div class='container-fluid'>
     <Scrollbars
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={400}
                    renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} />}
                    renderThumbVertical={
                        ({ style, ...props }) =>
                            <div {...props} style={{ ...style, backgroundColor: 'grey' }} />
                    }>
        <div class='row m-auto'>
            {creditCards.map(card => (
                <CreditCard key={card.number} {...card} deleteCard={onDelete} />
            ))}
        </div>
        </Scrollbars>
    </div>
)

CardList.propTypes = {
    creditCards: PropTypes.arrayOf(
        PropTypes.shape({
            number: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            year: PropTypes.number.isRequired,
            month: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            cvv: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
    onEdit: PropTypes.func.isRequired
}
