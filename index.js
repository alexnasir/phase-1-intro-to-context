// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeinEvents: [],
    timeOutEvents: [],
  };
}
function createEmployeeRecords(Arrays) {
  return Arrays.map(createEmployeeRecord);
}
function createTimeInEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split("");

  const timeInEvent = {
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10),
  };
  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split('');

  const timeOutEvent = {
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10),
  };
  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );

  if (timeInEvent && timeOutEvent) {
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  return 0;
}
function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}
function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    return dates.reduce((totalWages, date) => {
        return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
}
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, record) => {
        return totalPayroll + allWagesFor(record);
    }, 0);
}
function createEmployeeRecordsFromCSV(csvData) {
    const rows = csvData.split('\n').map(row => row.split(','));
    return createEmployeeRecords(rows);
}


