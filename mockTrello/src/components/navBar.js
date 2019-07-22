import React, { Component } from 'react';
import './nav.css';



class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddInput: false,
            title: ''
        }
    }


    getTitleAndVersion = () => {
        let title = 'Trello', version = '2.0';
        if (this.props.titleInfo) {
            title = this.props.titleInfo.title;
            version = this.props.titleInfo.version;
        }
        return (<div className='nav-title'>
            <span>{title}</span>
            {version && <span>{version}</span>}
        </div>)
    }

    onClickAdd = () => {
        this.setState(prev => ({ showAddInput: !prev.showAddInput,title: '' }))
    }

    onTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }



    onEnterPress = (e) => {
        if (e.key === 'Enter' && this.state.title) {
            this.props.onEnter && this.props.onEnter(this.state.title)
            this.onClickAdd()
        }
    }

    render() {

        return (
            <div id="navbar">
                {this.getTitleAndVersion()}
                <div className='nav-right'>
                    {
                        this.state.showAddInput ?
                            <div className='add-board'>
                                <input type='text' placeholder='type and press to add dashboard' value={this.state.title} onChange={this.onTitleChange} onKeyPress={this.onEnterPress} />
                                <button className='btn-c red' onClick={this.onClickAdd}>&#x2716;</button>
                            </div>
                            :
                            <button className='btn-c add' onClick={this.onClickAdd}>
                                <span>add  dashboard</span>
                            </button>
                    }
                    {
                        this.props.dashboardList.length ? <select onChange={this.props.onDashboardChange} className='select-list dashboard-list'>

                            {
                                this.props.dashboardList
                                    .map((dashboard, i) => <option
                                        key={i}
                                        selected={dashboard === this.props.selectedBoard}
                                        value={dashboard}>
                                        {dashboard + ' dashboard'}</option>)
                            }
                        </select>:null
                    }
                </div>
            </div>
        );
    }
}

export default NavBar;