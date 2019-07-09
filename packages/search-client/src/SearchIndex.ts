import { Transporter } from '@algolia/transporter-types';

export class SearchIndex {
  public readonly transporter: Transporter;
  public readonly indexName: string;

  public constructor(options: { transporter: Transporter; indexName: string }) {
    this.transporter = options.transporter;
    this.indexName = options.indexName;
  }
}
