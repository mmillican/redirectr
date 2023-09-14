export type ShortUrl = {
  shortUrl: string;
  url: string;
}

export type CreateShortUrlRequest = {
  destinationUrl: string;
  shortUrl?: string;
}
