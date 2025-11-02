import React, {useEffect, useState} from 'react';
import {getToUrl} from "../axios_config";
import {useNavigate} from "react-router-dom";
import NeedToBeLoggedIn from "../common/NeedToBeLoggedIn";
import SomethingWentWrong from "../common/SomethingWentWrong";
import LoadingPage from "../common/LoadingPage";
import ProfileContent from "./ProfileContent";

const ProfilePage = () => {

  const navigate = useNavigate();
  const [codeStatus, setCodeStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

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
            <ProfileContent user={user}/>
        }
        {codeStatus === 401 &&
            <NeedToBeLoggedIn/>
        }
        <LoadingPage isLoading={isLoading} />
        <SomethingWentWrong isError={Math.floor(codeStatus / 100) === 5 || codeStatus === undefined} />

      </>
  );
};

export default ProfilePage;