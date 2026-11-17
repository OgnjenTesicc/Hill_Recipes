import { TestBed } from '@angular/core/testing';
import { Allergen } from './allergen';

describe('Allergen', () => {
  let service: Allergen;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Allergen);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
