const { withCSV } = require('with-csv');  
const path = require('path'); 

const ColumnNames = 'locationid,Applicant,FacilityType,LocationDescription,Address,permit,Status,FoodItems,Latitude,Longitude,Schedule,dayshours,Approved,Received,ExpirationDate,Zip Codes'.trim().split(',');


async function queryCsv (filterFn){
  if(!filterFn) {
    filterFn = (row) => true;
  }

  const result = await withCSV(path.resolve(__dirname,'./Mobile_Food_Facility_Permit.csv'))
  .columns(ColumnNames)
  .filter(filterFn)
  .rows();
  
  return result;
}

module.exports.queryCsv = queryCsv;
module.exports.ColumnNames = ColumnNames;