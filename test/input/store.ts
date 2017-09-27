import { expect } from "chai";
import { stub } from "sinon";

import { InputStore } from "../../lib/input/store";

describe("InputStore", () => {
    it("passes new lines on change", () => {
        // Arrange
        const lines = ["original"];
        const newLines = ["modified"];
        const onChange = stub();
        const store = new InputStore({
            events: { onChange },
            input: {
                language: "javascript",
                value: lines.join("\n"),
             },
        });

        // Act
        store.receiveNewSettings({
            value: newLines.join("\n"),
        });

        // Assert
        expect(onChange).to.have.been.calledWithMatch({
            language: "javascript",
            value: newLines.join("\n"),
        });
    });
});
