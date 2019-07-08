import { Request } from '@algolia/transporter-types';

export class Serializer {
  public static serialize({ data }: Request): string {
    return JSON.stringify(data);
  }
}
