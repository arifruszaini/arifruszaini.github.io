import { ThrowStmt } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';

import { JobDetails } from '../../../models/job-details';
import { JobdetailsService } from '../../../services/jobdetails.service';

const data: any = require('app/pages/tables/smart-table/db.json');

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  @Input() selectedStatus: string = 'Closed';

  status: string[] = ['Open', 'Closed'];

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      jobTitle: {
        title: 'Job Title',
        type: 'string',
      },
      company: {
        title: 'Company',
        type: 'string',
      },
      state: {
        title: 'State',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'string',
      },
      jobStatus: {
        title: 'Job Status',
        type: 'string',
      },
    },
  };

  public rows: JobDetails[];
  tempData: JobDetails[];
  openJob = [];
  closeJob = [];

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private jobDetailsService: JobdetailsService) {
    this.loadAll()
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onChange(sta){
    if(this.selectedStatus !== sta){
      this.selectedStatus = sta;

      if(this.selectedStatus === "Closed"){
        this.rows = this.closeJob;
      } else{
        this.rows = this.openJob;
      }
    }
  }

  loadAll() {
    this.jobDetailsService.getAll().subscribe(dataOri=>{
      this.rows = dataOri;
      this.tempData = dataOri;
      if(this.rows){
        dataOri.forEach(data1 =>{
          if(data1.jobStatus === "Closed"){
            this.closeJob.push(data1)
          } else {
            this.openJob.push(data1)
          }
        })
      } else {
        this.rows = data;
        data.forEach(data2 =>{
          if(data2.jobStatus === "Closed"){
            this.closeJob.push(data2)
          } else {
            this.openJob.push(data2)
          }
        })
      }
      
    });

    

  }
}
