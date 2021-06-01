import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const ProgressBar:React.FC<any>=(props)=>{

  return (
    <div style={{display:props.display}}>
      <LinearProgress  />
    </div>
  );
}

export default ProgressBar;