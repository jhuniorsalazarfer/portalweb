import { TestBed } from '@angular/core/testing';

import { DatosestacionService } from './datosestacion.service';

describe('DatosestacionService', () => {
  let service: DatosestacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosestacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
