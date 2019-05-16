import { Component, ViewChild } from "@angular/core";
import { ExcelService } from "./shared/excel.service";
import { HttpClient } from "@angular/common/http";
import { AgGridNg2 } from "ag-grid-angular";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("agGrid") agGrid: AgGridNg2;
  columnDefs = [
    {
      headerName: "Make",
      field: "make",
      sortable: true,
      filter: true,
      checkboxSelection: true
    },
    { headerName: "Model", field: "model", sortable: true, filter: true },
    { headerName: "Price", field: "price", sortable: true, filter: true }
  ];

  rowData: any;
  constructor(private excelService: ExcelService, private http: HttpClient) {}


  dataExport: any;
  ngOnInit() {
    this.rowData = this.http.get("https://api.myjson.com/bins/15psn9");
    //console.log(this.data);
    this.http.get("https://api.myjson.com/bins/15psn9").subscribe(data1 => {
      this.dataExport = data1;
    });
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    console.log(selectedData);
    this.exportAsXLSX(selectedData)
    
  }
  exportAsXLSX(selectedData): void {
    this.excelService.exportAsExcelFile(selectedData, "ExcelTestGary");
  }
  exportAsXLSX1(){
    this.excelService.exportAsExcelFile(this.dataExport, "ExcelTestGary");
  }
}
