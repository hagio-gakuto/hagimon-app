import { ApplicationError } from './application-error';

export class NotFoundError extends ApplicationError {
  constructor(resource: string, identifier?: string | number) {
    const message = identifier
      ? `${resource}（識別子: "${identifier}"）が見つかりません`
      : `${resource}が見つかりません`;
    super(message, 404, 'NOT_FOUND');
  }
}
