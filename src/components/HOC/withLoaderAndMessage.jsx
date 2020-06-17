import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function withLoaderAndMessage(Wrapper) {
  return function Loader(props) {
    const { loader, dataLength, ...rest } = props;
    return (
      <div>
        {loader && <CircularProgress size={100} /> }
        {
          (dataLength === 0 && !loader)
            ? <p>Oops! NO MORE TRAINEE</p>
            : <Wrapper loader={loader} dataLength={dataLength} {...rest} />
        }
      </div>
    );
  };
}

export default withLoaderAndMessage;
