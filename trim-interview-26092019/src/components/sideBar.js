import React from 'react';
import { Link } from 'react-router-dom';

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    generateRandomLists = () => {
        let list = Array(Math.ceil(Math.random() * 10)).fill(1).map((ele, i) => {
            let key = ele + i;
            return (
                <div className="row" key={key}>
                    <div className="col">
                        <Link to={`/menuList${key}`} >
                            <button className="btn btn-primary btn-block menu-list" type="button" data-toggle="collapse" data-target={`#multiCollapseExample${key}`} aria-expanded="false" aria-controls={`multiCollapseExample${key}`}>
                                Menu List {key}
                            </button>
                        </Link>
                        <div className="collapse multi-collapse" id={`multiCollapseExample${key}`}>
                            {
                                this.generateRandomItems(`menuList${key}`)
                            }
                        </div>
                    </div>
                </div>
            )
        })



        return list
    }

    generateRandomItems = (listName) => {

        let items = Array(Math.ceil(Math.random() * 10)).fill(1).map((ele, i) => {
            let key = ele + i;
            return (<Link key={key} to={`/${listName}/menuItem${key}`} className="list-group-item list-group-item-action">Menu Item {key}</Link>)
        });

        return (
            <div className="list-group">
                {items}
            </div>
        )
    }

    render() {

        return (
            <div className='side-bar'>
                {
                    this.generateRandomLists()
                }
            </div>
        );
    }
}

export default SideBar;
