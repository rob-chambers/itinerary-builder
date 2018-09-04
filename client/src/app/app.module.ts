import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { AppComponent } from './app.component';
import { BuildComponent } from './build/build.component';
import { AppRoutingModule } from './/app-routing.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightComponent } from './flight/flight.component';
import { AddEventComponent } from './add-event/add-event.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildComponent,
    FlightComponent,
    AddEventComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    NgbModule
  ],
  bootstrap: [AppComponent],
  providers: [
    NgbActiveModal,
  ],
  entryComponents: [AddEventComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
