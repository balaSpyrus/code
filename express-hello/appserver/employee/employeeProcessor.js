function getEmployee(empid) {

  //This is a asynch op
  //Go to DB and fetch record for specified empid

  var empObj = {
    empid: 1000,
    name: "Mukesh Ambani",
    age: '54',
    sal: 1,
    dept: 'management',
    email: 'mambanisr@rel.in'
  };

  return empObj;
};


function createNewEmployee(newEmpObj) {
  var empObj = {
    empid: searchEmployee(),
    name: newEmpObj.name,
    age: newEmpObj.age,
    sal: newEmpObj.sal,
    dept: newEmpObj.dept,
    email: newEmpObj.email
  };

  //Asynch method
  //Save empObj to DB

  return empObj;
};

function searchEmployee() {
  return 1000;
}

module.exports = {
  getEmployee: getEmployee,
  createNewEmployee: createNewEmployee
};