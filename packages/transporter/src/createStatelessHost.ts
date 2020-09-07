import { CallEnum, HostOptions, StatelessHost } from '.';

export function createStatelessHost(options: HostOptions): StatelessHost {
  if (typeof options === 'string') {
    return {
      protocol: 'https',
      url: options,
      accept: CallEnum.Any,
    };
  }

  return {
    protocol: options.protocol || 'https',
    url: options.url,
    accept: options.accept || CallEnum.Any,
  };
}
