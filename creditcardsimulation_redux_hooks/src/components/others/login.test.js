import ReactDOM from 'react-dom';
import React from 'react';
import assert from "assert";
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from './login';

configure({ adapter: new Adapter() });

describe('General Test cases for Login Component', () => {
    it('Rendering TestComp ( should render Login Component without crashing ) ', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login />, div);
    });
    describe('Checking Login component have form element', () => {
        let wrapper = shallow(<Login />);
        it('should have a form element', () => {
            expect(wrapper.find('form').length).toBe(1);
        });
        it('form element should have a onSubmit attribute', () => {
            expect(wrapper.find('form').props().onSubmit).toBeDefined();
        });
        it('onSubmit attribute should be of type `function`', () => {
            expect(typeof wrapper.find('form').props().onSubmit === 'function').toBe(true);
        });
        describe('Test cases for username', () => {
            it('username input is contain', () => {
                expect(wrapper.find('input[type="text"]').props().id).toEqual('email');
            });
            it('username input contains any value', () => {
                const username = 'udaya';
                wrapper.find('input[type="text"]').simulate('change', { target: { name: 'email', value: username } });
                wrapper.setState({ username: username })
                expect(wrapper.state('username')).toEqual(username);
                expect(wrapper.find('input[type="text"]').props().value).toBe(username);
            });
            it('username input contains valid email', () => {
                //console.log(wrapper.find('label').at(0))
            });
        });

        describe('Test cases for password', () => {
            it('password input is contain', () => {
                expect(wrapper.find('input[type="password"]').props().id).toEqual('pwd');
            });
            it('password input contains any value', () => {
                const password = 'udaya';
                wrapper.find('input[type="password"]').simulate('change', { target: { name: 'pwd', value: password } });
                wrapper.setState({ password: password })
                expect(wrapper.state('password')).toEqual(password);
                expect(wrapper.find('input[type="password"]').props().value).toBe(password);
            });
            it('show password check', () => {

            });
        });

        describe('Test cases for submit button', () => {
            it('submit button is contain', () => {
                expect(wrapper.find('button').text()).toEqual('Log In');
            });

            it('submit button click', () => {

                let user = '', pswd = '';
                let testSubmit = mount(<Login onSubmit={(usr, pass) => {
                    user = usr;
                    pswd = pass;
                }} />)

                expect(testSubmit.state().username).toBeFalsy();
                expect(testSubmit.state().password).toBeFalsy();
                expect(testSubmit.state().isSubmitted).toBeFalsy();


                testSubmit.find('input[type="text"]').simulate('change', { target: { name: 'email', value: 'testuser' } });
                testSubmit.find('input[type="password"]').simulate('change', { target: { name: 'pwd', value: 'testpass' } });
                testSubmit.find('button').simulate('submit')

                expect(testSubmit.state().username).toBeFalsy();
                expect(testSubmit.state().password).toBeFalsy();
                expect(user).toEqual('testuser');
                expect(pswd).toEqual('testpass');
                expect(testSubmit.state().isSubmitted).toBeTruthy();
            });
        });
    });
});





