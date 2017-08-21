XLSX = require('xlsx');
var workbook = XLSX.readFile('data.xlsx');
var details_of_sheet = get_details(workbook)
var jsonData = to_json(workbook)
var sheets = Object.keys(jsonData)
//codes
sheets.forEach(function(sheet, i) {
  if(i===0)
  {
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
        let financialData = get_financialReport(sheetData, roa)
        result[sheetName] = financialData
      }
      else if(i===3)
      {
        let pipeline_OBData=get_pipelineOBData(sheetData)
        result[sheetName]=pipeline_OBData
      }
      else
        result[sheetName] = roa;
      }
    });
  return result;
}

function get_pipelineOBData(sheetData)
{
  let keys=[],cellNum='',flg=true,lt='',rt='',lb='',rb=''
  Object.keys(sheetData).forEach(function(cell){
    if(flg)
    {
    if(sheetData[cell].v==='Opportunity Name')
    { keys.push(sheetData[cell].v)
       cellNum=cell.substr(1,cell.length)
       lt=cell
    }
      else if(cellNum!=='' && cell.includes(cellNum))
      {
        keys.push(sheetData[cell].v)
        if(sheetData[cell].v==='Total')
        {
          rt=cell
          flg=false
        }
      }
    }
  })
  //console.log(keys);
//  console.log(lt," ",rt," ",lb," ",rb);
}

function get_financialReport(sheetData, roa) {

  let BMC = get_BMC(sheetData)
  let key = []
  //  console.log(BMC)
  Object.keys(sheetData).forEach(function(cell) {
    if (cell.includes('1') && cell.length === 2 && sheetData[cell].v !== 'BMC') {

      key.push(sheetData[cell].v);

    }
  })
  Object.keys(roa[0]).forEach(function(data, i) {
    if (i >= 5 && i <= 8)
      key[i] = data
  })

  let refinedData = roa.map(function(eachData) {
let flag=false
    key.forEach(function(keyValue, i) {
      if (eachData[keyValue] === undefined || eachData[keyValue].trim()==='-' && Object.keys(eachData).length>1)
        eachData[keyValue] = '-'
        if(i>=5 && i<=7)
        {
          if(flag!==true)
            flag=eachData[keyValue]==='-'
        }
    })
if(flag===false)
eachData['status']='confirmed'
else {
  eachData['status']='high probability'
}
    if (eachData.BMC !== undefined) {
      delete eachData.BMC
      if (Object.keys(eachData).length > 0)
        return eachData
    }
    return eachData
  })
  return {'BMC': BMC, 'DATA': refinedData}
}

function get_details(workbook) {
  let keys = Object.keys(workbook)
  for (key in keys) {
    if (keys[key] === 'Props') {
      return workbook[keys[key]]
    }
  }
}

function get_BMC(worksheetData) {

  let cell_names = Object.keys(worksheetData)
    let BMC = {}
      let key = '',
        value = '',
        col1 = '',
        col2 = ''

      cell_names.forEach(function(cell) {
        if (cell.includes('1') && worksheetData[cell].v === 'BMC') {
          col1 = cell.charAt(0)
          col2 = String.fromCharCode(cell.charCodeAt(0) + 1)
        }
      })

      cell_names.forEach(function(cell) {
        if ((cell.includes(col1) || cell.includes(col2))) {
          if (cell.includes(col1)) {
            key = worksheetData[cell].v
          } else if (cell.includes(col2)) {
            value = worksheetData[cell].v
          }
        }

        if (key !== '' && value !== '') {
          BMC[key] = value;
          key = ''
          value = ''
        }
      })
      return BMC;

    }
