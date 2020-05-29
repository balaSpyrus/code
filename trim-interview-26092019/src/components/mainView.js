import React from 'react';

class MainView extends React.Component {

    static getDerivedStateFromProps(nextProps, prevState) {

        let modifiedData = {}

        if (nextProps.match.params.list !== prevState.list) {
            modifiedData.list = nextProps.match.params.list;
        }
        if (nextProps.match.params.item !== prevState.item) {
            modifiedData.item = nextProps.match.params.item;
        }

        return Object.keys(modifiedData).length ? modifiedData : null
    }

    constructor(props) {
        super(props);
        this.state = {
            list: props.match.params.list,
            item: props.match.params.item
        };
    }

    render() {

        return (
            <div className="jumbotron jumbotron-fluid main-view">
                <div className="container">
                    <h1 className="display-4">Clicked {this.state.list}</h1>
                    {
                        this.state.item && <p className="lead">And selected the {this.state.item} from the list</p>
                    }
                </div>
            </div>
        );
    }
}

export default MainView;
