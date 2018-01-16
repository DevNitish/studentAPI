var fs = require("fs");
var data = fs.readFileSync('./rawdata/test.csv');
var stringData=data.toString();
var arrayOne= stringData.split('\r\n');
var header=arrayOne[0].split(',');//get the header of the csv
var noOfRow=arrayOne.length;
var noOfCol=header.length;
var jArray=[];

var i=0,j=0; 
for (i = 1; i < noOfRow-1; i++) {

    var obj = {};
    var myNewLine=arrayOne[i].split(',');

    for (j = 0; j< noOfCol; j++) {
        var headerText = header[j].substring(0,header[j].length);
        var valueText = myNewLine[j].substring(0,myNewLine[j].length);
        obj[headerText] = valueText;
    };
    jArray.push(obj);
};

//write the json data in file
//fs.writeFile( "./rawdata/student.json", JSON.stringify( jArray ), "utf8");

//Finding topten

function compare(a,b) {
  if (a.score < b.score)
    return -1;
  if (a.score > b.score)
    return 1;
  return 0;
}

jArray.sort(compare);

console.log(jArray.reverse().slice(0,0+10));