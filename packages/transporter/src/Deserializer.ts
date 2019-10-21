import { Response } from '@algolia/requester-types';
import { ApiError } from '@algolia/transporter';

export class Deserializer {
  public static success<TObject>({ content }: Response): TObject {
    return JSON.parse(content);
  }

  public static fail({ content, status }: Response): ApiError {
    // eslint-disable-next-line functional/no-let, functional/no-try-statement
    let message = content;

    // eslint-disable-next-line functional/no-try-statement
    try {
      message = JSON.parse(content).message;
    } catch (e) {
      // ..
    }

    return new ApiError(message, status);
  }
}
