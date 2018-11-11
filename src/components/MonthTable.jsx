import React, {Component} from 'react';
import Data from '../data/data.json'
var myJSON = JSON.stringify(Data);
var moment = require('moment');

const parsedJson = JSON.parse(myJSON);
let result = [];
for (const i in parsedJson) {
    const values = [];
    for (var x in parsedJson[i]) {
        const date = x.split(' ');
        const dateFormatted = `${date[1]}/${date[0]}`; // String sous la forme "03/16"
        const DateToCorrect = (moment(dateFormatted, "MM/YYYY").toDate()); // Convcersion en obje date de ma date 
        const Date = moment(moment(DateToCorrect).add(1, "M")).toDate(); // fix car janvier = 0 donc j'ajoute 1 mois sinon j'ai un décalage entre mon obj date et la date formaté
        let value = parsedJson[i][x]
        if (typeof(value) == 'string') { // Dans le JSON les nombres > 1000 sont considéré comme des string et si j'applique un parse int vu que le nombre est sous la fomr "1 234" j'obtiens 1. Donc si le type est une string alors j'enlève l'espace avec le REGEX et je parseInt le résultat
            value = value.replace(/\s/g, '') 
        }
        values.push({
          Date: Date, 
          DateToDisplay: dateFormatted, 
          nb: parseInt(value)}); // parse int dont j'ai parler au dessus
    }
    result[i] = {
        'product': parsedJson[i].item,
        'values': values
    }
}

// console.log(result[1]['values'])


 //// OBJ DATE JS ////
var DisplayDates = []
for (var t = 1; t < 25; t++) {
    DisplayDates[t] = (result[0]['values'][t]['Date']);
}
// console.log((DisplayDates))  

//////////////////////////


Data.forEach(element => {
    element.dates = [];
    for (const key in element) {
        if (key !== 'item' && key !== "dates") {
            var uneDate = []
            uneDate.date = [key];
            uneDate.qty = element[key]; // = nb de vente
            element.dates.push(uneDate);
          //  console.log(uneDate.date)
        }
    }
});


var mesDates = []
for (var u = 1; u < 25; u++) {
    mesDates[u] = result[1]['values'][u]['DateToDisplay'];
}
console.log(mesDates);

const listDate = mesDates.map((DateToDisplay) => <th>{DateToDisplay}</th>);

// console.log(DisplayDateDeux);

// function re () {
//     const elements = ['one', 'two', 'three'];
//     return (
//       <ul>
//         {elements.map((value, index) => {
//           return <li key={index}>{value}</li>
//         })}
//       </ul>
//     )
//   }


  
class MonthTable extends Component {
    render() {
        return (
            <div className="App">
        <h1>Tableau des résultats mensuels</h1>
            <div class="scroll-table">
                <table className="monthtable">
                <tbody className="tbodymonth">
                <tr>
                <th>Item</th>
                         {listDate}
                    </tr>
                        {Data.map((DataDetail, index) => {
                            return (
                                <tr>
                                    <td>{DataDetail.item}</td>
                                    {DataDetail.dates.map((DataDate, index) => {
                                            return (
                                                <td>{DataDate.qty}</td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table> 
            </div>   
            </div>
        ) 
}}

export default MonthTable;



