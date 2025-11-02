import PersonalTab from "./tabs/PersonalTab";
import SecurityTab from "./tabs/SecurityTab";
import BadgeIcon from '@mui/icons-material/Badge';
import SecurityIcon from '@mui/icons-material/Security';

export const getTabsPanels = (user) => [
  {
    title: "Личные данные",
    icon: (<BadgeIcon />),
    component: (<PersonalTab user={user}></PersonalTab>)
  },
  {
    title: "Безопасность",
    icon: (<SecurityIcon />),
    component: (<SecurityTab></SecurityTab>)
  },
]