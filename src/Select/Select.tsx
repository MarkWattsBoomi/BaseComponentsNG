import { FCMCore } from 'fcmlib/lib/FCMCore';
import { eContentType } from 'fcmlib/lib/FCMNew';
import { FlowObjectData } from 'fcmlib/lib/FlowObjectData';
import { FlowObjectDataArray } from 'fcmlib/lib/FlowObjectDataArray';
import * as React from 'react';
/** Extended Flow Input component */

export class _Select extends React.Component<any,any> {

    component: FCMCore;
    
    constructor(props: any){
        super(props);
        this.component = this.props.parent;
        this.onSelect = this.onSelect.bind(this);
        this.getItem = this.getItem.bind(this);
        this.state = {value: [], origValue: []}
    }

    componentDidMount(): void {
        let selectedItems: string[] = [];
        this.component.objectData.items.forEach((item: FlowObjectData) => {
            if(item.isSelected){
                selectedItems.push(item.externalId);
            }
        });
        this.setState({value: selectedItems, origValue: selectedItems});
    }

    getItem(id: string) : FlowObjectData {
        let item: FlowObjectData;
        this.component.objectData.items.forEach((objData: FlowObjectData) => {
            if(objData.externalId===id){
                item = objData;
            }
        });
        return item;
    }
    
    onSelect({ target }: React.ChangeEvent<HTMLSelectElement>) {
        //
        let selections: string[] = [];
        Array.prototype.slice.call( target.selectedOptions ).forEach((selectedItem: HTMLOptionElement) => {
            selections.push(selectedItem.value)
        });
        let selectedObjData: FlowObjectDataArray = new FlowObjectDataArray();
        selections.forEach((externalID: string) => {
            selectedObjData.addItem(this.getItem(externalID));
        })
        this.component.setStateValue(selectedObjData);
        if(selections !== this.state.origValue){
            this.setState({origValue: selections});
            if(this.component.outcomes["onSelect"]){
                this.component.triggerOutcome("onSelect");
            }
        }
    };

    render() {      

        let options: any = [];

        this.component.objectData?.items.forEach((item: FlowObjectData)=>{
            options.push(
                <option
                    value = {item.externalId}
                >
                    {item.properties[this.component.columns[0]?.developerName]?.value as string}
                </option>
            );
        });

        const selectProps = {
            'data-testid': 'page-component-input',
            className: 'select',
            id: this.component.id,
            value: this.state.value,
            //size: parseInt(this.component.getAttribute("size","25")),
            placeholder: this.component.hintValue ?? '',
            onChange: this.onSelect,
            readOnly: !this.component.isEditable,
            disabled: !this.component.isEnabled,
            required: this.component.isRequired,
            multiple: this.component.isMultiSelect
        };
        
        let style: React.CSSProperties = {};
        style.padding = "0.3rem";
        if(this.props.display){
            style.display = this.props.display;
        }
        return (
            <select 
                style={style} 
                {...selectProps} 
                defaultValue={this.state.value}
            >
                {options}
            </select>
        );
    }

    
};