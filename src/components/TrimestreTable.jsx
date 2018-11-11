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



// Cette fonction permet de renvoyer le calcul pour les trimestres //
function trimestre(m) {
    for (var n = 0; n < result.length; n++) {
        trimestre[n] = (result[n]['values'][m]['nb']) + (result[n]['values'][m+1]['nb']) + (result[n]['values'][m+2]['nb']);
    }
    return trimestre
}
console.log(trimestre(1,2,3))

var TrimestreUn = []
for (var n = 0; n < result.length; n++) {
    TrimestreUn[n] = (result[n]['values'][0]['nb']);
}


var TrimestreDeux = []
for (var n = 0; n < result.length; n++) {
    TrimestreDeux[n] = (result[n]['values'][1]['nb']) + (result[n]['values'][2]['nb']) + (result[n]['values'][3]['nb']);
}

var TrimestreTrois = []
for (var n = 0; n < result.length; n++) {
    TrimestreTrois[n] = (result[n]['values'][4]['nb']) + (result[n]['values'][5]['nb']) + (result[n]['values'][6]['nb']);
}
var TrimestreQuatre = []
for (var n = 0; n < result.length; n++) {
    TrimestreQuatre[n] = (result[n]['values'][7]['nb']) + (result[n]['values'][8]['nb']) + (result[n]['values'][9]['nb']);
}
var TrimestreCinq = []
for (var n = 0; n < result.length; n++) {
    TrimestreCinq[n] = (result[n]['values'][10]['nb']) + (result[n]['values'][11]['nb']) + (result[n]['values'][12]['nb']);
}
var TrimestreSix = []
for (var n = 0; n < result.length; n++) {
    TrimestreSix[n] = (result[n]['values'][13]['nb']) + (result[n]['values'][14]['nb']) + (result[n]['values'][15]['nb']);
}
var TrimestreSept = []
for (var n = 0; n < result.length; n++) {
    TrimestreSept[n] = (result[n]['values'][16]['nb']) + (result[n]['values'][17]['nb']) + (result[n]['values'][18]['nb']);8
}
var TrimestreHuit = []
for (var n = 0; n < result.length; n++) {
    TrimestreHuit[n] = (result[n]['values'][19]['nb']) + (result[n]['values'][20]['nb']) + (result[n]['values'][21]['nb']);
}
var TrimestreNeuf = []
for (var n = 0; n < result.length; n++) {
    TrimestreNeuf[n] = (result[n]['values'][22]['nb']) + (result[n]['values'][23]['nb']) + (result[n]['values'][24]['nb']);
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



class TrimestreTable extends Component {
    render() {
         
        
        return (
            <div className="App">
                <h1>Tableau des résultats trimestriels</h1>
                <table>
                <thead>
                <tr>
                <th>Item</th>
                {listQuarters}
                    </tr>
                    </thead>

                    {Data.map((DataDetail, n) => {
                        return (
                            <tbody>
                            <tr>
                                <td>{DataDetail.item}</td>
                                {TrimUn[n]}
                                {TrimDeux[n]}
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

export default TrimestreTable;