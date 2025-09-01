import React, {useEffect, useState} from 'react';
import {getToUrl} from "../axios_config";
import {Button} from "@mui/material";
import {logout} from "../utils/JwtUtils";
import {useNavigate} from "react-router-dom";
import NeedToBeLoggedIn from "../common/NeedToBeLoggedIn";
import SomethingWentWrong from "../common/SomethingWentWrong";
import LoadingPage from "../common/LoadingPage";
import ProfileInfo from "./ProfileInfo";

const ProfilePage = () => {

  const navigate = useNavigate();
  const [codeStatus, setCodeStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/")
  }


  useEffect(() => {
    setIsLoading(true);
    getToUrl("/profile").then((res) => {
      setCodeStatus(200);
      setIsLoading(false);
      setUser(res.data);
    }).catch(error => {
      setCodeStatus(error.status);
      setIsLoading(false);
    })
  }, []);

  return (
      <>
        {codeStatus === 200 &&
            <ProfileInfo user={user} />
        }
        <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{marginTop: 2}}>
          Выйти
        </Button>
        {codeStatus === 401 &&
            <NeedToBeLoggedIn/>
        }
        <LoadingPage isLoading={isLoading} />
        <SomethingWentWrong isError={Math.floor(codeStatus / 100) === 5 || codeStatus === undefined} />

      </>
  );
};

export default ProfilePage;