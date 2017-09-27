import { action, computed } from "mobx";

import { IInputSettings, InputStore } from "./input/store";
import { ILocalCacheSettings } from "./localCache";
import { IOutputSettings, ITransformResult, OutputStore } from "./output/store";

export interface IMonacoToMonacoStoreSettings {
    input: IInputSettings;
    localCache: ILocalCacheSettings<IInputSettings>;
    output: IOutputSettings;
    transformer(input: IInputSettings): ITransformResult;
}

export class MonacoToMonacoStore<TInputSettings extends IInputSettings = IInputSettings> {
    public readonly input: InputStore;

    public readonly output: OutputStore;

    private readonly settings: IMonacoToMonacoStoreSettings;

    public constructor(settings: IMonacoToMonacoStoreSettings) {
        this.input = new InputStore({
            events: {
                onChange: this.onInputChange,
            },
            input: settings.input,
        });
        this.output = new OutputStore(settings.output);
        this.settings = settings;
    }

    private readonly onInputChange = (input: TInputSettings): void => {
        const result = this.settings.transformer(input);

        this.settings.localCache.setValue(input);
        this.output.changeSettings({ result });
    }
}
