import ora from 'ora-classic';

import { CI } from './common';

type OraLogOptions = { text?: string; indent?: number };
class OraLog {
  private _text: string;
  private _indent = 0;

  constructor(options: OraLogOptions | string) {
    if (typeof options === 'string') {
      this._text = options;
    } else {
      this._text = options.text ?? '';
      this._indent = options.indent ?? 0;
    }
  }

  private maybeText(text?: string): void {
    if (text !== undefined) {
      this._text = text;
      this.start();
    }
  }

  start(): this {
    // eslint-disable-next-line no-console
    console.log(' '.repeat(this._indent) + this._text);
    return this;
  }

  succeed(text?: string): void {
    this.maybeText(text);
  }

  fail(text?: string): void {
    this.maybeText(text);
  }

  warn(text?: string): void {
    this.maybeText(text);
  }

  info(text?: string): void {
    this.maybeText(text);
  }

  get text(): string {
    return this._text;
  }

  set text(text: string) {
    this._text = text;
    this.start();
  }

  get indent(): number {
    return this._indent;
  }

  set indent(indent: number) {
    this._indent = indent;
  }
}

/**
 * Returns a spinner that will log directly in verbose mode, to avoid conflict with other log.
 */
export function createSpinner(
  options: OraLogOptions | string,
  verbose: boolean
): ora.Ora | OraLog {
  if (verbose || CI) {
    return new OraLog(options);
  }
  return ora(options);
}
