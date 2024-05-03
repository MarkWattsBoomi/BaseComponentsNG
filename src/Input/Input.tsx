import { FCMCore } from 'fcmlib/lib/FCMCore';
import { eContentType } from 'fcmlib/lib/FCMNew';
import * as React from 'react';
/** Extended Flow Input component */

export class _Input extends React.Component<any,any> {

    component: FCMCore;
    
    constructor(props: any){
        super(props);
        this.component = this.props.parent;
        this.onInput = this.onInput.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.getValue = this.getValue.bind(this);
        this.getFlowValue = this.getFlowValue.bind(this);
        this.state = {value: "", origValue: ""}
    }

    componentDidMount(): void {
        let val: any = this.getValue(this.component.contentValue);
        this.setState({value: val, origValue: val});
    }

    onInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        this.component.setStateValue(this.getFlowValue(value));
        this.setState({value: this.getValue(value)});
    };

    onBlur({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
        this.component.setStateValue(this.getFlowValue(value));
        let newVal: any = this.getValue(value);
        if(newVal !== this.state.origValue){
            this.setState({origValue: this.getValue(value)});
            if(this.component.outcomes["onBlur"]){
                this.component.triggerOutcome("onBlur");
            }
        }
    };

    getValue(value: string) : any {
        switch(this.component.contentType){
            case eContentType.ContentNumber:
                return parseFloat(value || "");
            case eContentType.ContentDateTime:
                let dt: Date = new Date(value);
                if(!isNaN(dt.getTime())){
                    return dt.toISOString().substring(0,16);
                }
                else {
                    return "";
                }
            default:
                return value;
        }
    }

    getFlowValue(value: string) : any {
        switch(this.component.contentType){
            case eContentType.ContentDateTime:
                let dt: Date = new Date(value);
                if(!isNaN(dt.getTime())){
                    return dt;
                }
                else {
                    return null;
                }
            default:
                return value;
        }
    }

    render() {

        let inputType: string = "text";
        let step: string;
        let min: string;
        let max: string;
        switch(this.component.contentType){
            case eContentType.ContentPassword:
                inputType="password";
                break;
            case eContentType.ContentNumber:
                inputType="number";
                step = this.component.getAttribute("step");
                min = this.component.getAttribute("min");
                max = this.component.getAttribute("max");
                break;
            case eContentType.ContentDateTime:
                inputType="datetime-local";
                break;
        }

        

        const inputProps = {
            'data-testid': 'page-component-input',
            className: 'input',
            id: this.component.id,
            value: this.state.value,
            step: step,
            min: min,
            max: max,
            size: parseInt(this.component.getAttribute("size","25")),
            placeholder: this.component.hintValue ?? '',
            onInput: this.onInput,
            onBlur: this.onBlur,
            type: inputType,
            readOnly: !this.component.isEditable,
            disabled: !this.component.isEnabled,
            required: this.component.isRequired,
            autoComplete:
                // Prevent browser from auto-filling the wrong password. Chrome in particular guesses the autofill
                // value and generally gets it wrong because there is no username field associated with this
                // value. Also we do not store passwords in plain-text so this value should never be pre-populated.
                this.component?.contentType === eContentType.ContentPassword ? 'new-password' : '',
        };
        //if (inputType === 'text' && hasMask) {
        //    return <InputMask {...inputProps} mask={mask} />;
        //}
        
        let style: React.CSSProperties = {};
        if(this.props.display){
            style.display = this.props.display;
        }
        return (<input style={style} {...inputProps} />);
    }

    
};