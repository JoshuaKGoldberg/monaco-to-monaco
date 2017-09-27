import { observer } from "mobx-react";
import * as React from "react";

import { IInputSettings } from "./input/store";
import { Input } from "./input/view";
import { Output } from "./output/view";
import { MonacoToMonacoStore } from "./store";

export const MonacoToMonaco = observer(({ store }: { store: MonacoToMonacoStore }) => (
    <div className="monaco-to-monaco">
        <Input store={store.input} />
        <Output store={store.output} />
    </div>
));
