import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { SafePipe } from '@shared/pipes/safe.pipe';
import { ReplacePipe } from '@shared/pipes/replace.pipe';
import { ApplyMethodPipe } from '@shared/pipes/apply-method.pipe';
import { OrderByPipe } from '@shared/pipes/order-by.pipe';
import { InterpolateResParamsPipe } from '@shared/pipes/interpolate-res-params.pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ClickDoubleDirective } from '@shared/directives/click-double.directive';

import { FooterComponent } from '@shared/components/footer/footer.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { TasksComponent } from '@shared/components/tasks/tasks.component';
import { TaskItemComponent } from '@shared/components/task-item/task-item.component';
import { AddTaskComponent } from '@shared/components/add-task/add-task.component';
import { AboutComponent } from '@shared/components/about/about.component';


const APP_ROUTES: Routes = [
  {path:'', component: TasksComponent },
  {path:'about', component: AboutComponent }
]



const MATERIAL_MODULES = [
  MatMenuModule,
  MatSnackBarModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatSelectModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatDialogModule,
  MatRadioModule,
  MatTabsModule,
  MatProgressBarModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  DragDropModule
];

const MODULES = [
  CommonModule,
  RouterModule.forRoot(APP_ROUTES, { enableTracing: true }),
  FormsModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  ...MATERIAL_MODULES
];

const EXPORTED_MODULES = [...MATERIAL_MODULES, ReactiveFormsModule];

const PIPES = [
  SafePipe,
  ReplacePipe,
  InterpolateResParamsPipe,
  ApplyMethodPipe,
  OrderByPipe
];

const DIRECTIVES = [
  ClickDoubleDirective
];

const COMPONENTS = [
  FooterComponent,
  HeaderComponent,
  ButtonComponent,
  TasksComponent,
  TaskItemComponent,
  AddTaskComponent,
  AboutComponent
];

export const CUSTOM_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  parse: {
    dateInput: ['MM-DD-YYYY']
  },
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: 'MM-DD-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

const PROVIDERS = [{ provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMATS }];

@NgModule({
  declarations: [...PIPES, ...DIRECTIVES, ...COMPONENTS ],
  exports: [...PIPES, ...DIRECTIVES, ...COMPONENTS, ...EXPORTED_MODULES],
  imports: [...MODULES],
  providers: [...PROVIDERS]
})
export class SharedModule { }
