import { ResponseStatus } from '../response/ResponseStatus';

export class ErrorInfo<T> {
  constructor(
    private readonly _errorCode: ResponseStatus,
    private readonly _message: string,
    private readonly _isOperational: boolean = true,
    private readonly _data?: T,
  ) {}

  get errorCode() {
    return this._errorCode;
  }

  get message() {
    return this._message;
  }

  get isOperational() {
    return this._isOperational;
  }

  get data() {
    return this._data;
  }
}
