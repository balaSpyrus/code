import React from 'react';
import ReactDOM from 'react-dom';
import CusFilter from './cusFilter'
import {Link} from 'react-router';
import {Container, Row, Col, ScreenClassRender, Visible} from 'react-grid-system';
import Request from "superagent";
import {BootstrapTable, TableHeaderColumn, priceFormatter, InsertModalHeader} from 'react-bootstrap-table';
import {Button} from 'react-bootstrap';

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  selected: [], // default select on table
  bgColor: 'rgb(238, 193, 213)'
};

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

export default class ShowPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      keys: []
    }

    this.createDropDownData = this.createDropDownData.bind(this)
    this.getCustomFilter = this.getCustomFilter.bind(this)
    this.createModalInsert = this.createModalInsert.bind(this)
    this.beforeClose = this.beforeClose.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.percentValidator = this.percentValidator.bind(this)
    this.editingPercent = this.editingPercent.bind(this)
    this.invalidPercent = this.invalidPercent.bind(this)
    this.handleClick=this.handleClick.bind(this)

  }
handleClick(){
  this.state.keys.map((key)=>{
    if(key!=='_id')
    this.refs[key].cleanFiltered()

  })
}
  getCustomFilter(filterHandler, customFilterParameters) {
  return (
    <CusFilter  filterHandler={ filterHandler } parameters={ customFilterParameters} />
  );
}
  beforeClose(e) {
    console.log(e);
  }

  handleModalClose(closeModal) {
    console.log(closeModal);
    closeModal();
  }
  createModalInsert(closeModal, save) {
    return (
      <InsertModalHeader className='my-custom-class' title='New Account'
         beforeClose={this.beforeClose}
         onModalClose={() => this.handleModalClose(closeModal)}/>
    // hideClose={ true } to hide the close button
    );

  }
  percentValidator(value) {
    let nan
    if (value.includes("%")) {
      nan = isNaN(parseInt(value));
      if (nan) {
        return 'give a valid percentage..!!';
      }
      return true;
    } else {
      nan = isNaN(parseInt(value.substr(0, value.length)));
      if (nan) {
        return 'give a valid percentage..!!';
      }
      return true;
    }

  }
  invalidPercent(cell, row) {
    console.log("invalid one :", cell, row['Digital %']);
    return 'invalid-jobstatus-class';
  }

  editingPercent(cell, row) {
    console.log("editing one :", cell, row['Digital %']);
    return 'editing-jobstatus-class';
  }
    createDropDownData(field)
  {
    let tempData = []
    let finalData={}
        this.state.data.map((eachData, i) => {
          if (tempData.includes(eachData[field]) !== true)
            tempData.push(eachData[field])
        })
        tempData.map((value)=>finalData[value]=value)
        return finalData
  }

  createCustomButtonGroup=(props)=>{
          return (
        <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
          { props.showSelectedOnlyBtn }
          { props.exportCSVBtn }
          { props.insertBtn }
          { props.deleteBtn }
          <Button onClick={this.handleClick}> Clear Filters </Button>
        </ButtonGroup>
      );
    }

  componentWillMount() {
    let url = `http://localhost:8085/getData`;
    let that = this
    Request.get(url).end(function(err, res) {
      if (err) {
        console.log(err);
      } else {
        let keySet = Object.keys(JSON.parse(res.text)["data"][0]).filter((key) => (key !== 'Account'))
        that.setState({
          data: JSON.parse(res.text)["data"],
          keys: keySet
        })
      }
    })
  }
  render() {
    let that = this;
    const options = {
      paginationShowsTotal: true,
      insertModalHeader: this.createModalInsert,
      btnGroup: this.createCustomButtonGroup,
    };

    return (
      <div>
        <Row >
          <Col >
            <h1 style={{
              textAlign: "center"
            }}>{this.state.data.map((eachData, i) => {
                if (i === 0)
                  return eachData["Account"]
              })}</h1>
          </Col>
        </Row>
        <br/>
        <Row style={{width:1500,marginLeft:'auto',marginRight:'auto'}}>
          <Col >
            <BootstrapTable data={this.state.data} selectRow={selectRowProp}
              keyField={'_id'} cellEdit={cellEditProp} options={options}
              pagination insertRow deleteRow search exportCSV striped hover condensed scrollTop={'bottom'} height='500px'>

              {this.state.keys.map(function(value, i) {
                if (value === 'Status')
                  return (
                    <TableHeaderColumn ref={value} width='150px' dataField={value} editable={{
                      type: 'select',
                      options: {
                        values: ['High Probability', 'Confirmed']
                      }
                    }}  filter={{
                      type: 'SelectFilter',
                      options:that.createDropDownData(value)
                    }}
                    key={i}>
                      {value}
                    </TableHeaderColumn>
                  )
                  else if (value === 'SL/DU')
                    return (
                      <TableHeaderColumn ref={value} width='80px' dataField={value} editable={{
                        type: 'select',
                        options: {
                          values: ['SL', 'DU']
                        }
                      }} filter={{
                        type: 'SelectFilter',
                        options:that.createDropDownData(value)
                      }}
                       key={i}>
                        {value}
                      </TableHeaderColumn>
                    )
                    else if (value === 'Contract Type')
                      return (
                        <TableHeaderColumn ref={value} width='100px' dataField={value} editable={{
                          type: 'select',
                          options: {
                            values: ['T&M', 'FPP']
                          }
                        }} filter={{
                          type: 'SelectFilter',
                          options:that.createDropDownData(value)
                        }}
                         key={i}>
                          {value}
                        </TableHeaderColumn>
                      )
                      else if(value=== 'SOW End Date')
                  {
                    return (
                      <TableHeaderColumn ref={value} width='250px' dataField={value}
                        editable={ { type: 'datetime' } }
                        filter={ { type: 'DateFilter'} } key={i}>
                        {value}
                      </TableHeaderColumn>
                    )

                  }
                  else if (value == 'Digital %')
                    return (
                      <TableHeaderColumn ref={value} width='120px' dataField={value}
                        filter={ { type: 'CustomFilter',
                         getElement: that.getCustomFilter,
                          customFilterParameters:that.createDropDownData(value)
                        } }
                      editable={{
                        validator: that.percentValidator
                      }} editColumnClassName={that.editingPercent} invalidEditColumnClassName={that.invalidPercent} key={i}>
                        <span>{value}</span>
                      </TableHeaderColumn>
                    )
                    else if (/\d/.test(value))
                    if(value.match('Q[0-9]\'')!==null)
                        return (
                          <TableHeaderColumn ref={value} width='200px' dataField={value}
                            editable={ { type: 'Number' } }

                            filter={ { type: 'NumberFilter',
                                       numberComparators: [ '=', '>', '<=', '>=','<','!=' ] } }
                                       hiddenOnInsert
                            key={i}>
                            {value}
                          </TableHeaderColumn>
                        )
                        else
                            return (
                              <TableHeaderColumn ref={value} width='200px' dataField={value}
                                filter={ { type: 'NumberFilter',
                                           numberComparators: [ '=', '>', '<=', '>=','<','!=' ] } }

                                key={i}>
                                {value}
                              </TableHeaderColumn>
                            )
else if(value!=='_id')
                  return (
                    <TableHeaderColumn ref={value} width='150px'
                      filter={ { type: 'CustomFilter',
                       getElement: that.getCustomFilter,
                        customFilterParameters:that.createDropDownData(value)
                      } }
                       dataField={value} key={i}>
                      {value}
                    </TableHeaderColumn>
                  )
              })
}

            </BootstrapTable>
          </Col>
        </Row>
      </div>
    )
  }
}
