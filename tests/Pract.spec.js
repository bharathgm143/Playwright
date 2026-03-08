const Exceljs=require("exceljs");
import{expect, test} from "@playwright/test";

async function wrightExcel(searchtext,relacetext,change, filepath){
const workbook=new Exceljs.Workbook();
await workbook.xlsx.readFile(filepath);
const worksheet=workbook.getWorksheet("Sheet1");
const output=await readExcel(worksheet, searchtext);

const cell=worksheet.getCell(output.row,output.column+change.columnchange);
cell.write=relacetext;
await workbook.xlsx.write(filepath);
}   
  let output={row:-1, column:-1};      
async function readExcel(worksheet, searchtext){
worksheet.eachRow((row, rownumber)=>{
         row.eachCell((cell, colnumber)=>{
            if(cell.value === searchtext){
               output.row=rownumber;
               output.column=colnumber;
            }
         });
});
return output;
}
wrightExcel("Mango","Venilla",{rowchange:0,columnchange:2},"C:/Users/BHARATH/Downloads/downloadTest.xlsx");
test("upload download",async({page})=>{



})