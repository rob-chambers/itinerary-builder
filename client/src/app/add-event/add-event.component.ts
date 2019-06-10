import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlane, faHotel, faBinoculars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  constructor(public activeModal: NgbActiveModal) { }

  @Input() startDate;

  faPlane = faPlane;
  faHotel = faHotel;
  faBinoculars = faBinoculars;
}
