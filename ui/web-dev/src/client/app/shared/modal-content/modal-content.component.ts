import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'ar-modal-content',
  templateUrl: 'modal-content.component.html',
  styleUrls: ['modal-content.component.css'],
  input: ['title','body']
})

export class ModalContent {

  constructor(public activeModal: NgbActiveModal) {}
}
