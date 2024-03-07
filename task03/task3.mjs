import csv from "csvtojson";
import fs from "fs"

const csvFilePath = './task03/data.csv';
const txtFilePath = './task03/data.txt';

function transformKeysToLowerCase(obj) {
  const entries = Object.entries(obj);

  for (const [key, value] of entries) {
    const lowerKey = key.toLowerCase();
    obj[lowerKey] = value;
    delete obj[key];
  }
}

csv()
  .fromFile(csvFilePath)
  .subscribe((jsonObj)=>{
    delete jsonObj.Amount;
    jsonObj.Price = +jsonObj.Price;

    transformKeysToLowerCase(jsonObj);

    const jsonStr= JSON.stringify(jsonObj);

    fs.appendFile(txtFilePath, `${jsonStr}\n`, (err) => {
      if (err)  console.log(err);
    });
  })
  .on('error',(err)=>{
    console.log(err)
  })
