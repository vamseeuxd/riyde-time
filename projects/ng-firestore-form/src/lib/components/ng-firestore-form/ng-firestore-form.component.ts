import {
  MOCK_EMAIL,
  MOCK_TEXT,
  MOCK_NUMBER,
  MOCK_DATE,
  MOCK_TEXT_AREA,
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
  type: string;
  defaultValue: string | number;
  name: string;
  hide: boolean;
  disabled: boolean;
  min: number | string;
  minMessage?: string;
  max: number | string;
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

  getErrorMessage(
    control: IFirestoreFormControl
  ): string | null {
    const formControl = this.firesoteForm?.controls[control.name];
    if (formControl && formControl.errors && formControl.dirty) {
      if ((formControl.errors as any).required) {
        return `<span class="text-danger">${
          control?.requiredMessage || `${control.label} is Required`
        }</span>`;
      }
      if ((formControl.errors as any).email) {
        return `<span class="text-danger">${
          control?.emailMessage || `Provide valid email Address`
        }</span>`;
      }
      if ((formControl.errors as any).minlength) {
        return `<span class="text-danger">${
          control?.minMessage || `Required Minimum of ${control.min} characters`
        }</span>`;
      }
      if ((formControl.errors as any).min) {
        return `<span class="text-danger">${
          control?.minMessage ||
          `${control.label} should more than ${control.min}`
        }</span>`;
      }
      if ((formControl.errors as any).max) {
        return `<span class="text-danger">${
          control?.minMessage ||
          `${control.label} should not more than ${control.max}`
        }</span>`;
      }
      if ((formControl.errors as any).pattern) {
        return `<span class="text-danger">${
          control?.patternMessage || `Provide ${control.label} in valid pattern`
        }</span>`;
      }
    }
    return null;
  }
}
