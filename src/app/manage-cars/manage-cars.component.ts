import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from '../toasts/toasts.service';

export interface ICar {
  id: string;
  name: string;
}

@Component({
  selector: 'app-manage-cars',
  templateUrl: './manage-cars.component.html',
  styleUrls: ['./manage-cars.component.scss'],
})
export class ManageCarsComponent implements OnInit {
  mockCars: ICar[] = Array.from(Array(10).keys()).map((key) => {
    return {
      name: 'Car-' + key,
      id: '' + key,
    };
  });

  carsAction: BehaviorSubject<ICar[]> = new BehaviorSubject(this.mockCars);
  cars$ = this.carsAction.asObservable();

  isEdit = false;

  activeCar: ICar = { id: '', name: '' };

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    public toastService: ToastService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(
    content,
    isEdit = false,
    size = null,
    centered = false,
    activeCar: ICar = { id: '', name: '' }
  ) {
    this.isEdit = isEdit;
    this.activeCar = activeCar;
    const modalRef: NgbModalRef = this.modalService.open(content, {
      size,
      centered,
    });
    console.log(modalRef.componentInstance);
  }

  ngOnInit() {}

  identify(index: number, item: { id: string }) {
    return item.id;
  }

  deleteCar() {
    this.carsAction.next(
      this.carsAction.value.filter((car) => car.id !== this.activeCar.id)
    );
    this.toastService.show(this.activeCar.name + ' Deleted Successfully.', {
      classname: 'bg-success text-light',
      delay: 2000,
    });
  }
}
