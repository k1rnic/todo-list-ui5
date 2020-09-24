import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import '@ui5/webcomponents/dist/Button';
import '@ui5/webcomponents-fiori/dist/ShellBar';
import '@ui5/webcomponents-fiori/dist/FlexibleColumnLayout';
import '@ui5/webcomponents/dist/Title';
import '@ui5/webcomponents/dist/Input';
import '@ui5/webcomponents/dist/DatePicker';
import '@ui5/webcomponents/dist/List';
import '@ui5/webcomponents/dist/CustomListItem';
import '@ui5/webcomponents/dist/Panel';
import '@ui5/webcomponents/dist/Dialog';
import '@ui5/webcomponents/dist/Label';
import '@ui5/webcomponents/dist/TextArea';

import { AppComponent } from './app.component';
import { ListComponent } from './todo/list/list.component';
import { TaskComponent } from './todo/task/task.component';
import { InputComponent } from './todo/input/input.component';
import { EditorComponent } from './todo/editor/editor.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    InputComponent,
    EditorComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
