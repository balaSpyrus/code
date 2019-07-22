import React from 'react';

class AddOne extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAddingOne: false,
            title: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.isAddingOne !== nextProps.isAddingOne){
            this.setState({
                isAddingOne: nextProps.isAddingOne
            })
        }
       
    }

    toggleBtn = () => {
        this.setState(prev => ({
            isAddingOne: !prev.isAddingOne
        }))
        this.props.onToggle && this.props.onToggle(!this.state.isAddingOne)

    }

    onTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onSave = () => {

        this.props.onSave(this.state.title)
        this.props.onToggle && this.props.onToggle(false)
        this.setState({
            title: '',
            isAddingOne: false
        })

    }

    onEnterPress = (e) => {
        if (e.key === 'Enter' && this.state.title) {
            this.onSave()
        }
    }

    render() {

        return (

            this.state.isAddingOne ?
                <div className='add-one-mini'>
                    <input type='text' placeholder={this.props.addingFor} value={this.state.title} onChange={this.onTitleChange} onKeyPress={this.onEnterPress} />
                    <button className='btn-c blue' onClick={this.state.title ? this.onSave : null}>&#x2714;</button>
                    <button className='btn-c red' onClick={this.toggleBtn}>&#x2716;</button>
                </div>
                :
                <a href='/#' className='add-one-element' onClick={this.toggleBtn}>{this.props.addingFor}</a>

        );
    }
}

export default AddOne;
