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

var TrimestreUn = []
for (var n = 0; n < result.length; n++) {
    TrimestreUn[n] = (result[n]['values'][1]['nb']);
    //  console.log(TrimestreUn);
}
// Cette fonction permet de renvoyer le calcul pour les trimestres //
function trimestre(m1, m2, m3) {
    for (var n = 0; n < result.length; n++) {
        trimestre[n] = (result[n]['values'][m1]['nb']) + (result[n]['values'][m2]['nb']) + (result[n]['values'][m3]['nb']);
    }
    return trimestre
}

console.log(trimestre(2,3,4))


var TrimestreDeux = []
for (var n = 0; n < result.length; n++) {
    TrimestreDeux[n] = (result[n]['values'][2]['nb']) + (result[n]['values'][3]['nb']) + (result[n]['values'][4]['nb']);
}


var TrimestreTrois = []
for (var n = 0; n < result.length; n++) {
    TrimestreTrois[n] = (result[n]['values'][5]['nb']) + (result[n]['values'][6]['nb']) + (result[n]['values'][7]['nb']);
}
var TrimestreQuatre = []
for (var n = 0; n < result.length; n++) {
    TrimestreQuatre[n] = (result[n]['values'][8]['nb']) + (result[n]['values'][9]['nb']) + (result[n]['values'][10]['nb']);
}
var TrimestreCinq = []
for (var n = 0; n < result.length; n++) {
    TrimestreCinq[n] = (result[n]['values'][11]['nb']) + (result[n]['values'][12]['nb']) + (result[n]['values'][13]['nb']);
}
var TrimestreSix = []
for (var n = 0; n < result.length; n++) {
    TrimestreSix[n] = (result[n]['values'][14]['nb']) + (result[n]['values'][15]['nb']) + (result[n]['values'][16]['nb']);
}
var TrimestreSept = []
for (var n = 0; n < result.length; n++) {
    TrimestreSept[n] = (result[n]['values'][17]['nb']) + (result[n]['values'][18]['nb']) + (result[n]['values'][19]['nb']);
}
var TrimestreHuit = []
for (var n = 0; n < result.length; n++) {
    TrimestreHuit[n] = (result[n]['values'][20]['nb']) + (result[n]['values'][21]['nb']) + (result[n]['values'][22]['nb']);
}
var TrimestreNeuf = []
for (var n = 0; n < result.length; n++) {
    TrimestreNeuf[n] = (result[n]['values'][23]['nb']) + (result[n]['values'][24]['nb']) + (result[n]['values'][25]['nb']);
}




const TrimUn = TrimestreUn.map((n) => <td>{n}</td>);
const TrimDeux = TrimestreDeux.map((TrimDeux) => <td>{TrimDeux}</td>);
const TrimTrois = TrimestreTrois.map((TrimTrois) => <td>{TrimTrois}</td>);
const TrimQuatre = TrimestreQuatre.map((TrimQuatre) => <td>{TrimQuatre}</td>);
const TrimCinq = TrimestreCinq.map((TrimCinq) => <td>{TrimCinq}</td>);
const TrimSix = TrimestreSix.map((TrimSix) => <td>{TrimSix}</td>);
const TrimSept = TrimestreSept.map((TrimSept) => <td>{TrimSept}</td>);
const TrimHuit = TrimestreHuit.map((TrimHuit) => <td>{TrimHuit}</td>);
const TrimNeuf = TrimestreNeuf.map((TrimNeuf) => <td>{TrimNeuf}</td>);


class ReactTable extends Component {
    render() {
        
        return (
            <div className="App">
                <h1>Tableau des résultats trimestriels</h1>
                <table>
                <tbody>
                    <tr>
                        <th>Item</th>
                        <th>Q1/2016</th>
                        <th>Q2/2016</th>
                        <th>Q3/2016</th>
                        <th>Q4/2016</th>
                        <th>Q1/2017</th>
                        <th>Q2/2017</th>
                        <th>Q3/2017</th>
                        <th>Q4/2017</th>
                        <th>Q1/2018</th>
                        <th>Q2/2018</th>
                    </tr>
                    </tbody>

                    {Data.map((DataDetail, n) => {
                        return (
                            <tbody>
                            <tr>
                                <td>{DataDetail.item}</td>
                                {TrimUn[n]}
                                {TrimDeux[n]}
                                {TrimTrois[n]}
                                {TrimTrois[n]}
                                {TrimQuatre[n]}
                                {TrimCinq[n]}
                                {TrimSix[n]}
                                {TrimSept[n]}
                                {TrimHuit[n]}
                                {TrimNeuf[n]}
                                
                            </tr>
                            </tbody>
                        )
                    }
                    )
                    }
                    
                </table>
            </div>
        );
    }
}

export default ReactTable;