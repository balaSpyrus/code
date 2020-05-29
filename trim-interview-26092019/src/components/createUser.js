import React from 'react';

const FIELDS = [
    {
        key: 'name',
        label: 'Name',
        type: 'text',
    },
    {
        key: 'password',
        label: 'Password',
        type: 'password',
    },
    {
        key: 'cPass',
        label: 'Confirm Password',
        type: 'password',
    },
    {
        key: 'dName',
        label: 'Display Name',
        type: 'text',
    }
]

const options = ['india', 'USA', 'Germany']

class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            cPass: '',
            dName: '',
            country: '',
        };
    }

    getFields = () => {
        let fields = FIELDS.map((each, i) => {
            return (
                <div class="form-group" key={i}>
                    <label for={each.key}>{each.label}</label>
                    <input type={each.type} class="form-control" id={each.key} name={each.key} value={this.state[each.key]} onChange={this.onChange} />
                </div>
            )
        })

        return fields

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.isValid()) {
            let { name, cPass, ...userObj } = this.state
            userObj = { [name]: userObj }

            let userData = window.sessionStorage.getItem('userData')
            if (userData) {
                userData = JSON.parse(userData)

                if (!Object.keys(userData).includes(name))
                    userData[name] = userObj
            }
            else
                userData = { [name]: userObj }

            window.sessionStorage.setItem('userData', JSON.stringify(userData))
            this.props.history.push('/')
        }
    }

    isValid = () => true

    render() {

        return (
            <div className='container-fluid create-user p-3'>
                <form className='w-50' onSubmit={this.onSubmit}>
                    {
                        this.getFields()
                    }
                    <div class="form-group">
                        <label for="country">Country</label>
                        <select id="country" name='country' class="form-control" value={this.state.country} onChange={this.onChange}>
                            {options.map(each => <option value={each} key={each}>{each.toUpperCase()}</option>)}
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block">Create User</button>
                </form>
            </div>
        );
    }
}

export default CreateUser;
