import {
  MOCK_EMAIL,
  MOCK_TEXT,
  MOCK_NUMBER,
  MOCK_DATE,
  MOCK_TEXT_AREA,
  MOCK_SELECT,
  MOCK_MULTI_SELECT,
  MOCK_FILE,
  MOCK_RADIO,
  MOCK_CHECK_BOXES,
} from './mock-controls-config';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  type:
    | 'email'
    | 'text'
    | 'number'
    | 'date'
    | 'textarea'
    | 'select'
    | 'multi-select'
    | 'radio'
    | 'check-box'
    | 'file';
  defaultValue: string | number | any[] | null;
  name: string;
  accept?: string;
  isCheckInline?: boolean;
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
export class NgFirestoreFormComponent implements AfterViewInit {
  @ViewChild('firesoteForm')
  firesoteForm!: NgForm;
  private _controls: IFirestoreFormControl[] = [];
  public get controls(): IFirestoreFormControl[] {
    return this._controls;
  }
  @Input()
  public set controls(value: IFirestoreFormControl[]) {
    this._controls = value;
    this.updateCheckBoxData();
  }

  constructor() {}

  updateCheckBoxData() {
    this._controls.forEach((option) => {
      if (option.type === 'check-box') {
        if (option.dataProvider) {
          option.dataProvider.data.forEach((opt) => {
            if (option.dataProvider) {
              opt.selected = (option.defaultValue as any[]).includes(
                opt[option.dataProvider?.idField]
              );
            }
          });
        }
        this.onCheckBoxChange(option, { target: null }, '');
      }
    });
  }

  ngAfterViewInit(): void {
    this.firesoteForm.resetForm = () => {
      this.updateCheckBoxData();
    };
  }

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

  onFileChange(control: IFirestoreFormControl, event: Event) {
    const file: File = (event.target as any).files[0] as File;
    if (file) {
      const size = file.size;
      const formControl = this.firesoteForm?.controls[control.name];
      if (control.min && size < control.min) {
        /* prettier-ignore */
        setTimeout(() => formControl.setErrors({ min: true }), 0);
      }
      if (control.max && size > control.max) {
        /* prettier-ignore */
        setTimeout(() => formControl.setErrors({ max: true }), 0);
      }
    }
  }

  onCheckBoxChange(
    control: IFirestoreFormControl,
    event: { target: any },
    id: string
  ) {
    setTimeout(() => {
      control.dataProvider?.data.forEach((Option) => {
        if (control.dataProvider) {
          if (Option[control.dataProvider.idField] == id) {
            Option.selected = event.target.checked;
          }
        }
      });
      if (control.dataProvider && control.dataProvider.data) {
        const formControl = this.firesoteForm?.controls[control.name];
        const value = control.dataProvider.data
          .filter((d) => {
            return d.selected;
          })
          .map((d) => {
            if (control.dataProvider) {
              return d[control.dataProvider.idField];
            } else {
              return d;
            }
          });
        formControl.setValue(value);
      }
    }, 0);
  }

  getErrorMessage(control: IFirestoreFormControl): string | null {
    const formControl = this.firesoteForm?.controls[control.name];
    /* if (control.type == 'check-box') {
      console.clear();
      console.log(formControl);
    } */
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
      if (
        control.type === 'radio' &&
        control.required &&
        <string>formControl.value.trim().length == ''
      ) {
        /* prettier-ignore */
        setTimeout(() => formControl.setErrors({ required: true }), 0);
        /* prettier-ignore */
        return `<small class="text-danger">${ control?.requiredMessage || `<small>${control.label} is Required</small>` }</small>`;
      }
      if (control.type === 'check-box') {
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
      if ((formControl.errors as any).maxlength) {
        /* prettier-ignore */
        return `<small class="text-danger">${ control?.maxMessage || `<small>Required Maximum of ${control.max} characters</small>` }</small>`;
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
