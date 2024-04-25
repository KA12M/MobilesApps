const host = import.meta.env.VITE_HOST;

export const RoutePath = {
  home: host,
  userPage: `${host}UserPage`,
  eyesCreate: `${host}EyesCreate`,
  earSelect: `${host}EarSelect`,
  check250Hz: `${host}Check250Hz`,
  check500Hz: `${host}Check500Hz`,
  check1000Hz: `${host}Check1000Hz`,
  check2000Hz: `${host}Check2000Hz`,
  check4000Hz: `${host}Check4000Hz`,
  check6000Hz: `${host}Check6000Hz`,
  check8000Hz: `${host}Check8000Hz`,
  pauseCheck: `${host}PauseCheck`,
  hearringCreate: `${host}HearringCreate`,
  assessmentform: `${host}Assessmentform`,
  assessmentformList: `${host}AssessmentformList`,
  userDetail: (id) => `${host}user/${id}`,
  userDetailPath: `${host}user/:id`,
};
