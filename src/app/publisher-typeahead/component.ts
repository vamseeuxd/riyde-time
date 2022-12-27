import { PublishersService } from './service';
import { LoaderService } from '../loader.service';
import {
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-publisher-typeahead',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PublisherTypeaheadComponent),
      multi: true,
    },
  ],
})
export class PublisherTypeaheadComponent implements ControlValueAccessor {
  private _customSelected?: string | undefined;
  loader: number | undefined;
  public get customSelected(): string | undefined {
    return this._customSelected;
  }
  public set customSelected(value: string | undefined) {
    if (!this.disabled) {
      this._customSelected = value;
      this.writeValue(value);
    }
  }
  dataProvider: any[] = [
    { id: 1, name: 'Alabama', region: 'South' },
    { id: 2, name: 'Alaska', region: 'West' },
    { id: 3, name: 'Arizona', region: 'West' },
    { id: 4, name: 'Arkansas', region: 'South' },
    { id: 5, name: 'California', region: 'West' },
  ];

  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;
  @Input() placeholder = '';
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  // Function to call when the _value changes.
  onChange = (_value: string | undefined) => {
  };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  constructor(
    public loaderService: LoaderService,
    public publishersService: PublishersService
  ) {
    const loader = this.loaderService.show();
    this.publishersService
      .getAll()
      .valueChanges({ idField: 'id' })
      .subscribe((dataProvider) => {
        this.dataProvider = dataProvider;
        this.loaderService.hide(loader);
      });
  }

  get value(): string | undefined {
    return this._customSelected;
  }

  // Allows Angular to update the model (_value).
  // Update the model and changes needed for the view here.
  writeValue(_value: string | undefined): void {
    this._customSelected = _value;
    this.onChange(this.value);
  }

  // Allows Angular to register a function to call when the model (_value) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (_value: string | undefined) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get isNew(): boolean {
    const _item = this.dataProvider.find((d: { name: string }) => {
      if (this._customSelected) {
        return d.name.toLowerCase() === this._customSelected.toLowerCase();
      } else {
        return true;
      }
    });
    if (!_item) {
      return true;
    } else {
      return false;
    }
  }

  async save() {
    if (this.isNew && this._customSelected) {
      this.loader = this.loaderService.show();
      const data = await this.publishersService.create({
        name: this._customSelected,
      });
      this.loaderService.hide(this.loader);
    }
  }
}
