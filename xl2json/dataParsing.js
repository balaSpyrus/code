XLSX = require('xlsx');
var workbook = XLSX.readFile('sealedAir.xlsx');
var details_of_sheet = get_details(workbook)
var jsonData = to_json(workbook)
var sheets = Object.keys(jsonData)
//codes
sheets.forEach(function(sheet, i) {
  if (i === 1) {
  console.log(jsonData[sheet])
  }
})
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
      } else {
        result[sheetName] = roa;
      }
    }
  });
  return result;
}
function getData(sheetData,roa){
  let keys = []
  Object.keys(sheetData).forEach(function(cell) {
    if ((cell.match(/[2,3,4,5,6,7,8,9,0]/gi) || []).length===0 &&(cell.match(/1/g) || []).length===1&& sheetData[cell].v !== 'BMC') {
          keys.push(sheetData[cell].v);

    }
  })
  Object.keys(roa[0]).forEach(function(data, i) {
    if (i >= 10 && i <= 12)
      keys[i] = data
  })
  let refinedData = roa.map(function(eachData) {
    keys.forEach(function(keyValue, i) {
      if (eachData[keyValue] === undefined || eachData[keyValue].trim()==='-')
        eachData[keyValue] = '-'
    })
    if (eachData.BMC !== undefined)
      delete eachData.BMC
    if (Object.keys(eachData).length > 0)
      return eachData
    return eachData
  })
  return refinedData
}
function get_details(workbook) {
  let keys = Object.keys(workbook)
  for (key in keys) {
    if (keys[key] === 'Props') {
      return workbook[keys[key]]
    }
  }
}
