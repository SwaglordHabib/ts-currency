const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const xml2js = require('xml2js');

const url =
  'https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml';
const filePath = path.join(__dirname, '../data/currencyData.json');

fetch(url)
  .then((res) => res.text())
  .then((xml) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const json = JSON.stringify(result, null, 2);
        const parseString = JSON.parse(json);
        const currencyMap = {};
        currencyMap.version = parseString.ISO_4217.$.Pblshd;
        currencyMap.currencies = [];
        parseString.ISO_4217.CcyTbl[0].CcyNtry.forEach((entry) => {
          if (!entry.Ccy) {
            return;
          }
          const currency = {};
          currency.name = entry.CcyNm[0];
          currency.code = entry.Ccy[0];
          currency.country = entry.CtryNm[0];
          currency.decimals = parseInt(entry.CcyMnrUnts[0]);
          currency.symbol = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: entry.Ccy[0],
          })
            .format(1)
            // remove digits and spaces and commas
            .replace( /\d|\.|,|\s/g, '' );
          currencyMap.currencies.push(currency);
        });
        const currencyJson = JSON.stringify(currencyMap, null, 2);
        fs.writeFile(filePath, currencyJson, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Successfully fetched and saved currency data.');
          }
        });
      }
    });
  });
