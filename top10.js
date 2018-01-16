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
var big = 0;
var topTen = [];
var index = -1;
for (var j = 0; j < 10; j++) {
  for (var i = 0; i < jArray.length; i++) {
    if (jArray[i].score > big && jArray[i].score > 0) {
      big = jArray[i];
      index = i;
    }
  }
  jArray[index].score = -1;
  topTen.push(big);
  big = 0;
}
console.log(topTen);