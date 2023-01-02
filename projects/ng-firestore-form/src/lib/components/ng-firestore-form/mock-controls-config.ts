import {
  IColumn,
  IOffset,
  IFirestoreFormControl,
} from './ng-firestore-form.component';
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

export const MOCK_EMAIL: IFirestoreFormControl = {
  id: 'exampleFormControlInput1',
  placeholder: 'name@example.com',
  label: 'User Email',
  type: 'email',
  help: '<small class="text-muted"><small>This is a Help Text</small></small>',
  emailMessage: '<small>Not a Valid Email Address</small>',
  defaultValue: 'vamsi.flex@gmail.com',
  name: 'email',
  required: true,
  disabled: false,
  hide: false,
  min: 3,
  max: 30,
  offset: DEFAULT_OFFSET,
  column: DEFAULT_COLUMN,
};

export const MOCK_TEXT: IFirestoreFormControl = {
  id: 'userName',
  placeholder: 'User Name',
  label: 'User Name',
  type: 'text',
  defaultValue: 'Vamsee Kalyan',
  name: 'userName',
  pattern: '',
  required: true,
  disabled: false,
  hide: false,
  min: 3,
  max: 5,
  offset: DEFAULT_OFFSET,
  column: DEFAULT_COLUMN,
};

export const MOCK_NUMBER: IFirestoreFormControl = {
  id: 'userAge',
  placeholder: 'User Age',
  label: 'User Age',
  type: 'number',
  defaultValue: 20,
  name: 'userAge',
  required: true,
  disabled: false,
  hide: false,
  help: '<small class="text-muted"><small>Age should in between 18 to 30</small></small>',
  min: 18,
  max: 30,
  offset: DEFAULT_OFFSET,
  column: DEFAULT_COLUMN,
};

export const MOCK_DATE: IFirestoreFormControl = {
  id: 'userDateOfBirth',
  placeholder: 'User Date Of Birth',
  label: 'User Date Of Birth',
  type: 'date',
  defaultValue: 20,
  name: 'userDateOfBirth',
  required: true,
  maxMessage: '<small>Date should before 20<sup>th</sup>-Dec-2022</small>',
  minMessage: '<small>Date should after 15<sup>th</sup>-Dec-2022</small>',
  help: '<small class="text-muted"><small>Date should in between 15<sup>th</sup>-Dec-2022 to 20<sup>th</sup>-Dec-2022</small></small>',
  disabled: false,
  hide: false,
  min: '2022-12-15',
  max: '2022-12-20',
  offset: DEFAULT_OFFSET,
  column: DEFAULT_COLUMN,
};

export const MOCK_TEXT_AREA: IFirestoreFormControl = {
  id: 'userRemarks',
  placeholder: 'User Remarks',
  label: 'User Remarks',
  type: 'textarea',
  defaultValue: 'Vamsee Kalyan',
  name: 'userRemarks',
  required: true,
  disabled: false,
  hide: false,
  resize: 'both',
  pattern: '[A-Za-z]{3}',
  patternMessage: '<small>Pattern not matched</small>',
  requiredMessage: '<small>This is required</small>',
  minMessage: '<small>At-Lease 3 Charectors required</small>',
  min: 3,
  rows: 1,
  cols: 1,
  max: 5,
  offset: DEFAULT_OFFSET,
  column: DEFAULT_COLUMN,
};

export const MOCK_SELECT: IFirestoreFormControl = {
  id: 'city',
  placeholder: 'Select City',
  label: 'Select City',
  type: 'select',
  defaultValue: '1',
  name: 'city',
  required: true,
  disabled: false,
  hide: false,
  offset: DEFAULT_OFFSET,
  column: DEFAULT_COLUMN,
  dataProvider: {
    data: [
      { id: '1', label: 'Chennai' },
      { id: '2', label: 'Hyderabad' },
      { id: '3', label: 'Vijayawada' },
      { id: '4', label: 'Vizag' },
    ],
    labelField: 'label',
    idField: 'id',
  },
};

export const MOCK_MULTI_SELECT: IFirestoreFormControl = {
  id: 'city',
  placeholder: 'Select Hobbies',
  label: 'Select Hobbies',
  type: 'multi-select',
  defaultValue: ['1', '3'],
  name: 'hobbies',
  required: true,
  disabled: false,
  hide: false,
  offset: DEFAULT_OFFSET,
  column: DEFAULT_COLUMN,
  dataProvider: {
    data: [
      { id: '1', label: 'Hobbies 1' },
      { id: '2', label: 'Hobbies 2' },
      { id: '3', label: 'Hobbies 3' },
      { id: '4', label: 'Hobbies 4' },
    ],
    labelField: 'label',
    idField: 'id',
  },
};
