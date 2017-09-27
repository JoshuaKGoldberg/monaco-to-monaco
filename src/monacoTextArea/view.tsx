// tslint:disable-next-line:no-reference
/// <reference path="../../node_modules/monaco-editor/monaco.d.ts" />

import * as React from "react";

const containerRefKey = "container";

const renderLoading = (): JSX.Element => (
    <div
        className="react-monaco-editor-container loading"
        ref={containerRefKey}
        style={{width: "100%", height: "100%" }}>
        <span>editor</span>
    </div>
);

const renderLoaded = (): JSX.Element => (
    <div
        className= "react-monaco-editor-container"
        ref={containerRefKey}
        style={{width: "100%", height: "100%" }}>
    </div>
);

export interface IMonacoTextAreaProps {
    defaultValue?: string;
    height?: number | string;
    language?: string;
    options?: monaco.editor.IEditorOptions;
    requirejs?: typeof requirejs;
    theme?: string;
    value?: string;
    width?: number | string;
    editorDidMount?(): void;
    editorWillMount?(): void;
    onChange?(newValue: string): void;
}

export interface IMonacoTextAreaState {
    currentValue?: string;
    loading?: boolean;
}

const noop = () => {/* no-op */};

export class MonacoTextArea extends React.Component<IMonacoTextAreaProps, IMonacoTextAreaState> {
    public static defaultProps: Partial<IMonacoTextAreaProps> = {
        defaultValue: "",
        editorDidMount: noop,
        editorWillMount: noop,
        height: "100%",
        language: "javascript",
        onChange: noop,
        options: {},
        theme: "vs",
        value: undefined,
        width: "100%",
    };

    public readonly state = {
        currentValue: this.props.value,
        loading: true,
    };

    private editor: monaco.editor.IStandaloneCodeEditor;

    private editorIsUpdatingValue: boolean;

    public componentDidMount() {
        this.startLoadingMonaco();
        window.addEventListener("resize", this.updateDimensions);
    }

    public componentWillUnmount() {
        this.destroyMonaco();
        window.removeEventListener("resize", this.updateDimensions);
    }

    public componentWillUpdate(nextProps: IMonacoTextAreaProps): void {
        if (nextProps.language !== this.props.language) {
            this.destroyMonaco();
            this.initializeMonaco(nextProps);

            return;
        }

        if (nextProps.value === this.state.currentValue) {
            return;
        }

        // Todo: should this only do it if the editor value isn't already that?
        this.editorIsUpdatingValue = true;
        this.editor.setValue(nextProps.value);
        this.editorIsUpdatingValue = false;
    }

    public render(): JSX.Element {
        return this.state.loading
            ? renderLoading()
            : renderLoaded();
    }

    private destroyMonaco() {
        if (typeof this.editor === "undefined") {
            return;
        }

        this.editor.dispose();
        (this.refs[containerRefKey] as HTMLElement).innerHTML = "";
    }

    private editorDidMount(editor: monaco.editor.IStandaloneCodeEditor, monaco) {
        this.setState({
            loading: false,
        });
        this.props.editorDidMount();

        editor.onDidChangeModelContent((): void => {
            const value = editor.getValue();

            if (!this.editorIsUpdatingValue) {
                this.props.onChange(value);
            }

            this.setState({
                currentValue: value,
            });
        });
    }

    private initializeMonaco(props: IMonacoTextAreaProps = this.props) {
        const value = props.value || props.defaultValue;
        const { language, theme, options } = props;

        this.props.editorWillMount();

        this.editor = monaco.editor.create(
            this.refs[containerRefKey] as HTMLElement,
            { language, theme, value, ...options });

        this.editorDidMount(this.editor, monaco);
    }

    private startLoadingMonaco() {
        (this.props.requirejs || requirejs)(["vs/editor/editor.main"], () => {
            this.initializeMonaco();
        });
    }

    private updateDimensions = (): void => {
        this.editor.layout();
    }
}
