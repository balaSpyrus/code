import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Modal from 'react-modal';
import './editCardModal.css';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class EditCardModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            card: JSON.parse(JSON.stringify(props.card)),
            comment: '',
            titleIsOpen: false,
            descriptionIsOpen: false
        }
    }

    deleteComment = (index) => {
        let { card } = { ...this.state }
        card.comments.splice(index, 1)
        this.setState({ card })
    }

    onInputChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    addComment = (e) => {

        if (e.key === 'Enter' && this.state.comment) {
            let { card } = { ...this.state }
            card.comments.push(this.state.comment)
            this.setState({
                card,
                comment: ''
            })
        }
    }

    onEditClose = (name) => {
        this.setState(prev => ({
            [name + 'IsOpen']: !prev[name + 'IsOpen']
        }))

    }

    onSave = () => {
        this.props.onClose && this.props.onClose(this.state.card)
    }

    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        this.setState(prev => {
            let card = { ...prev.card };
            card[name] = value;
            return { card }
        })
    }

    render() {
        const { card } = { ...this.state }

        return (

            <Modal
                isOpen={true}
                onRequestClose={this.props.onClose}
                style={customStyles}
                className="Modal"
                overlayClassName="Overlay"
                appElement={document.getElementById('root')}
            >
                <div className='edit-modal-title'>
                    {
                        this.state.titleIsOpen ?
                            <input type='text' className='on-edit-modal-title' name='title'
                                onChange={this.onChange} value={card.title} />
                            :
                            <h2>{card.title}</h2>
                    }
                    <span className={this.state.titleIsOpen ? 'close' : 'edit'} onClick={() => this.onEditClose('title')}></span>
                </div>
                <label className='model-label'>description</label>
                <div className='card-desc'>
                    {
                        this.state.descriptionIsOpen ?
                            <textarea value={card.description} onChange={this.onChange}
                                name='description' className='edit-text-area' />
                            :
                            <i>{card.description}</i>
                    }
                    <span className={this.state.descriptionIsOpen ? 'close' : 'edit'} onClick={() => this.onEditClose('description')}></span>
                </div>
                <label className='model-label'>status</label>
                <select value={card.priority} name='priority' onChange={this.onChange} className='select-list status-list'>

                    <option value={0}>new</option>
                    <option value={1}>investigate</option>
                    <option value={2}>in-progress</option>
                    <option value={3}>done</option>
                    <option value={4}>critical</option>
                    <option value={5}>hold</option>
                </select>
                <label className='model-label'>comments</label>
                <div className='card-comment-container'>
                    <Scrollbars
                        className="scroll"
                        autoHeight
                        autoHeightMin={0}
                        autoHeightMax={200}
                        renderThumbVertical={
                            ({ style, ...props }) =>
                                <div {...props} style={{ ...style, backgroundColor: 'rgba(49, 49, 49, 0.4)', borderRadius: '3px' }} />
                        } >
                        {
                            card.comments.map((comment, i) => <span className='comment' key={i}>
                                <i>{comment}</i>
                                <span className='comment-delete' onClick={() => this.deleteComment(i)}>&#x2716;</span>
                            </span>)
                        }
                    </Scrollbars>
                    <input type='text' value={this.state.comment} className='add-comment'
                        placeholder='type and press enter to add comment'
                        onChange={this.onInputChange} onKeyPress={this.addComment} />
                </div>
                <button className='btn-c blue' onClick={this.onSave}>&#x2714;</button>
                <button className='btn-c red' onClick={this.props.onClose}>&#x2716;</button>
            </Modal>
        );
    }
}

export default EditCardModal;


