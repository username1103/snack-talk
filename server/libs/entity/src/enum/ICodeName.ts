export interface ICodeName<T> {
  get code(): string;
  get name(): string;
  equals(v: T): boolean;
}
