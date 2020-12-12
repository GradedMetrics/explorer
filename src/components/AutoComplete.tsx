/**
 * This extends Material UI's Autocomplete component available at
 * https://material-ui.com/components/autocomplete.
 */

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MUIAutocomplete from '@material-ui/lab/Autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

type AutoCompleteProps = {
  id: string
  helperText?:  string,
  label: string
  optionFormatter: (option: any) => string
  optionGroupFormatter?: (option: any) => string
  options: any[]
  onChange: (selectedOption: any) => void
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  id,
  helperText,
  label,
  options,
  optionFormatter,
  optionGroupFormatter,
  onChange,
}) => {
  return (
    <MUIAutocomplete
      autoHighlight
      getOptionLabel={optionFormatter}
      groupBy={optionGroupFormatter}
      id={id}
      includeInputInList
      options={options}
      onChange={(event, selectedOption) => onChange(selectedOption)}
      renderInput={(params: any) => (
        <TextField
          {...params}
          helperText={helperText}
          label={label}
          variant="outlined"
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
    />
  );
}

export default AutoComplete;