import fs from 'fs';
import readXlsxFile from 'read-excel-file/node';
import { Job } from './model/job';

// file path from command line argument
const filePath = process.argv[2];

readXlsxFile(filePath).then((rows) => {
  let sankeyMATICString = '';
//
  // map cells to Job model from rows
  const jobs = rows.map((row) => {
    return new Job(
      row[0] as string,
      row[1] as string,
      new Date(row[2] as string),
      row[3] == 'Yes' ? true : false,
      row[4] == 'Yes' ? true : false,
      row[5] == 'Yes' ? true : false,
      row[6] == 'Yes' ? true : false,
      row[7] == 'Yes' ? true : false
    );
  });

  // get sum of contacted and rejected jobs
  const contacted = jobs.filter((job) => job.contacted).length;
  const ghosted = jobs.filter((job) => !job.contacted).length;
  const rejected = jobs.filter((job) => job.rejected).length;
  
  // get sum of one interview and more than one interview
  const oneInterview = jobs.filter((job) => job.oneInterview).length;
  const moreThanOneInterview = jobs.filter((job) => job.moreThanOneInterview).length;

  // get sum of accepted jobs
  const accepted = jobs.filter((job) => job.Accepted).length;

  // add contacted jobs to sankeyMATICString
  if (contacted > 0) {
    sankeyMATICString += `Applications [${contacted}] Contacted`;
  }

  // add ghosted jobs to sankeyMATICString
  if (ghosted > 0) {
    sankeyMATICString += `\nApplications [${ghosted}] Ghosted`;
  }

  // add rejected jobs to sankeyMATICString
  if (rejected > 0) {
    sankeyMATICString += `\nContacted [${rejected}] Rejected`;
  }

  // add one interview jobs to sankeyMATICString
  if (oneInterview) {
    sankeyMATICString += `\nContacted [${oneInterview}] One Interview`;
  }

  // add more than one interview jobs to sankeyMATICString
  if (moreThanOneInterview > 0) {
    sankeyMATICString += `\nOne Interview [${moreThanOneInterview}] More than one Interview`;
  }

  // add accepted jobs to sankeyMATICString
  if (accepted > 0) {
    sankeyMATICString += `\nMore than one Interview [${accepted}] Accepted`;
  }

  // send sankeyMATICString to text file
  fs.writeFile('out/sankeyMATIC.txt', sankeyMATICString, (err) => {
    if (err) throw err;
    console.log('sankeyMATIC.txt file has been saved!');
  }
  );
})
