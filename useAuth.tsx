import axios from "axios";
import React from "react";
import jwt_decode from "jwt-decode";
import Config from "./config/index";
interface AuthContextType {
  user?: any;
  loading: boolean;
  error?: any;
  team?: any;
  plans?: any;
  role?: any;
  seats?: any;
  profile?: any;
  isSubscribe?: any;
  logout: () => void;
  resetUser: () => void;
  getPrimaryTeam: () => void;
  getUserSheets: (id: any) => void;
  getSubscribedPlans: (id: any) => void;
}

const allowedDomain = ["aflah.com", "ilmiya.com"];

// !!! Depereciated
// function checkAvailable(email:string){
//     let spit = email.split("@")
//     const domain = spit[1];

//     if(allowedDomain.includes(domain)){
//         return true;
//     }
//     return false;
// }

// !!! Depereciated
// const allowedAdmin = (decode:any)=>{
//     if(decode.firebase){
//         if(decode.firebase?.sign_in_provider!="custom"){
//                 return true;
//         }
//         return false;

//     }
// }

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [user, setUser] = React.useState<any>();
  const [role, setRole] = React.useState<any>();
  const [team, setTeam] = React.useState<any>("");
  const [profile, setProfile] = React.useState<any>("");
  const [error, setError] = React.useState<any>();
  const [plans, setPlans] = React.useState<any>(false);
  const [seats, setSeats] = React.useState<any>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isSubscribe, setSubscribe] = React.useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = React.useState<boolean>(false);
  const path = window.location.pathname
  const spaceid = path.split("/")[2]
  console.log('spaceid',spaceid)

  React.useEffect(() => {
    if (error) setError(null);
  }, []);

  React.useEffect(() => {
    setLoading(true);
    setLoadingInitial(true);
    axios
      .get(Config.AUTH_URL + "/api/verifySessionCookie", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.data.access_token) {
          var acc = response.data.data.access_token;
          const decode: any = jwt_decode(acc);

          if (decode !== null && decode !== undefined) {
            // Only studio user can logged in
            // if (decode["aud"] === "iam-ilmiya-com") {
              setRole("admin");
              getTeam(decode["user_id"]);
              if(spaceid){
                getSubscribedPlans(spaceid)
              }
          
              localStorage.setItem("access_token", acc);
              setUser(decode);
              window.analytics.identify(decode["user_id"], {
                name: decode["name"],
                email: decode["email"],
              });
              setLoading(false);
              setLoadingInitial(false);
            // } else {
            //   window.location.href = Config.loginURL;
            // }
          } else {
            window.location.href = Config.loginURL;
          }
        }
      })
      .catch((_error) => {
        setLoading(true);
        setLoadingInitial(true);
        if (
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
        ) {
          let split = window.location.search.split("=");
          let str: any = null;

          if (split[0].indexOf("access_token") !== -1) {
            str = split[1];
            console.log("jwt_decode(str)", jwt_decode(str));
            const decode: any = jwt_decode(str);

            if (decode !== null && decode !== undefined) {
              // Only Studio User can logged in
              // if (decode["aud"] === "iam-ilmiya-com") {
                setRole("admin");
                getTeam(decode["user_id"]);
                if(spaceid){
                  getSubscribedPlans(spaceid)
                }
               
                localStorage.setItem("access_token", str);
                setUser(decode);
                setLoading(false);
                setLoadingInitial(false);
              // } else {
              //   window.location.href = Config.loginURL;
              // }
            } else {
              window.location.href = Config.loginURL;
            }
          }
          if (localStorage.getItem("access_token") !== null) {
            // console.log( "INDEX NULL" );
            // console.log( 'Access Token', localStorage.getItem( "access_token" ) );
            str = localStorage.getItem("access_token");
            // console.log( 'jwt_decode(str) INSIDE NULL', jwt_decode( str ) )
            const decode: any = jwt_decode(str);

            if (decode !== null && decode !== undefined) {
              // Only Studio User can logged in
              // if (decode["aud"] === "iam-ilmiya-com") {
                setRole("admin");
                // console.log( "DECODE NOT UNDEFINED" )
                getTeam(decode["user_id"]);
                if(spaceid){
                  getSubscribedPlans(spaceid)
                }
              
                localStorage.setItem("access_token", str);
                setUser(decode);
                setLoading(false);
                setLoadingInitial(false);
              // } else {
              //   window.location.href = Config.loginURL;
              // }
            } else {
              window.location.href = Config.loginURL;
            }
          }
        } else {
          window.location.href = Config.loginURL;
        }
      })
      .finally(() => {});
  }, []);

  function logout() {
    axios
      .get(Config.AUTH_URL + "/api/logout", { withCredentials: true })
      .then((response) => {
        // console.log( response );
        setUser(undefined);
        window.location.href = Config.LOGOUT_URL;
      })
      .catch((_error) => { })
      .finally(() => {
        localStorage.removeItem("access_token");
        setLoadingInitial(false);
        setLoading(false);
      });
  }

  function getTeam(uid: any) {
    axios({
      method: "get",
      url: Config.USERS_URL + "userbyuid/" + uid,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
     
        if (response && response.status == 200) {
          if (response.data && response.data.data) {

            let data = response.data.data;
            data.user_id = data.uid;
            data.name = data.display_name;
            data.picture = data.photo_url;
           
          

            if(spaceid==undefined ){
              axios({
                method: "get",
                url: Config.SPACES_URL + "space/" + data.communityid,
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response1: any) => {
                  console.log("getTeam 2 ", response);
  
                  if (response1 && response1.status == 200) {
                    if (response1.data && response1.data.data) {
                      data.teamId = response1.data.data.id;
                      data.teamName = response1.data.data.name;
                      data.teamname = response1.data.data.name;
                      data.orgId = response1.data.data.uuids;
                      data.spaceId = response1.data.data.uuids;
                      setTeam(data);
                    }
                  }
                })
                .catch((_error: any) => {
                  console.log("_error getTeam", _error);
                })

            }
            else{
              axios({
                method: "get",
                url: Config.SPACES_URL + "space/uuids/" + spaceid,
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response1: any) => {
                  console.log("getTeam 1", response1);
  
                  if (response1 && response1.status == 200) {
                    if (response1.data && response1.data.data) {
                      data.teamId = response1.data.data.id;
                      data.teamName = response1.data.data.name;
                      data.teamname = response1.data.data.name;
                      data.orgId = response1.data.data.parent_org_uuids;
                      data.spaceId = response1.data.data.uuids;
                      setTeam(data);
                    }
                  }
                })
                .catch((_error: any) => {
                  setTeam(data);
                  console.log("_error getTeam", _error);
                })
            }
           
            if (response.data.data.plan) {
              setSubscribe(response.data.data.plan);
            }
          }
        }
      })
      .catch((_error: any) => {
        console.log("_error getTeam", _error);
      })
      .finally(() => {});
  }


  function getSubscribedPlans(orgId: any) {
    console.log("getSubscribedPlans called useAuth");
    axios({
      method: "post",
      url: Config.SUBSCRIPTIONS_URL + "/getUserOrgSubscription",
      data: {
        org_uuids: orgId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        console.log("getSubscribedPlans response", response);

        if (response && response.status == 200) {
          if (response.data && response.data.status == "success") {
            console.log("getSubscribedPlans response.data setPlans", response.data);
            setPlans(response.data);
          }
        }

        // setLoading(false);
      })
      .catch((_error) => {
        console.log("Error getUserSubscribed", _error);
      })
      .finally(() => {});
  }

  function getUserSheets(uid: any) {
    axios({
      method: "post",
      url: Config.SUBSCRIPTIONS_URL + "/get-org-seat-info",
      data: {
        org_uuids: uid,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        console.log("PS Seat Info", response.data.data);
        if (response && response.status == 200) {
          if (response.data && response.data.status == "success") {
            let data: any = response.data.data;
            data.history = response.data.seat_history;
            setSeats(data);
          }
        }

        // setLoading(false);
      })
      .catch((_error) => {
        console.log("Error getUserSubscribed", _error);
      })
      .finally(() => {});
  }

  function getPrimaryTeam() {
    axios({
      method: "get",
      url: Config.USERS_URL + "userbyuid/" + user.user_id,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        console.log("response userbyuid getPrimaryTeam func" , response);

        if (response && response.status == 200) {
          if (response.data && response.data.data) {

            let data = response.data.data;
            data.user_id = data.uid;
            data.name = data.display_name;
            data.picture = data.photo_url;
            console.log('Space Name',spaceid)
          

            if(spaceid==undefined ){
              axios({
                method: "get",
                url: Config.SPACES_URL + "space/" + data.communityid,
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response1: any) => {
                  console.log("getTeam response space id ", response);
  
                  if (response1 && response1.status == 200) {
                    if (response1.data && response1.data.data) {
                      data.teamId = response1.data.data.id;
                      data.teamName = response1.data.data.name;
                      data.teamname = response1.data.data.name;
                      data.orgId = response1.data.data.uuids;
                      data.spaceId = response1.data.data.uuids;
  
                    }
                  }
                })
                .catch((_error: any) => {
                  console.log("_error getTeam", _error);
                })

            }
            else{
              axios({
                method: "get",
                url: Config.SPACES_URL + "space/uuids/" + spaceid,
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response1: any) => {
                  console.log("getTeam response1 userbyuid space by uuids", response1);
  
                  if (response1 && response1.status == 200) {
                    if (response1.data && response1.data.data) {
                      data.teamId = response1.data.data.id;
                      data.teamName = response1.data.data.name;
                      data.teamname = response1.data.data.name;
                      data.orgId = response1.data.data.parent_org_uuids;
                      data.spaceId = response1.data.data.uuids;
  
                    }
                  }
                })
                .catch((_error: any) => {
                  console.log("_error getTeam", _error);
                })
            }

           

            // new axios ends

           
            console.log("getTeam data before setTeam", data);
            
            setTeam(data);
            if (response.data.data.plan) {
              setSubscribe(response.data.data.plan);
            }
          }
        }
      })
      .catch((_error: any) => {
        console.log("_error getTeam", _error);
      })
      .finally(() => {});
  }
  // function getPrimaryTeam() {
  //   // console.log( 'getPrimaryTeam user', user )

  //   axios({
  //     method: "get",
  //     url: Config.USERS_URL + "userbyuid/" + user.user_id,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response: any) => {
  //       if (response && response.status == 200) {
  //         if (response.data && response.data.data) {
  //           let data = response.data.data;
  //           data.user_id = data.uid;
  //           data.name = data.display_name;
  //           data.picture = data.photo_url;
  //           data.teamId = data.teamid;
  //           data.teamName = data.teamname;
  //           // setTeam(data);
  //         }
  //       }

  //       // setLoading(false);
  //     })
  //     .catch((_error) => {
  //       console.log("Error getPrimaryTeam", _error);
  //     })
  //     .finally(() => {});
  // }

  function resetUser() {
    // setLoading(true);

    axios({
      method: "get",
      url: Config.USERS_URL + "userbyuid/" + user.user_id,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        if (response && response.status == 200) {
          if (response.data && response.data.data) {
            let data = response.data.data;
            data.user_id = data.uid;
            data.name = data.display_name;
            data.teamId = data.teamid;
            data.teamName = data.teamname;
            data.picture = data.photo_url;
            setUser(data);
          }
        }

        // setLoading(false);
      })
      .catch((_error) => {})
      .finally(() => {});
  }

  const memoedValue = React.useMemo(
    () => ({
      user,
      plans,
      loading,
      error,
      role,
      team,
      seats,
      profile,
      isSubscribe,
      getPrimaryTeam,
      resetUser,
      logout,
      getSubscribedPlans,
      getUserSheets,
    }),
    [user, loading, team, error, role, seats, isSubscribe, profile, plans]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}
export default function useAuth() {
  return React.useContext(AuthContext);
}
