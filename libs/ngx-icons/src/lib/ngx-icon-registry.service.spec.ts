import { TestBed } from '@angular/core/testing';
import { NgxIconRegistryService } from './ngx-icon-registry.service';
import { NgxIconOptions } from './ngx-icon.interface';

const solidTestIcon: {
  name: 'solidTestIcon';
  data: string;
} = {
  name: 'solidTestIcon',
  data: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>`,
};

describe('NgxIconRegistryService', () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
  let service: NgxIconRegistryService;
  const config: NgxIconOptions = {
    icons: [solidTestIcon],
    missingIcon: solidTestIcon,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxIconRegistryService);
    (service as any).config = config;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('configure', () => {
    it('should register contents of the config', () => {
      const registerSpy = jest.spyOn(service, 'register');
      (service as any).configure();
      expect(registerSpy).toHaveBeenNthCalledWith(1, config.icons);
      expect(registerSpy).toHaveBeenNthCalledWith(2, [config.missingIcon]);
    });

    it('should do nothing when contents of the config object are undefined', () => {
      const registerSpy = jest.spyOn(service, 'register');
      (service as any).config = undefined;
      (service as any).configure();
      expect(registerSpy).not.toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('should return undefined when icon not found', () => {
      const icon = service.get('iconThatNotExist');
      expect(icon).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(
        `Icon iconThatNotExist does not exist`
      );
    });
  });
});
