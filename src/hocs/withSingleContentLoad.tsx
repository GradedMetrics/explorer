import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const withSingleContentLoad = (WrappedComponent: React.FC<any>, apiFn: (props: any) => (() => any)) => {
  return ({ ...props }) => {
    const [content, setContent] = React.useState<any>();
    const [isLoading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
      (async () => {
        setContent(await apiFn(props)());
        setLoading(false);
      })();
    }, []);

    if (isLoading) {
      return <CircularProgress />;
    }

    return <WrappedComponent content={content} {...props} />;
  }
}

export default withSingleContentLoad;