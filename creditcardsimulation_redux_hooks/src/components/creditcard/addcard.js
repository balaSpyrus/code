import React from 'react'
import './addcard.css'
import { getCardType } from './cardUtil';
import Axios from 'axios';

export class AddCard extends React.Component {

    state = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        errMsg: '',
        name: '',
        number: '',
        cvv: '',
        year: new Date().getFullYear(),
        month: '01',
        type: 'UNKNOWN',
        years: Array(15).fill(0).map((ele, i) => ele + Number(new Date().getFullYear()) + i)
    }

    feedValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let errMsg = '';

        switch (name) {
            case 'number': {
                errMsg = this.isValidCard(value);
                value = this.cc_format(value);
                this.setState((prevState) => ({
                    type: getCardType(value.split('-').join(''), prevState.type)
                }))
                break;
            }
            case 'name': {
                errMsg = this.isValidName(value);
                break;
            }
            default: {
                break;
            }
        }

        this.setState({
            [name]: value,
            errMsg: value.length ? errMsg : ''
        })
    }

    isValidCard = (cardNum) => {
        let num = cardNum.split('-').join('');
        if (!/^[0-9-]*$/.test(num))
            return 'Number only allowed in card numbers';
        else if (num.length < 14 || num.length > 16)
            return 'card number length should be between 14 to 16';
    }

    isValidName = (name) => {
        if (!/^[a-zA-Z]*$/.test(name))
            return 'Number are not allowed in the name field';

    }

    onSumbit = async (e) => {

        let isExists = this.props.creditCards.filter(ele => ele.number === this.state.number)
        if (isExists.length > 0) {
            this.setState({ errMsg: 'Duplicate Entry' })
        } else {
            let { name, number, cvv, year, month, type } = this.state
            try {
                let response = await Axios.post('/card/addCard', { name, number, cvv, year, month, type })
                window.alert(response.data.msg)
                this.props.addEntry({ name, number, cvv, year, month, type })
                this.setState({
                    name: '',
                    number: '',
                    cvv: '',
                    year: new Date().getFullYear(),
                    month: '01',
                    type: 'UNKNOWN'
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    cc_format = (value) => {
        let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        let matches = v.match(/\d{4,16}/g);
        let match = matches && matches[0] || ''
        let parts = []

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join('-')
        } else {
            return value
        }
    }

    render() {
        return (
            <div class=''>
                <form class={this.state.errMsg ? 'container add-card-container card-err' : 'container add-card-container'}>
                    <div class="form-group row">
                        <label for="name" class='col-12'>Name</label>
                        <div class='col-12'>
                            <input type="text" class="form-control" id="name" name='name'
                                value={this.state.name} placeholder='name' onChange={this.feedValue} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="name" class='col-12'>Card Number</label>

                        <div class="input-group col-12">
                            <input type="text" class="form-control" id="number" name='number' maxLength={19}
                                onKeyPress={(e) => {
                                    if (!/^[0-9-]*$/.test(e.target.value))
                                        e.preventDefault();
                                }}
                                value={this.state.number} placeholder='number' onChange={this.feedValue} />
                            <div class="input-group-prepend">
                                <div class="input-group-text">{this.state.type}</div>
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        <div class='col-md-8 row m-0 pr-0'>
                            <label for="month" class='col-12 pl-0'>Expires On</label>
                            <div class="form-group col-4 pl-0" id="month">

                                <select class="form-control"
                                    name='month' value={this.state.month} onChange={this.feedValue}>
                                    {this.state.months.map(month =>
                                        <option key={month}>{month}</option>
                                    )}
                                </select>
                            </div>
                            <div class="form-group col-8 pl-0" id="month">
                                <select class="form-control"
                                    name='year' value={this.state.year} onChange={this.feedValue}>
                                    {this.state.years.map(year =>
                                        <option key={year}>{year}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div class='col-md-4 row m-0 pl-0'>
                            <label for="cvv" class='col-12 pr-0'>CVV</label>
                            <div class="form-group col-12 pr-0">
                                <input type="password" class="form-control" id="cvv" aria-describedby="cvvHelp"
                                    maxLength={3} name='cvv' value={this.state.cvv} onChange={this.feedValue} placeholder="CVV" />
                            </div>
                        </div>
                        <small id="cvvHelp" class="form-text text-muted col-12">{this.state.errMsg ?
                            this.state.errMsg : "We'll never share your CVV with anyone else."}</small>
                    </div>
                    <button type='button' class={this.state.errMsg ? "btn btn-danger btn-top-right" : "btn btn-primary btn-top-right"} onClick={this.onSumbit}>
                        <i class="fa fa-times card-add" aria-hidden="true" /></button>
                </form>
            </div>
        )
    }

}