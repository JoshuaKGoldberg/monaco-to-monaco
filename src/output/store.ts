import { action, computed, extendObservable, observable } from "mobx";

export interface ITransformResult {
    error?: string;
    value: string;
}

export interface IOutputSettings {
    language: string;
    result: ITransformResult;
}

export class OutputStore {
    @observable
    private readonly receivedSettings: IOutputSettings;

    @computed
    public get settings(): IOutputSettings {
        return this.receivedSettings;
    }

    public constructor(settings: IOutputSettings) {
        this.receivedSettings = settings;
    }

    @action
    public changeSettings(settings: Partial<IOutputSettings>): void {
        extendObservable(this.receivedSettings, settings as object);
    }
}
