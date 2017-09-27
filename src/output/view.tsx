import { observer } from "mobx-react";
import * as React from "react";

import { EditorSection } from "../editorSection/view";
import { IInputSettings } from "../input/store";
import { MonacoTextArea } from "../monacoTextArea/view";
import { OutputStore } from "./store";

export const Output = observer(({ store }: { store: OutputStore }) => (
    <EditorSection label="output">
        <MonacoTextArea
            language={store.settings.language}
            requirejs={requirejs}
            value={store.settings.result.value}
        />
    </EditorSection>
));
