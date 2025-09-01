import React from 'react';
import {Container, Tab, Tabs} from "@mui/material";
import {tabs} from "./tabsData";
import TabPanel from "./TabPanel";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const ProfileInfo = ({user}) => {

  const [section, setSection] = React.useState(0);

  const handleChangeSection = (e, index) => {
    setSection(index);
  }

  return (
      <Container sx={{display: 'flex', flexGrow: 1}}>
        <Tabs
            value={section}
            onChange={handleChangeSection}
            orientation="vertical">

          {
            tabs.map((t, i) => <Tab label={t.title} {...a11yProps(i)} />)
          }

        </Tabs>

        {
          tabs.map((t, i) =>
              (<TabPanel index={i} value={section} key={i}>{t.component}</TabPanel>))
        }
      </Container>

);
};

export default ProfileInfo;