export interface ILocalCacheSettings<TValue> {
    getValue(): TValue;
    setValue(value: TValue): void;
}
