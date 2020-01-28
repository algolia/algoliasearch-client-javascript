import { CallEnum, HostOptions, StatelessHost } from '.';

export function createStatelessHost(options: HostOptions): StatelessHost {
  return {
    protocol: options.protocol || 'https',
    url: options.url,
    accept: options.accept || CallEnum.Any,
  };
}
