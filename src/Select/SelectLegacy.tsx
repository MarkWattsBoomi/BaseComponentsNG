import { FCMLegacy } from "fcmlib/lib/FCMLegacy";
import * as React from 'react';
import { _Select } from "./Select";
declare const manywho: any;

class ExtendedSelect extends FCMLegacy {

    //FCMCore will trigger this if we should update
    componentDidMount() {
        if(this.childComponent && this.childComponent.componentDidMount){
            this.childComponent.componentDidMount();
        }
    }

    componentUpdated(changeDetected: boolean){
        if(this.childComponent && this.childComponent.componentUpdated){
            this.childComponent.componentUpdated();
        }
    }

    render() {

        let className: string = "mw-input form-group";
        if(Object.keys(this.outcomes).length>0){
            className += " has-outcomes"
        }
        className += " " + this.getAttribute("classes","");
        let style: React.CSSProperties = {};
        if(this.isVisible === false) {
            style.display="none";
        }
        let required: any;
        if(this.isRequired){
            required = (
                <span className="input-required"> *</span>
            );
        }
        return(
            <div
                className={className}
                style={style}
            >
                <div>
                    <label htmlFor="this.id">{this.label}{required}</label>
                    <_Select 
                        key={this.id}
                        parent={this}
                        ref={(element: any) => {this.childComponent = element}}
                        display="block" // here we are giving FCMCore a ref to our component
                    />
                    <span className="help-block">{this.helpInfo}</span>
                </div>
            </div>
        );
    }
}
manywho.component.register('ExtendedSelect', ExtendedSelect);