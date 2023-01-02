import {
  MOCK_EMAIL,
  MOCK_TEXT,
  MOCK_NUMBER,
  MOCK_DATE,
  MOCK_TEXT_AREA,
  MOCK_SELECT,
  MOCK_MULTI_SELECT,
} from './mock-controls-config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';

export interface IOffset {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface IColumn {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface IFirestoreFormControl {
  id: string;
  placeholder: string;
  label: string;
  type: 'email' | 'text' | 'number' | 'date' | 'textarea' | 'select' | 'multi-select';
  defaultValue: string | number | any[];
  name: string;
  hide: boolean;
  disabled: boolean;
  min?: number | string;
  minMessage?: string;
  max?: number | string;
  maxMessage?: string;
  pattern?: string;
  help?: string;
  patternMessage?: string;
  required: boolean;
  requiredMessage?: string;
  emailMessage?: string;
  rows?: number;
  cols?: number;
  resize?: 'both' | 'horizontal' | 'vertical' | 'none';
  offset: IOffset;
  column: IColumn;
  dataProvider?: {
    data: any[];
    idField: string;
    labelField: string;
  };
}

export const DEFAULT_OFFSET: IOffset = {
  sm: '',
  md: '',
  lg: '',
  xl: '',
  xxl: '',
};

export const DEFAULT_COLUMN: IColumn = {
  sm: '6',
  md: '4',
  lg: '',
  xl: '',
  xxl: '',
};

@Component({
  selector: 'ng-firestore-form',
  templateUrl: `./ng-firestore-form.component.html`,
  styles: [],
})
export class NgFirestoreFormComponent implements OnInit {
  @ViewChild('firesoteForm')
  firesoteForm!: NgForm;
  controls: IFirestoreFormControl[] = [
    MOCK_EMAIL,
    MOCK_TEXT,
    MOCK_NUMBER,
    MOCK_DATE,
    MOCK_TEXT_AREA,
    MOCK_SELECT,
    MOCK_MULTI_SELECT,
  ];

  constructor() {}

  ngOnInit(): void {}

  getResponsiveClass(
    prefix: string,
    column: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    }
  ): string {
    return (
      Object.keys(column)
        // @ts-ignore
        .filter((col) => column[col].trim().length > 0)
        // @ts-ignore
        .map((col: any) => `${prefix}-${col}-${column[col]}`)
        .join(' ')
    );
  }

  saveForm(formControl: any) {
    console.log(formControl);
  }

  get defaultValues(): any {
    const returnValue: any = {};
    this.controls.forEach((control) => {
      returnValue[control.name] = control.defaultValue;
    });
    return returnValue;
  }

  getErrorMessage(control: IFirestoreFormControl): string | null {
    const formControl = this.firesoteForm?.controls[control.name];
    if (formControl && !formControl.errors && formControl.dirty) {
      if (control.type === 'number' || control.type === 'date') {
        if (control.min && formControl.value < control.min) {
          /* prettier-ignore */
          setTimeout(() => formControl.setErrors({ min: true }), 0);
          /* prettier-ignore */
          return `<small class="text-danger">${ control?.minMessage || `<small>${control.label} should more than ${control.min}</small>`}</small>`;
        }
        if (control.max && formControl.value > control.max) {
          /* prettier-ignore */
          setTimeout(() => formControl.setErrors({ max: true }), 0);
          /* prettier-ignore */
          return `<small class="text-danger">${ control?.maxMessage || `<small>${control.label} should less than ${control.max}</small>`}</small>`;
        }
      }
    }
    if (formControl && formControl.errors && formControl.dirty) {
      // console.log(formControl);
      if ((formControl.errors as any).required) {
        /* prettier-ignore */
        return `<small class="text-danger">${ control?.requiredMessage || `<small>${control.label} is Required</small>` }</small>`;
      }
      if ((formControl.errors as any).email) {
        /* prettier-ignore */
        return `<small class="text-danger">${ control?.emailMessage || `<small>Provide valid email Address</small>` }</small>`;
      }
      if ((formControl.errors as any).minlength) {
        /* prettier-ignore */
        return `<small class="text-danger">${ control?.minMessage || `<small>Required Minimum of ${control.min} characters</small>` }</small>`;
      }
      if ((formControl.errors as any).min) {
        /* prettier-ignore */
        return `<small class="text-danger">${ control?.minMessage || `<small>${control.label} should more than ${control.min}</small>`}</small>`;
      }
      if ((formControl.errors as any).max) {
        /* prettier-ignore */
        return `<small class="text-danger">${ control?.maxMessage || `<small>${control.label} should less than ${control.max}</small>`}</small>`;
      }
      if ((formControl.errors as any).pattern) {
        /* prettier-ignore */
        return `<small class="text-danger">${ control?.patternMessage || `<small>Provide ${control.label} in valid pattern</small>` }</small>`;
      }
    }
    return null;
  }

  getNumberErrorMessage() {}
}
