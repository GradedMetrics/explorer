import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataNormalization from '../help/DataNormalization';
import GradeTableHelp from '../help/GradeTable';

const Help = () => {
  const history = useHistory();
  const {
    hash,
  } = history.location;

  const [expanded, setExpanded] = React.useState<boolean | string>(hash ? hash.substr(1, hash.length) : false);

  const handleChange = (panel: string) => (_: any, isExpanded: boolean) => {
    history.replace({
      hash: isExpanded ? panel : undefined 
    });
    setExpanded(isExpanded ? panel : false);
  }

  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        variantMapping={{ h4: 'h1' }}
      >
        <ContactSupportIcon fontSize="large" />
        {' '}
        Help
      </Typography>
      <Typography variant="body1" paragraph>
        Each Pokémon card and Pokémon set features a grade population table which shows the population for each grade that entry has received. This is no different to PSA's own population report, it just adds a layer of separation and displays the data vertically instead of horizontally.
      </Typography>
      <Accordion
        expanded={expanded === 'grade-table'}
        onChange={handleChange('grade-table')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            How does the Grade Population Table work?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <GradeTableHelp />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'data-normalization'}
        onChange={handleChange('data-normalization')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            What is Data Normalization?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <DataNormalization />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default Help;