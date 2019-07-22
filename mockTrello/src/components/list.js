import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Card from './card';
import AddOne from './addOne';
import './list.css'
import { EditCardModal } from '.';


class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: props.list,
            isAddingCard: false,
            expandedCard: null
        }
    }

    static defaultProps = {
        list: null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.list && nextProps.list !== this.props.list) {
            this.setState({
                list: nextProps.list
            })
        }
    }

    addCard = (title) => {
        let list = { ...this.state.list }

        list.cards.push({
            id: new Date().getTime(),
            title,
            priority:0,
            description: '',
            comments: []
        })

        this.props.updateDashBoard(list)

    }

    expandCard = (card) => {
        this.setState({ expandedCard: card })
    }

    closeModal = (card = null) => {

        let list = { ...this.state.list }

        if (card) {
            list.cards = list.cards.map(eachCard => {
                if (eachCard.id === card.id)
                    return card
                return eachCard
            })
        }

        this.setState({
            expandedCard: null
        })

        this.props.updateDashBoard(list)
    }

    moveCard = (dragIndex, hoverIndex) => {

        let list = { ...this.state.list }
        const dragCard = list.cards[dragIndex]
        list.cards.splice(dragIndex, 1);
        list.cards.splice(hoverIndex, 0, dragCard);
       
        this.props.updateDashBoard(list)

    }

    deleteCard = (id) => {
        let list = { ...this.state.list }
        list.cards = list.cards.filter(eachCard => eachCard.id !== id)
        this.props.updateDashBoard(list)
    }

    onToggle =()=>this.setState(prev=>({isAddingCard:!prev.isAddingCard}))

    render() {
        return (
            <div className='list'>
                <div className='tite-container'>
                    <span className=' left-float'>{this.state.list.title}</span>
                    <div className=' right-float'>
                        <span className='btn-c red' onClick={() => this.props.onDelete(this.state.list.id)}>&#x2716;</span>
                    </div>
                </div>
                <div className='card-container'>
                    <Scrollbars
                        className="scroll"
                        autoHeight
                        autoHeightMin={0}
                        autoHeightMax={this.state.isAddingCard ? 'calc(100vh - 220px)' : 'calc(100vh - 165px)'}
                        renderThumbVertical={
                            ({ style, ...props }) =>
                                <div {...props} style={{ ...style, backgroundColor: 'rgba(49, 49, 49, 0.4)', borderRadius: '3px' }} />
                        } >
                        {
                            this.state.list.cards.length ? this.state.list.cards.map((eachCard, i) => <Card
                                index={i} listID={this.state.list.id}
                                deleteCard={this.deleteCard}
                                expandCard={() => this.expandCard(eachCard)}
                                onHoverList={this.props.onHoverList}
                                moveCard={this.moveCard}
                                handleDrop={this.props.handleDrop}
                                card={eachCard}
                                key={i} />)
                                :
                                <Card
                                    moveCard={this.moveCard}
                                    onHoverList={this.props.onHoverList}
                                    handleDrop={this.props.handleDrop}
                                />
                        }
                    </Scrollbars>
                </div>
                <div className='btn-container'>
                        <AddOne
                            addingFor='add a card...'
                            onSave={this.addCard}
                            onToggle={this.onToggle}
                        />
                </div>
                {
                    this.state.expandedCard &&
                    <EditCardModal
                        card={this.state.expandedCard}
                        onClose={this.closeModal}
                    />
                }

            </div>
        );
    }
}

export default List;
