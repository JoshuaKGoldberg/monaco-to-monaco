import { action, computed, extendObservable, observable } from "mobx";

export interface IInputSettings {
    language: string;
    value: string;
}

export interface IInputStoreEvents<TInputSettings extends IInputSettings = IInputSettings> {
    onChange(settings: IInputSettings): void;
}

export interface IInputStoreSettings<TInputSettings extends IInputSettings = IInputSettings> {
    events: IInputStoreEvents<TInputSettings>;
    input: TInputSettings;
}

export class InputStore<TInputSettings extends IInputSettings = IInputSettings> {
    @observable
    private readonly settings: IInputStoreSettings<TInputSettings>;

    public constructor(settings: IInputStoreSettings<TInputSettings>) {
        this.settings = settings;
    }

    @computed
    public get language(): string {
        return this.settings.input.language;
    }

    @action
    public receiveNewSettings(input: Partial<TInputSettings>) {
        extendObservable(this.settings.input, input as object);

        this.settings.events.onChange(this.settings.input);
    }
}
