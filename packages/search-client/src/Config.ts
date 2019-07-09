import { Host } from '@algolia/transporter-types';

export class Config {
  public readonly hosts!: Host[];

  public constructor(config: ConfigOptions) {
    this.hosts = config.hosts;
  }
}

type ConfigOptions = {
  hosts: Host[];
};
