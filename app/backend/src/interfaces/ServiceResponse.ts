export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'badRequest' | 'unauthorized' | 'notFound' | 'conflict' | 'internalError';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'OK',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;