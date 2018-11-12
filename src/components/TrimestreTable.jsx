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
    let deleteItemInArray = (result[i]['values']).shift(); // J'ai une faute dans mes objets car il n'arrive pas à faire uen date avec les items logique donc je supprime tous les premiers résultats => item
}

///// Affichage des trimestres automatiques //

let myQuarters = []
let myMonth = []
for (var u = 0; u < 25; u++) {
    myMonth[u] = result[1]['values'][u]['DateToDisplay'];
   myQuarters[u] = [moment(myMonth[u], "MM/YYYY").format("[Q]Q/YYYY")] // Calcul des trimestre par contre j'ai des trimestres qui se répétent

}
console.log(myQuarters)

// Suppression des redondances car j'avais des 3x les trimestres //
function cleanMyQuarters ( ar ) {
    var j = {};
    ar.forEach( function(v) {
      j[v+ '::' + typeof v] = v;
    });
    return Object.keys(j).map(function(v){
      return j[v];
    });
  }

let cleanQuarters = cleanMyQuarters(myQuarters)
const listQuarters = cleanQuarters.map((QuartersToDisplay) => <th>{QuartersToDisplay}</th>);



// fonction permet de renvoyer le calcul pour les trimestres //
var ValueOfQuarter = []
function trimestre(m)
{
    for (var n = 0; n < result.length; n++) {
        ValueOfQuarter[n] = (result[n]['values'][m]['nb']) + (result[n]['values'][m+1]['nb']) + (result[n]['values'][m+2]['nb']);
    }
    return ValueOfQuarter
}



// Calclul pour Q1 //
var TrimestreUn = []
for (var n = 0; n < result.length; n++) {
    TrimestreUn[n] = (result[n]['values'][0]['nb']);
}
const TrimUn = TrimestreUn.map((n) => <td>{n}</td>);

// Calcul pour les Q suivant
let valueTrimestreDeux = trimestre(1);
const TrimesrezDeux = valueTrimestreDeux.map((TrimDeux) => <td>{TrimDeux}</td>);

let valueTrimestreTrois = trimestre(4);
const TrimestreTrois = valueTrimestreTrois.map((TrimTrois) => <td>{TrimTrois}</td>);

let valueTrimestreQuatre = trimestre(7);
const TrimestreQuatre = valueTrimestreQuatre.map((TrimQuatre) => <td>{TrimQuatre}</td>);

let valueTrimestreCinq = trimestre(10);
const TrimestreCinq = valueTrimestreCinq.map((TrimCinq) => <td>{TrimCinq}</td>);

let valueTrimestreSix = trimestre(13);
const TrimestreSix = valueTrimestreSix.map((TrimSix) => <td>{TrimSix}</td>);

let valueTrimestreSept = trimestre(16);
const TrimestreSept = valueTrimestreSept.map((TrimSept) => <td>{TrimSept}</td>);

let valueTrimestreHuit = trimestre(19);
const TrimestreHuit = valueTrimestreHuit.map((TrimHuit) => <td>{TrimHuit}</td>);

let valueTrimestreNeuf = trimestre(22);
const TrimestreNeuf = valueTrimestreNeuf.map((TrimNeuf) => <td>{TrimNeuf}</td>);



class TrimestreTable extends Component {
    render() {
         
        
        return (
            <div className="App">
                <h1>Tableau des résultats trimestriels</h1>
                <table>
                <tbody>
                <tr>
                <th>Item</th>
                {listQuarters}
                    </tr>
                   
                    {Data.map((DataDetail, n) => {
                        return (
                            <tr><th>{DataDetail.item} </th>                 
                            {TrimUn[n]}
                            {TrimesrezDeux[n]}
                            {TrimestreTrois[n]}
                            {TrimestreQuatre[n]}
                            {TrimestreCinq[n]}
                            {TrimestreSix[n]}
                            {TrimestreSept[n]}
                            {TrimestreHuit[n]}
                            {TrimestreNeuf[n]}

                            </tr>
                        )})}

                    </tbody>
                </table>
            </div>
        );
    }
}

export default TrimestreTable;


