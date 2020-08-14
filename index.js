const employeeRecords=[]
function createEmployeeRecord(arr){
    const employeeObject = {};
    employeeObject.firstName=arr[0];
    employeeObject.familyName=arr[1];
    employeeObject.title=arr[2];
    employeeObject.payPerHour=arr[3];
    employeeObject.timeInEvents= [];
    employeeObject.timeOutEvents=[]
    employeeRecords.push(employeeObject)
    return employeeObject
}

function createEmployeeRecords(arr){
    return arr.map(x=>createEmployeeRecord(x))
}

function createTimeInEvent(workerObj,date){
  const datePartIn = date.split(" ")
  const pushTimein = {type:"TimeIn",date:datePartIn[0],hour:parseInt(datePartIn[1])}
  workerObj.timeInEvents.push(pushTimein)
  return workerObj 
}

function createTimeOutEvent(workerObj,date){
  const datePartOut = date.split(" ")
  const pushTimeOut = {type:"TimeOut",date:datePartOut[0],hour:parseInt(datePartOut[1])}
  workerObj.timeOutEvents.push(pushTimeOut)
  return workerObj 
}


function hoursWorkedOnDate(workerObj,date){
  const timeInOutArr =[workerObj.timeInEvents,workerObj.timeOutEvents];
  //console.log(timeInOutArr)
  let timeInHour= 0;
  let timeOutHour = 0;
  timeInOutArr.map((x)=>{
  for(const typ of x){
    if(typ.type=== "TimeIn" && typ.date===date){
      timeInHour=typ.hour
    }
    else if( typ.type==="TimeOut" && typ.date===date){
      timeOutHour=typ.hour
    }
  }
  })
  return (timeOutHour-timeInHour)/100
}


function wagesEarnedOnDate(workerObj,date){
  const hoursWorked = hoursWorkedOnDate(workerObj,date)
  
  return workerObj.payPerHour*hoursWorked
}

function allWagesFor(workerObj){
  const dates = [];
  let totalPayFor=0;
  workerObj.timeOutEvents.map((x)=>{
    dates.push(x.date)
  })
  dates.map((y)=>{
    totalPayFor+= wagesEarnedOnDate(workerObj,y)
  })
  return totalPayFor
}

function findEmployeeByFirstName(arr,name){
  const newArr=[];
  let workerObj=""
  arr.map((x)=>{
    if(x.firstName===name){workerObj=x}
    })
  return workerObj
}

function calculatePayroll(arr){
  let total=0;
  arr.map((x)=>{
    total+= allWagesFor(x);
  })
  return total
}