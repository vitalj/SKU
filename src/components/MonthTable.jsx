import React, {Component} from 'react';
import Data from '../data/data.json'
import TrimestreTable from './TrimestreTable.jsx';
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
   let deleteItemInArray = (result[i]['values']).shift(); // J'ai une faute dans mes objets car il n'arrive pas à faire uen date avec les items logique donc je supprime tous les premiers résultats => item

}

 //// OBJ DATE JS ////
var DisplayDates = []
for (var t = 0; t < 25; t++) {
    DisplayDates[t] = (result[0]['values'][t]['Date']);
}
//////////////////////////


let myMonth = []
for (var u = 0; u < 25; u++) {
    myMonth[u] = result[1]['values'][u]['DateToDisplay'];
}

const listMonth = myMonth.map((MonthToDisplay) => <th>{MonthToDisplay}</th>);


class MonthTable extends Component {
    render() {
        return (
            <div className="App">
        <h1>Tableau des résultats mensuels</h1>
            <div className="scroll-table">
            {/* <Button tag={TrimestreTable}  to="/TrimestreTable" /> */}

            <button className="">Résultats Trimestriels</button>
            
                <table className="monthtable">
                <thead></thead>
                <tbody className="tbodymonth">
                <tr>
                <th>Item</th>
                         {listMonth}
                    </tr>
                        {result.map((DataDetail, index) => {
                            return (
                                <tr>
                                    <th>{DataDetail.product}</th>
                                    {DataDetail.values.map((DataDate, index) => {
                                            return (
                                                <td>{DataDate.nb}</td>
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

