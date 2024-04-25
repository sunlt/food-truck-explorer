const { Command } = require('commander');
const { queryCsv }  = require('../shared');


const program = new Command();


program
  .name('food-truck-explorer')
  .description('StreetEats Explorer: Your Guide to Urban Gastronomy')
  .version('1.0.0');

program.command('find-taco')
  .action(async () => {
    const rows = await queryCsv((row) => row.FoodItems.indexOf('Tacos') !== -1 || row.Applicant.indexOf('Tacos') !== -1);
    const names = rows.map(row => `${row.locationid} - ${row.Applicant}`);
    console.log(names.join('\n'));
  });

  program.command('search')
  .argument('<name>', '')
  .action(async (name) => {
    const rows = await queryCsv((row) => row.Applicant.indexOf(name) !== -1);
    const names = rows.map(row => `${row.locationid} - ${row.Applicant}`);
    console.log(names.join('\n'));
  });


program.command('info')
.argument('<id>', '')
.action(async (id) => {
    const rows = await queryCsv((row) => row.locationid == id.trim() );
    if(rows.length < 1){
        console.log('not found');
        return ;
    }
    console.log(rows[0]);
});
  

program.parse();