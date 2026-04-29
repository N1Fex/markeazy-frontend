import React from 'react';
import {Button, Container, Tab, Tabs} from "@mui/material";
import {getTabsPanels} from "./tabsData";
import TabPanel from "./TabPanel";
import {logout} from "../utils/JwtUtils";
import {useNavigate} from "react-router-dom";

function a11yProps(index) {
  return {
    id: 'vertical-tab-' + index,
    'aria-controls': 'vertical-tabpanel-' + index,
  };
}

const ProfileContent = ({user, accountType}) => {

  const [section, setSection] = React.useState(0);
  const navigate = useNavigate();

  const handleChangeSection = (e, index) => {
    setSection(index);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs = getTabsPanels(user, accountType);

  return (
      <Container>
        <Container sx={{display: 'flex', marginY: 2}}>
          <Tabs
              value={section}
              onChange={handleChangeSection}
              orientation="vertical"
          >
            {tabs.map((t, i) => (
                <Tab
                    sx={{width: "max-content", paddingRight: 8}}
                    key={i}
                    label={t.title}
                    icon={t.icon}
                    iconPosition="start"
                    {...a11yProps(i)}
                />
            ))}
          </Tabs>

          {tabs.map((t, i) => (
              <TabPanel index={i} value={section} key={i}>{t.component}</TabPanel>
          ))}
        </Container>

        <Container sx={{display: 'flex', justifyContent: 'end'}}>
          <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              sx={{marginBottom: 2}}
          >
            Выйти
          </Button>
        </Container>
      </Container>
  );
};

export default ProfileContent;
