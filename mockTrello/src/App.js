import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './App.css';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { mockData, NavBar, AddOne, List } from './components';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleInfo: {
        title: 'Trello',
        version: '2.0'
      },
      selectedBoard: '',
      dashboard: mockData,
      currentHoverListID: null
    }
  }

  componentDidMount(){
    if(mockData){
      this.setState({
        selectedBoard:Object.keys(mockData)[0]
      })
    }
  }

  addList = (title) => {


    this.setState((prev) => {

      let dashboard = { ...prev.dashboard }
      let selectedBoard = prev.selectedBoard ? prev.selectedBoard : 'default'

      if (!dashboard[selectedBoard]) {
        selectedBoard = 'default'
        dashboard[selectedBoard] = []
      }

      dashboard[selectedBoard].push({
        id: new Date().getTime(),
        title,
        cards: []
      })

      return { dashboard, selectedBoard }
    })
  }

  deleteList = (id) => {
    this.setState(prev => {

      let dashboard = { ...prev.dashboard }

      dashboard[prev.selectedBoard] = dashboard[prev.selectedBoard]
        .filter(eachList => eachList.id !== id)

      return { dashboard }
    })
  }

  handleDrop = (cardID, listID) => {

    if (this.state.currentHoverListID && this.state.currentHoverListID !== listID) {

      let dashboard = JSON.parse(JSON.stringify(this.state.dashboard))
      let lists = dashboard[this.state.selectedBoard]

      let listToRemove = lists.filter(list => list.id === listID)[0]
      let listToAdd = lists.filter(list => list.id === this.state.currentHoverListID)[0]
      let removedCard = listToRemove.cards.splice(listToRemove.cards.filter(card => card).map(card => card.id).indexOf(cardID), 1)[0]
      listToAdd.cards.push(removedCard);
      listToAdd.cards = listToAdd.cards.filter(card => card)
      listToRemove.cards = listToRemove.cards.filter(card => card)
      dashboard[this.state.selectedBoard] = lists
      this.setState({ dashboard })

    }

  }

  onHoverList = (id) => {
    if (id && id !== this.state.currentHoverListID) {
      this.setState({
        currentHoverListID: id
      })
    }
  }

  onDashboardChange = (e) => {
    this.setState({
      selectedBoard: e.target.value
    })
  }

  updateDashBoard = (list) => {

    let dashboard = JSON.parse(JSON.stringify(this.state.dashboard))
    let lists = dashboard[this.state.selectedBoard].map(eachList => {
      if (eachList.id === list.id)
        return list
      return eachList
    })
    dashboard[this.state.selectedBoard] = lists

    this.setState({ dashboard })

  }

  onDashBoardTitleSave = (title) => {
    let dashboard = { ...this.state.dashboard }
    dashboard[title] = []
    this.setState({
      dashboard,
      selectedBoard: title
    })
  }

  deleteBoard = () => {
    let dashboard = { ...this.state.dashboard }
    delete dashboard[this.state.selectedBoard]
    this.setState({
      dashboard,
      selectedBoard: Object.keys(dashboard)[0]
    })
  }

  render() {
    return (
      <div className="App" >
        < NavBar
          titleInfo={this.state.titleInfo}
          dashboardList={Object.keys(this.state.dashboard)}
          onDashboardChange={this.onDashboardChange}
          selectedBoard={this.state.selectedBoard}
          onEnter={this.onDashBoardTitleSave}

        />
        <DndProvider backend={HTML5Backend}>
          <div className='list-section' >
            {Object.keys(this.state.dashboard).length > 1 &&
              <div className='dashboard-delete'>
                <h2>delete dashboard</h2>
                <button className='btn-c red' onClick={this.deleteBoard}>&#x2716;</button>
              </div>
            }
            <Scrollbars
              className="scroll"
              renderThumbHorizontal={
                ({ style, ...props }) =>
                  <div {...props} style={{ ...style, backgroundColor: 'rgb(48, 129, 176)', borderRadius: '3px' }} />
              }
            >
              <div className="list-container">
                {
                  this.state.dashboard[this.state.selectedBoard] && this.state.dashboard[this.state.selectedBoard].map((eachList, i) => <List
                    key={i}
                    list={eachList}
                    onHoverList={this.onHoverList}
                    handleDrop={this.handleDrop}
                    updateDashBoard={this.updateDashBoard}
                    onDelete={this.deleteList} />)
                }
                <AddOne
                  addingFor='add a new list...'
                  onSave={this.addList}
                />
              </div>
            </Scrollbars>
          </div>
        </DndProvider>
      </div>
    );
  }
}

export default App;
