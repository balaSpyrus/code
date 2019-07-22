import ReactDOM from 'react-dom';
import React from 'react';
import assert from "assert";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestComp from './dropdown';

configure({ adapter: new Adapter() });

describe('General Test cases for TestComp', () => {

    test('Rendering TestComp ( should render TestComp without crashing ) ', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TestComp />, div);
    });

});

describe('Test cases for link', () => {

    test('href source ', () => {
        let comp = mount(<TestComp />);
        expect(comp.find('a').at(0).props().href).toEqual('http://www.google.com')

    });


    test('clicking link ', () => {
        let comp = mount(<TestComp />);
        expect(comp.state().isclicked).toBeFalsy();
        comp.find('a').at(0).simulate('click'); //clicling
        expect(comp.state().isclicked).toBeTruthy();

    });

});

describe('Test cases for select', () => {

    test('simulating mouseover mouseout ', () => {
        let comp = mount(<TestComp />);
        let testEle = comp.find('div').at(3);

        expect(testEle.hasClass('show-items')).toBeFalsy();
        expect(comp.state().divClass).toEqual('')

        testEle.simulate('mouseOver') // hovering

        expect( comp.find('div').at(3).props().class).toEqual('show-items')
        expect(comp.state().divClass).toEqual('show-items')

        testEle.simulate('mouseOut') //leaving

        expect(testEle.hasClass('show-items')).toBeFalsy();
        expect(comp.state().divClass).toEqual('')

    });



});
