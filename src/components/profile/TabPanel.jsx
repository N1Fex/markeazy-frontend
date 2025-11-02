import {Box, Container} from "@mui/material";
import React from "react";

const TabPanel = ({value, index, children}) => {

  return (
      <Container
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
      >
        {value === index && (
            <Box sx={{ p: 3 }}>
              {children}
            </Box>
        )}
      </Container>
  );
}

export default TabPanel;