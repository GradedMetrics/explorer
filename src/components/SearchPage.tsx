import Box from '@material-ui/core/Box';
import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import AutoComplete from '../components/AutoComplete';
import Loading from '../components/Loading';
import withSingleContentLoad from '../hocs/withSingleContentLoad';

type SearchPageProps = {
  apiFn: () => Promise<any>
  basePath: string
  content: any[]
  id: string
  helperText?: string
  label: string
  optionFormatter: (entry: any) => string
  optionGroupFormatter?: (entry: any) => string
  placeholder: string
  renderResult: (entry: any) => React.ReactNode
  urlFriendlyName: (entry: any) => string
}

const SearchPage: React.FC<SearchPageProps> = ({
  basePath,
  content = [],
  helperText,
  id,
  label,
  optionFormatter,
  optionGroupFormatter,
  placeholder,
  renderResult,
  urlFriendlyName,
}) => {
  const history = useHistory();
  const {
    pathname,
  } = history.location;
  const [selected, setSelected] = React.useState<any>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isPageLoading, setPageLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (pathname === basePath) {
      setPageLoading(false);
      return;
    }

    const [pathSelected] = pathname.substr(1 + basePath.length, 64).split('/');

    if (selected && urlFriendlyName(selected) === pathSelected) {
      setLoading(false);
      return;
    }

    const urlSelected = content.find(pokemon => urlFriendlyName(pokemon) === pathSelected);

    if (!urlSelected) {
      history.replace({
        pathname: basePath,
      });

      setSelected(undefined);
      setPageLoading(false);
      return;
    }

    handleSelect(urlSelected);
    setPageLoading(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  React.useEffect(() => {
    if (isPageLoading) {
      return;
    }

    setLoading(false);

    const [pathSelected] = pathname.substr(1 + basePath.length, 64).split('/');
    const newPathSelected = urlFriendlyName(selected);
 
    if (pathSelected === newPathSelected) {
      return;
    }

    if (!newPathSelected) {
      history.replace({
        pathname: basePath,
      });
      return;
    }

    history.replace({
      pathname: `${basePath}/${newPathSelected}`,
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleSelect = (content: any) => {
    setLoading(true);
    setSelected(content);
  }

  if (isPageLoading) {
    return <Loading />;
  }

  return (
    <>
      <AutoComplete
        defaultSelectedOption={selected}
        helperText={helperText}
        id={id}
        label={label}
        options={content}
        optionFormatter={optionFormatter}
        optionGroupFormatter={optionGroupFormatter}
        onChange={handleSelect}
        placeholder={placeholder}
        showNextPrev
      />
      {!isLoading && selected ? (
        <Box mt={2}>
          {renderResult(selected)}
        </Box>
      ) : undefined}
    </>
  );
}

export default withSingleContentLoad(
  SearchPage,
  ({
    apiFn
  }: SearchPageProps) => apiFn,
);