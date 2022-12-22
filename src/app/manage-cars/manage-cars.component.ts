import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.css'],
})
export class ManageCarsComponent implements OnInit {
  cars = [
    { name: 'Car-01', id: '01' },
    { name: 'Car-02', id: '02' },
    { name: 'Car-03', id: '03' },
    { name: 'Car-04', id: '04' },
    { name: 'Car-05', id: '05' },
    { name: 'Car-06', id: '06' },
  ];

  isEdit = false;

  closeResult: string;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content, isEdit = false) {
    this.isEdit = isEdit;
    this.modalService.open(content);
  }

  ngOnInit() {}
}
