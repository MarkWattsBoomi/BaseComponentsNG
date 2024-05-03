import { FCMNew } from "fcmlib/lib/FCMNew";
import * as React from 'react';
import { _Input } from "./Input";

export default class ExtendedInput extends FCMNew {

    //FCMCore will trigger this if we should update
    componentDidMount(): void {
        this.forceUpdate();
    }

    render() {
        return(
            <_Input 
                parent={this}
                ref={(element: any) => {this.childComponent = element}} // here we are giving FCMCore a ref to our component
            />
        );
    }
}