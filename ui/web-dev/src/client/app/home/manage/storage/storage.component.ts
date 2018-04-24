import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {TranslateService} from 'ng2-translate';

/**
 * This class represents the lazy loaded ContainerComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'ar-storage',
  templateUrl: 'storage.component.html',
  styleUrls: ['storage.component.css']
})

export class StorageComponent {

  /**
   * Creates an instance of the ContainerComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(private translate: TranslateService) {

  }


}
