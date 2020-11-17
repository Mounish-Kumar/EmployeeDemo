import { TestBed } from '@angular/core/testing';
import DateFormat from './date-format.enum';

import { UtilitiesService } from './utilities.service';

describe('UtilitiesService', () => {
  let service: UtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('dateToString', () => {
    const date = new Date(2020, 11, 26, 10, 20, 30);

    it('date to dd/mm/yyyy format', () => {
      const result = service.dateToString(date);
      expect(result).toBe('26/12/2020');
    });
  
    it('date to hh:mm:ss format', () => {
      const result = service.dateToString(date, DateFormat.TIME);
      expect(result).toBe('10:20:30');
    });
  
    it('date to dd/mm/yyyy hh:mm:ss format', () => {
      const result = service.dateToString(date, DateFormat.DATE_TIME);
      expect(result).toBe('26/12/2020 10:20:30');
    });
  });

  describe('stringToDate', () => {
    const date = new Date(2020, 11, 26, 10, 20, 30);

    it('dd/mm/yyyy format to date', () => {
      const result = service.stringToDate('26/12/2020');
      expect(result.getDate()).toBe(date.getDate());
      expect(result.getMonth()).toBe(date.getMonth());
      expect(result.getFullYear()).toBe(date.getFullYear());
    });
  
    it('hh:mm:ss format to date', () => {
      const result = service.stringToDate('10:20:30', DateFormat.TIME);
      expect(result.getHours()).toBe(date.getHours());
      expect(result.getMinutes()).toBe(date.getMinutes());
      expect(result.getSeconds()).toBe(date.getSeconds());
    });
  
    it('dd/mm/yyyy hh:mm:ss format to date', () => {
      const result = service.stringToDate('26/12/2020 10:20:30', DateFormat.DATE_TIME);
      expect(result.getDate()).toBe(date.getDate());
      expect(result.getMonth()).toBe(date.getMonth());
      expect(result.getFullYear()).toBe(date.getFullYear());
      expect(result.getHours()).toBe(date.getHours());
      expect(result.getMinutes()).toBe(date.getMinutes());
      expect(result.getSeconds()).toBe(date.getSeconds());
    });
  });

  describe('prependZeros', () => {
    it('Add zeros and make length 8', () => {
      const result = service.prependZeros('6969', 8);
      expect(result).toBe('00006969');
    })
  });

  describe('isNumeric', () => {
    it('Numeric value', () => {
      const result = service.isNumeric('69');
      expect(result).toBeTrue();
    });

    it('Non numeric value', () => {
      const result = service.isNumeric('abc');
      expect(result).toBeFalse();
    });
  });

  describe('stringToNumber', () => {
    it('Numeric value', () => {
      const result = service.stringToNumber('69');
      expect(result).toBe(69);
    });

    it('Non numeric value', () => {
      const result = service.stringToNumber('abc');
      expect(result).toBe(0);
    });
  });

  describe('isPositiveNumber', () => {
    it('Positive input', () => {
      const result = service.isPositiveNumber('8');
      expect(result).toBeTrue();
    });
  
    it('Negative input', () => {
      const result = service.isPositiveNumber('-3');
      expect(result).toBeFalse();
    });
  });

  describe('toFixedNumber', () => {
    it('Positive input', () => {
      const result = service.toFixedNumber('3.1415926');
      expect(result).toBe(3.14);
    });
  });
});
