import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './style';

const withLoaderAndMessage = (Wrapper) => (props) => {
  const { loader, dataLength, ...rest } = props;
  return (
    <div>
      {/* {loader && <CircularProgress size={50} style={useStyles.circularProgress} /> } */}
      {
       !loader ? <Wrapper loader={loader} dataLength={dataLength} {...rest} />
       :<CircularProgress size={50} style={useStyles.circularProgress} />
        //  <p style={useStyles.pStyle}>Oops! NO MORE TRAINEE</p>
      }
    </div>
  );
};

export default (withLoaderAndMessage);
