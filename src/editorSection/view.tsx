import * as React from "react";

export interface IEditorSectionProps {
    label: string;
}

export class EditorSection extends React.Component<IEditorSectionProps> {
    public render() {
        return (
            <div className={`editor-section editor-${this.props.label}`}>
                {this.props.children}
            </div>
        );
    }
}
