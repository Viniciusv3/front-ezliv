import * as React from 'react';
import "./commonAreaItem.css"
// import { Switch } from '@mui/material';

export default function CommonAreaItem({click, nameArea}) {
    // const [checked, setChecked] = React.useState(true);

    // const handleChange = (event) => {
    //   setChecked(event.target.checked);
    // };
  
    // function aaa(){
    //   console.log(checked)
    // }
  

    return (
        <>
        <div className="item-background">
            {/* <Switch
                onClick={click}
                onChange={handleChange}
                checked={checked}
                size="small"
                color="default"/> */}
                <p>{nameArea}</p> 
        </div>
        </>
    )
}