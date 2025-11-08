import { IMAGE_URL_ERROR_MESSAGES } from '../constants/image-url.constants';

export class ImageUrl {
  private constructor(private readonly value: string) {}

  static create(url: string | null): ImageUrl | null {
    if (url === null) {
      return null;
    }

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      throw new Error(IMAGE_URL_ERROR_MESSAGES.INVALID_URL_FORMAT);
    }

    if (parsed.protocol !== 'https:') {
      throw new Error(IMAGE_URL_ERROR_MESSAGES.MUST_USE_HTTPS);
    }

    return new ImageUrl(url);
  }

  toString(): string {
    return this.value;
  }
}

