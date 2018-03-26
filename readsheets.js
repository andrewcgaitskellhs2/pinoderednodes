"use strict";

var util = require("util");
var vm = require("vm");
var fs = require("fs");

var XLSX = require("xlsx");
var myrunid = "20180324160300012345"
var myFolder = '/Users/cf/Documents/'
var mySpreadsheet = 'DataSpecTableDemo.xlsx'
var myFullpath = myFolder + mySpreadsheet
var data = ""
var xldatabase = {}

var data = 
    {"cars": {
        "Nissan": {
            "Sentra": {"doors":4, "transmission":"automatic"},
            "Maxima": {"doors":4, "transmission":"automatic"}
        },
        "Ford": {
            "Taurus": {"doors":4, "transmission":"automatic"},
            "Escort": {"doors":4, "transmission":"automatic"}
        }
    }
}

console.debug(data.cars['Nissan']['Sentra'].doors)  // 4
console.debug(data.cars['Nissan']['Maxima'].doors)  // 4
console.debug(data.cars['Nissan']['Maxima'].transmission)   // automatic

data.cars['Ford']['Van'] = {}

data.cars['Ford']['Van'].transmission = "manual"

var mymake = 'Ford'
var mykind = 'Van'

console.debug(data.cars[mymake][mykind].transmission)

function createRecord(runid_in,folder_in,filename_in,sheetname_in,columnid_in,rowid_in){ 
    var xldatabase_in = {}
    xldatabase_in["runid"] = {}
    xldatabase_in["runid"] = runid_in
    xldatabase_in[runid_in]["folder"] = folder_in
    //xldatabase_in.runid["folder"] = folder_in;
    //xldatabase_in.runid.folder["filename"] = {}
    //xldatabase_in.runid.folder["filename"] = filename_in;
    //xldatabase_in.runid[runid_in].filename[filename_in].sheetname = sheetname_in;
    //xldatabase_in.runid[runid_in].filename[filename_in].sheetname[sheetname_in].columnid = columnid_in;
    //xldatabase_in.runid[runid_in].filename[filename_in].sheetname[sheetname_in].columnid[columnid_in].rowid = rowid_in;
    //xldatabase_in.runid[runid_in].filename[filename_in].sheetname[sheetname_in].columnid[columnid_in].rowid[rowid_in].rawvalue = {};
    //xldatabase_in.runid[runid_in].filename[filename_in].sheetname[sheetname_in].columnid[columnid_in].rowid[rowid_in].datatype = {};
}

createRecord(xldatabase,myrunid,myFolder,mySpreadsheet,"sheet1",1,2)
//////////////////////

global.runid = "20180324160300012345"
global.folder = '/Users/cf/Documents/'
global.filename = 'DataSpecTableDemo.xlsx'
global.globalpath = [runid,folder,filename]
var sheetname_in = 'Sheet1'
var columnid_in = 1
var rowid_in = 1
var rawvalue_in = 1
var datatype_in = "d"


var localpath_in = [sheetname_in,columnid_in,rowid_in]

var obj = {};  // global object

function jsonvalueset(obj,localpath, value) {
    var schema = obj;  // a moving reference to internal objects within obj
    //var pList = globalpath;
    var pList = globalpath;
    pList = pList.concat(localpath);
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
        var elem = pList[i];
        if( !schema[elem] ) schema[elem] = {}
        schema = schema[elem];
    }

    schema[pList[len-1]] = value;
}

jsonvalueset(xldatabase,localpath_in, rawvalue_in);

/////////////////////

var myJSON = JSON.stringify(xldatabase);

console.log(myJSON)

var fileContent = fs.readFileSync(myFullpath);
console.log(data);  

//fs.readFile(myFullpath, {encoding: 'utf-8'},function (err, fileContent) {
//    if (err) throw err;
//    console.log(fileContent);
//});

//var filename = myFullpath;
//console.log(fileContent);
//console.log(filename);

var option = {
    type: "buffer",
    raw: false,
    dateNF: "yyyy-mm-dd",
    cellDates: true,
    password: undefined,
    WTF: true,
};

var workbook = XLSX.read(fileContent, option);
/* DO SOMETHING WITH workbook HERE */

var all_sheet_names = workbook.SheetNames;

//console.log(all_sheet_names);

all_sheet_names.forEach(function(entry) {
    //console.log(entry);
    var cell_as_json = {c:0, r:0};
    cell_as_json.c = 1;
    cell_as_json.r = 1;
    var address_of_cell = XLSX.utils.encode_cell(cell_as_json)
    
    /* Get worksheet */
    var worksheet = workbook.Sheets[entry];
    var range = worksheet['!ref'];
    var colcount = worksheet['!cols'];
    var rowcount = worksheet['!rows'];
    //////////////////
    var result = [];
    var row;
    var rowNum;
    var colNum;
    var CurrentCellRef;
    var CurrentCellJson = {};
    var CurrentCellValue;
    var wsdata = {};
    var range = XLSX.utils.decode_range(worksheet['!ref']);
    for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++)
        {
        row = [];
        for(colNum=range.s.c; colNum<=range.e.c; colNum++){
            CurrentCellRef =  XLSX.utils.encode_cell({r: rowNum, c: colNum});
            CurrentCellJson = worksheet[CurrentCellRef];
            sheetname_in = entry;
            columnid_in = colNum;
            rowid_in = rowNum;
            localpath_in = [sheetname_in,columnid_in,rowid_in,"rawvalue"]
            try {
                rawvalue_in = CurrentCellJson.v;
                jsonvalueset(xldatabase,localpath_in, rawvalue_in);
              }
            catch(error) {
                jsonvalueset(xldatabase,localpath_in, "Error");
                //console.log(CurrentCellJson);
                // expected output: SyntaxError: unterminated string literal
                // Note - error messages will vary depending on browser
              }
              localpath_in = [sheetname_in,columnid_in,rowid_in,"datatype"]
              try {
                datatype_in = CurrentCellJson.t;
                jsonvalueset(xldatabase,localpath_in, datatype_in);
              }
            catch(error) {
                jsonvalueset(xldatabase,localpath_in, "Error");
                //console.log(CurrentCellJson);
                // expected output: SyntaxError: unterminated string literal
                // Note - error messages will vary depending on browser
              }
            
        }}
    /////////////////


    
    /* Find desired cell */
    //var desired_cell = worksheet[address_of_cell];
    
    /* Get the value */
    //var desired_value = (desired_cell ? desired_cell.v : undefined);
    //var desired_json = desired_cell
    //v	raw value (see Data Types section for more info)
    //w	formatted text (if applicable)
    //t	type: b Boolean, e Error, n Number, d Date, s Text, z Stub
    //f	cell formula encoded as an A1-style string (if applicable)
    //F	range of enclosing array if formula is array formula (if applicable)
    //r	rich text encoding (if applicable)
    //h	HTML rendering of the rich text (if applicable)
    //c	comments associated with the cell
    //z	number format string associated with the cell (if requested)
    //l	cell hyperlink object (.Target holds link, .Tooltip is tooltip)
    //s	the style/theme of the cell (if applicable)

    //console.log(desired_value);
    //console.log(desired_json);
});


var myJSON = JSON.stringify(xldatabase);

console.log(myJSON)
