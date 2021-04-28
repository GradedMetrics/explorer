/**
 * This extends Material UI's Autocomplete component available at
 * https://material-ui.com/components/autocomplete.
 */

import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SearchIcon from '@material-ui/icons/Search';
import MUIAutocomplete from '@material-ui/lab/Autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Loading from './Loading';

type AutoCompleteProps = {
  defaultSelectedOption?: any
  disabled?: boolean
  id: string
  helperText?:  string
  label: string
  optionFormatter: (option: any) => string
  optionGroupFormatter?: (option: any) => string
  options: any[]
  onChange: (selectedOption: any) => void
  placeholder?: string
  showNextPrev?: boolean
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  defaultSelectedOption,
  disabled = false,
  id,
  helperText,
  label,
  options,
  optionFormatter,
  optionGroupFormatter,
  onChange,
  placeholder,
  showNextPrev = false,
}) => {
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('xs'));

  let defaultInputValue;

  if (defaultSelectedOption) {
    defaultInputValue = optionFormatter(defaultSelectedOption);
  }

  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>(defaultInputValue || '');
  const [value, setValue] = React.useState<string | object>(defaultSelectedOption);

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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSelectedOption, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  let next: any;
  let prev: any;

  if (!showNextPrev) {}
  else if (!value) {
    next = options[0];
  } else {
    const stringifiedValue = JSON.stringify(value);
    const currentIndex = options.findIndex(option => stringifiedValue === JSON.stringify(option));
    
    prev = options[currentIndex - 1];
    next = options[currentIndex + 1];
  }

  return (
    <Box my={4}>
      <MUIAutocomplete
        autoHighlight
        disabled={disabled}
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
      {showNextPrev && (prev || next) ? (
        <Box mt={1}>
          <Grid container spacing={1}>
            <Grid item md={6} sm={12} xs={6}>
              <Box>
                {prev ? (
                  <Button
                    color="primary"
                    onClick={() => onChange(prev)}
                    size="small"
                    style={{ textAlign: 'left' }}
                    type="button"
                  >
                    <ArrowBackIcon fontSize="small" style={{ marginRight: 4 }} />
                    {' '}
                    {isMobileDisplay ? 'Previous' : optionFormatter(prev)}
                  </Button>
                ) : undefined}
               </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={6}>
              <Box textAlign="right">
                {next ? (
                  <Button
                    color="primary"
                    onClick={() => onChange(next)}
                    size="small"
                    style={{ textAlign: 'right' }}
                    type="button"
                  >
                    {isMobileDisplay ? 'Next' : optionFormatter(next)}
                    {' '}
                    <ArrowForwardIcon fontSize="small" style={{ marginLeft: 4 }} />
                  </Button>
                ) : undefined}
               </Box>
            </Grid>
          </Grid>
        </Box>
      ) : undefined}
    </Box>
  );
}

export default AutoComplete;