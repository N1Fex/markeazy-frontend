import React, {useEffect, useState} from 'react';
import {getToUrl} from "../axios_config";
import NeedToBeLoggedIn from "../common/NeedToBeLoggedIn";
import SomethingWentWrong from "../common/SomethingWentWrong";
import LoadingPage from "../common/LoadingPage";
import ProfileContent from "./ProfileContent";
import {useAuthState} from "../utils/JwtUtils";

const ProfilePage = () => {
  const [codeStatus, setCodeStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const {accountType} = useAuthState();

  useEffect(() => {
    setIsLoading(true);
    const profilePath = accountType === "SELLER" ? "/seller/me" : "/profile";

    getToUrl(profilePath).then((res) => {
      const normalizedUser = accountType === "SELLER"
          ? {
            ...res.data,
            registrationDate: res.data.registrationDate ?? res.data.registration_date,
          }
          : res.data;

      setCodeStatus(200);
      setIsLoading(false);
      setUser(normalizedUser);
    }).catch(error => {
      setCodeStatus(error?.response?.status ?? error?.status);
      setIsLoading(false);
    })
  }, [accountType]);

  return (
      <>
        {codeStatus === 200 &&
            <ProfileContent user={user} accountType={accountType}/>
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
