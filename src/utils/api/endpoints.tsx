const EndPoints = {
  refreshToken: '',
  login: 'login/send_otp/',
  loginVerify: 'login/verify_otp/',
  signUp: 'register/send_otp/',
  getOnboard: 'register/get_onboarding_flow/',
  deleteOtp: 'del/send_otp/',
  deleteOtpVerify: 'del/verify_otp/',
  signUpVerify: 'register/verify_otp/',
  signUpUpdate: 'user/update/',
  uploadVideo: 'video/analysis/',
  video_simulate: 'video/simulate_video/',
  create_rating: 'ratings/create_rating/',
  dashBoard: 'dashboard/',
  clubs: 'clubs/',
  updateSwing: 'user/sessions/update_swing/',
  session: 'user/sessions/create_session/',
  sessionList: 'user/sessions/list_sessions/',
  termsCondition: 'terms/',
  home: 'home/',
  check_rating: 'ratings/check_last_rating/',
  userProfile: 'user/profile/',
  notify: 'notify/',
  deleteAccount: 'del/account/',
  logout: 'logout/',
  sessionDetail: 'user/sessions/list_swings',
  pushNotificationSetting: 'push/notifications/',
  notificationList: 'user/notification/list/',
  endSession: 'user/sessions/end_session/',
  updateToken: 'user/update_token/',
  validateReceipt: 'receipt/validation/',
  userShots: 'user/shots/',
  rangeList: 'shot/range/',
  submit_swing: 'user/sessions/submit_swing_feedback/'
}

export default EndPoints
