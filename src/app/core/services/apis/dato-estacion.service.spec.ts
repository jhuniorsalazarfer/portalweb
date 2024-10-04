import { TestBed } from '@angular/core/testing';

import { DatoEstacionService } from './dato-estacion.service';

describe('DatoEstacionService', () => {
  let service: DatoEstacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatoEstacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
