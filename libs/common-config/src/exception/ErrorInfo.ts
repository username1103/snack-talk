import { Exclude, Expose } from 'class-transformer';
import { ResponseStatus } from '../response/ResponseStatus';

export class ErrorInfo<T> {
  @Exclude()
  private readonly _errorCode: ResponseStatus;

  @Exclude()
  private readonly _message: string;

  @Exclude()
  private readonly _isOperational: boolean;

  @Exclude()
  private readonly _data?: T;

  constructor(errorCode: ResponseStatus, message: string, data?: T, isOperational = true) {
    this._errorCode = errorCode;
    this._message = message;
    this._isOperational = isOperational;
    this._data = data;
  }

  @Expose()
  get errorCode() {
    return this._errorCode;
  }

  @Expose()
  get message() {
    return this._message;
  }

  @Expose()
  get isOperational() {
    return this._isOperational;
  }

  @Expose()
  get data() {
    return this._data;
  }
}
