import { observer } from "mobx-react";
import * as React from "react";

import { EditorSection } from "../editorSection/view";
import { MonacoTextArea } from "../monacoTextArea/view";
import { IInputSettings, InputStore } from "./store";

export const Input = observer(({ store }: { store: InputStore }) => (
    <EditorSection label="input">
        <MonacoTextArea
            language={store.language}
            onChange={(value) => store.receiveNewSettings({ value })}
            requirejs={requirejs}
        />
    </EditorSection>
));
