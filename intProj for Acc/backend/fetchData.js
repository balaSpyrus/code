var dataSchemaModel = require('../model/dataSchema');
var router = require('express').Router();
var XLSX = require('xlsx');

router.get('/getData', function(req, res) {

  let workbook = XLSX.readFile('../data/sealedAir.xlsx');
  let details_of_sheet = get_details(workbook)
  let jsonData = to_json(workbook)
  let sheets = Object.keys(jsonData)
  //codes
  sheets.forEach(function(sheet) {
    if (sheet === 'Revenue') {
      let dataArr
      dataSchemaModel.find(function(err, datas) {
        if (err)
          console.log(err, "sorry cant acess DB");
        else if (datas.length===0) {
          dataArr = jsonData[sheet].map((eachData) => {
            let data = new dataSchemaModel(eachData)
            data.save((err, data) => {
              if (err)
                console.log(err, "error saving data");
              }
            )
            return data
          })
          res.send({data: dataArr})
          console.log('datas saved successfully');
        }
        else {
          res.send({data: datas})
          console.log('data already present ', datas.length);
        }
      })
    }
  })
});

//functions
function to_json(workbook) {
  let result = {};
  workbook.SheetNames.forEach(function(sheetName, i) {
    let sheetData = workbook.Sheets[sheetName]
    let roa = XLSX.utils.sheet_to_row_object_array(sheetData);
    if (roa.length > 0) {
      if (i === 1) {
        let extractedData = getData(sheetData, roa)
        result[sheetName] = extractedData
      }
      // other spreedsheets
      //    else {
      //     result[sheetName] = roa;
      //   }
    }
  });
  return result;
}
function getData(sheetData, roa) {
  let keys = []
  Object.keys(sheetData).forEach(function(cell) {
    if ((cell.match(/[2,3,4,5,6,7,8,9,0]/gi) || []).length === 0 && (cell.match(/1/g) || []).length === 1 && sheetData[cell].v !== 'BMC') {
      keys.push(sheetData[cell].v);

    }
  })
  Object.keys(roa[0]).forEach(function(data, i) {
    if (i >= 10 && i <= 12)
      keys[i] = data
  })
  let refinedData = roa.map(function(eachData) {

    //refining keys (also in each data)
    keys.forEach(function(keyValue, i) {

      //assigning empty datas to default value
      if (eachData[keyValue] === undefined || eachData[keyValue].trim() === '-')
        if (/\d/.test(keyValue))
          eachData[keyValue] = 0
        else
          eachData[keyValue] = '-'

    //finding if the keys have number in it change the value as float
      if (/\d/.test(keyValue))
        if (eachData[keyValue] !== 0)
          eachData[keyValue] = parseFloat(eachData[keyValue].split(',').join(''))

//saving as date
if(keyValue==='SOW End Date')
  if(eachData[keyValue]!=='-')
  eachData[keyValue]=new Date(eachData[keyValue]).toISOString().toString().substr(0,16)
else
eachData[keyValue]="NA"

    // trimming the key whitespaces for 3 monthly revenue
      if (i >= 10 && i <= 12) {
        let value = eachData[keyValue]
        delete eachData[keyValue]
        delete keys[i]
        keys[i] = keyValue.trim()
        eachData[keyValue.trim()] = value
      }
    })

    //deleting the unwanted field
    if (eachData.BMC !== undefined)
      delete eachData.BMC

      //returning only if it has values
    if (Object.keys(eachData).length > 0)
      return eachData
  })

  return refinedData
}

function get_details(workbook) {
  let keys = Object.keys(workbook)
  for (key in keys)
    if (keys[key] === 'Props')
      return workbook[keys[key]]
}

module.exports = router
