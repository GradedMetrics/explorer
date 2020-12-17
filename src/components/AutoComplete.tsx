/**
 * This extends Material UI's Autocomplete component available at
 * https://material-ui.com/components/autocomplete.
 */

import React from 'react';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import MUIAutocomplete from '@material-ui/lab/Autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Loading from './Loading';

type AutoCompleteProps = {
  defaultSelectedOption?: any
  id: string
  helperText?:  string
  label: string
  optionFormatter: (option: any) => string
  optionGroupFormatter?: (option: any) => string
  options: any[]
  onChange: (selectedOption: any) => void
  placeholder?: string
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  defaultSelectedOption,
  id,
  helperText,
  label,
  options,
  optionFormatter,
  optionGroupFormatter,
  onChange,
  placeholder,
}) => {
  let defaultInputValue;

  if (defaultSelectedOption) {
    defaultInputValue = optionFormatter(defaultSelectedOption);
  }

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>(defaultInputValue || '');
  const [value, setValue] = React.useState<string>(defaultSelectedOption);

  React.useEffect(() => {
    if (defaultSelectedOption === value) {
      return;
    }

    if (!isLoading) {
      setLoading(true);
      return;
    }

    setInputValue(optionFormatter(defaultSelectedOption));
    setValue(defaultSelectedOption);
    setLoading(false);
  }, [defaultSelectedOption, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box my={4}>
      <MUIAutocomplete
        autoHighlight
        getOptionLabel={optionFormatter}
        groupBy={optionGroupFormatter}
        id={id}
        includeInputInList
        inputValue={inputValue}
        options={options}
        onChange={(event, selectedOption) => {
          setValue(selectedOption);
          onChange(selectedOption);
        }}
        onInputChange={(event, value) => setInputValue(value)}
        renderInput={(params: any) => (
          <TextField
            {...params}
            helperText={helperText}
            label={label}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              placeholder,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(option, { inputValue }) => {
          const name = optionFormatter(option);
          const matches = match(name, inputValue);
          const parts = parse(name, matches);

          return (
            <div>
              {parts.map(({ highlight, text }: any, index: number) => (
                <Typography
                  key={index}
                  variant="caption"
                  color={highlight ? "secondary" : "textPrimary"}
                >
                  {text}
                </Typography>
              ))}
            </div>
          );
        }}
        value={value}
      />
    </Box>
  );
}

export default AutoComplete;