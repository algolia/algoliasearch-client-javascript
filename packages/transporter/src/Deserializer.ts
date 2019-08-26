import { Response } from '@algolia/requester-types';
import { ApiError } from '@algolia/transporter-types';

export class Deserializer {
  public static success({ content }: Response): object {
    return JSON.parse(content);
  }

  public static fail({ content, status }: Response): ApiError {
    // eslint-disable-next-line functional/no-try-statement
    try {
      return JSON.parse(content);
    } catch (e) {
      return {
        name: ApiError.name,
        message: content,
        status,
      };
    }
  }
}
