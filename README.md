# redirectr

A serverless URL shortener / redirect system built on AWS, inspired by [this AWS blog post][inspire_post].

## Background

This solution leverages S3's ability to specify metadata on objects to redirect objects to a different URL. The "admin"
endpoint is a simple Lambda function with API gateway that will create the object in S3 and set the appropriate metadata
values. CloudFront sits in front of the bucket to provide custom domain support (among other things).

## Development

_Coming soon_

## TODO / Future

- Secure the admin API endpoints
- Put CloudFront in front of the API gateway on a separate path
- Create a CLI tool to create / list / delete URLs
- Create a SPA frontend for managing URLs
- Tech Debt:
  - Don't have the function code be inline in the CFN template
  - Streamlined deployment process

[inspire_post]: https://aws.amazon.com/blogs/compute/build-a-serverless-private-url-shortener/
