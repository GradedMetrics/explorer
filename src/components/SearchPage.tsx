import Box from '@material-ui/core/Box';
import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import AutoComplete from '../components/AutoComplete';
import Loading from '../components/Loading';
import withSingleContentLoad from '../hocs/withSingleContentLoad';

type SearchPageProps = {
  apiFn: () => Promise<any>,
  content: any[],
  id: string,
  helperText?: string,
  label: string,
  optionFormatter: (entry: any) => string,
  optionGroupFormatter?: (entry: any) => string,
  placeholder: string,
  renderResult: (entry: any) => React.ReactNode,
  urlFriendlyName: (entry: any) => string,
}

const SearchPage: React.FC<SearchPageProps> = ({
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
    hash,
  } = history.location;
  const [selected, setSelected] = React.useState<any>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isPageLoading, setPageLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!hash) {
      setPageLoading(false);
      return;
    }

    if (selected && urlFriendlyName(selected) === hash.split('|')[0].substr(1, 64)) {
      setLoading(false);
      return;
    }

    const urlSelected = content.find(pokemon => urlFriendlyName(pokemon) === hash.split('|')[0].substr(1, 64));

    if (!urlSelected) {
      history.replace({
        hash: '',
      });

      setSelected(undefined);
      setPageLoading(false);
      return;
    }

    handleSelect(urlSelected);
    setPageLoading(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  React.useEffect(() => {
    if (isPageLoading) {
      return;
    }

    setLoading(false);

    const newHash = urlFriendlyName(selected);
 
    if (hash.split('|')[0].substr(1, 64) === newHash) {
      return;
    }

    history.replace({
      hash: newHash,
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