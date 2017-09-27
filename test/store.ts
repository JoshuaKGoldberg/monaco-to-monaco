import { expect } from "chai";
import { stub } from "sinon";

import { IInputSettings } from "../lib/input/store";
import { MonacoToMonacoStore } from "../lib/store";

describe("MonacoToMonacoStore", () => {
    it("passes transformed input values to the output", () => {
        // Arrange
        const rootStore = new MonacoToMonacoStore({
            input: {
                language: "javascript",
                value: "",
            },
            localCache: {
                getValue: stub(),
                setValue: stub(),
            },
            output: {
                language: "javascript",
                result: {
                    value: "",
                },
            },
            transformer: (input: IInputSettings) => ({
                value: `Transformed: ${input.value}`,
            }),
        });

        // Act
        rootStore.input.receiveNewSettings({
            value: "update",
        });

        // Assert
        expect(rootStore.output.settings.result.value).to.be.equal("Transformed: update");
    });
});
