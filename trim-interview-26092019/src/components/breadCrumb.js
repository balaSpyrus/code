import React from 'react';
import { Link,withRouter } from 'react-router-dom';

class BreadCrumb extends React.Component {

    state ={
        linkTree:[]
    }

    UNSAFE_componentWillReceiveProps(props,nextprops){

        console.log(props,nextprops)
    }

    //  static setLink = (link = '#', name = '') => {
    //     console.log('dfdffdsfds');
    //     this.setState(prevLinkTree => [...prevLinkTree, { link, name }])
    // }
    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol className={this.props.className}>
                    {
                        this.state.linkTree.map(each => {

                            return <li className={`breadcrumb-item `}
                                aria-current="page">{
                                    each.link ?
                                        <Link to={each.link}>{each.name}</Link>
                                        : each.name
                                }</li>
                        })
                    }
                </ol>
            </nav>
        )
    }
}

export default withRouter(BreadCrumb);
