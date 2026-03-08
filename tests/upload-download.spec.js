const Exceljs=require('exceljs');
import{expect, test} from "@playwright/test";

async function wrightExcelTest(searchText,replaceText,change,filepath){
const workbook=new Exceljs.Workbook();
await workbook.xlsx.readFile(filepath);
const worksheet=workbook.getWorksheet("Sheet1");
const output=await readExcel(worksheet, searchText);

const cell=worksheet.getCell(output.row,output.column+change.colchange);
cell.value=replaceText;
await workbook.xlsx.writeFile(filepath);
}

let output={row:-1,column:-1};
async function readExcel(worksheet, searchText){
    worksheet.eachRow((row, rownumber)=>{
    row.eachCell((cell, colnumber)=>{
      if(cell.value === searchText){
        output.row=rownumber;
        output.column=colnumber;
      }
    });
});
return output;
}
//wrightExcelTest("Rabbit Bharath","Blue",{rowchange:0,colchange:1},"C:/Users/BHARATH/Downloads/exceldownloadTest.xlsx");
test("upload downlaod excel validation",async ({page})=>{

    const srchtext='Mango';
    const updatedvalue='350';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromisetime=page.waitForEvent('download');
  await page.getByRole("button", { name: "Download" }).click();
  const download = await downloadPromisetime;

  const filePath = "C:/Users/BHARATH/Downloads/download.xlsx";

  // THIS CREATES THE FILE
  await download.saveAs(filePath);

  await wrightExcelTest(srchtext, updatedvalue, { rowchange: 0, colchange: 2 }, filePath);

  await page.locator("#fileinput").setInputFiles(filePath);

  const textlocator=page.getByText(srchtext);
  const desiredrow=await page.getByRole("row").filter({has:textlocator});

  await expect(desiredrow.locator("#cell-4-undefined")).toContainText(updatedvalue);

});