import flow from 'lodash/flow';
import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import './card.css';


const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            listID: props.listID,
            index: props.index
        }
    },
    endDrag(props, monitor) {
        if (!monitor.didDrop() || !props.card) {
            return;
        }
        return props.handleDrop(props.card.id, props.listID);
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        props.onHoverList(props.listID)
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        if (dragIndex === hoverIndex) {
            return;
        }

        const hoverBoundingRect = (findDOMNode(
            component
        )).getBoundingClientRect();

        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        props.moveCard(dragIndex, hoverIndex, props.listID);
        monitor.getItem().index = hoverIndex;
    }
}



class Card extends React.Component {
 
    static defaultProps = {
        card: null
    }

    getTitleColor=(priority)=>{
        let classNames=['card-title']

        switch(priority+''){
            case '1' : classNames.push('investigate')
            break;
            case '2' : classNames.push('in-progress')
            break;
            case '3' : classNames.push('done')
            break;
            case '4' : classNames.push('critical')
            break;
            case '5' : classNames.push('hold')
            break;
            default:classNames.push('new')
            break;
        }
        
        return classNames.join(' ')
    }
    render() {

        const {
            card,
            isDragging,
            // hovered,
            connectDragSource,
            connectDropTarget
        } = this.props;

        return (
            connectDragSource &&
            connectDropTarget &&
            connectDragSource(
                connectDropTarget(
                    card ? <div className={isDragging ? 'card card-drag' : 'card'}>
                        <span className='card-delete' onClick={() => this.props.deleteCard(card.id)}>&#x2716;</span>
                        <div title={card.description} onClick={this.props.expandCard}>
                            <span className={this.getTitleColor(card.priority)}> {card.title}  </span>
                            <div className='card-comment-count'>
                                {
                                    card.comments.length ?
                                        <i>{`${card.comments.length} comment(s)`}</i> : <i>Be the first to comment</i>
                                }
                            </div>
                        </div>
                    </div> : <div className='no-card' onMouseDown={e => e.preventDefault()}><i>No Card(s) available</i></div>
                ))
        );
    }
}

export default flow(
    DragSource(
        'card',
        cardSource,
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview(),
            isDragging: monitor.isDragging()
        })
    ),
    DropTarget('card', cardTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }))
)(Card);
