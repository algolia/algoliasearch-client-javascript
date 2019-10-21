import { Transporter } from '@algolia/transporter';

export class SearchIndex {
  public readonly transporter: Transporter;

  public readonly indexName: string;

  public constructor(options: { readonly transporter: Transporter; readonly indexName: string }) {
    this.transporter = options.transporter;
    this.indexName = options.indexName;
  }
}
