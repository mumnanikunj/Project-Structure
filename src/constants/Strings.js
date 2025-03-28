import images from "../assets/images"

const Strings = {
  sign_in: 'Sign In',
  forgot_password: 'Forgot Password?',
  sign_up: 'Sign Up',
  profile_setup: 'Profile Setup',
  phone_number: 'Phone Number',
  confirm_account: 'Already have an account?',
  create_account: 'Need to create an account?',
  forgot_password_without_mark: 'Forgot Password',
  reset_password: 'Reset Password',
  note_first: 'Note that the SMS message can take up to 5 minutes',
  next: 'NEXT',
  select_start_iron: 'Select Start Iron',
  delete_account_forever: 'Delete my account forever',
  change_plan: 'Change plan',
  start_session: "Start Session",
  swing_ready: "Swing when ready",
  ready_set_swing : 'Ready, Set, Swing!',
  Recording_text:'Recording will stop automatically when a divot is spotted on your mat. Click Record when ready to start.',
  swing_ready_desc: "Ensure that your hands, feet, and golf mat are visible throughout the entire swing.",
  warning: 'Warning',
  check_box_text_one: 'I agree to the Terms of Service and',
  check_box_text_secound : 'I agree to receive news and offers via email and text message',
  check_box_text_two: 'Privacy Policy',
  check_box_text_three: 'of Golf Daddy ®',
  verify_mobile_number: 'Verify mobile number',
  confirm_mobile_number: 'Confirm mobile number',
  confirm_account_delete: 'Confirm account deletion',
  confirm_message: 'This step cannot be undone. All account data will be permanently erased.',
  delete_my_account: 'Delete account',
  select_map: "Select Map",
  code_sent_text: 'Sent to:',
  code_sent_number: '+ 38(099) 352 25 72',
  resend_code_in: 'Resend code in',
  seconds: ' seconds',
  continue: 'Continue',
  my_profile: 'Profile',
  contact_information: 'Contact Information',
  how_do_address: 'How do I address you?',
  game_play: 'Gameplay',
  right_left_handed: 'Are you left or right handed?',
  profile_photo: 'Profile Photo',
  add_photo: 'Add your photo',
  subscription: 'Subscription',
  choose_subscription_plan: 'Choose a subscription plan',
  using_app: 'Using this app requires the Golf Daddy™ Training Mat.',
  full_name: 'Full name',
  add_comment: 'Add Comment',
  enterTargetDistance: "Enter Target Distance",
  targetDistance: 'Target Distance',
  target : 'Target',
  value_yards: '$1 yards',
  username: 'Username',
  send : 'Send',
  send_feedback: "Send feedback",
  yds:"yds",
  email: 'Email',
  choose_photo: 'Choose Photo',
  buy_subscription: 'Subscribe Now',
  select_plan: 'Select A Plan',
  skip: 'Skip',
  rate_app: 'Rate the app',
  try_free: 'Try 3 days for free',
  left: 'Left',
  handed: 'Handed',
  right: 'Right',  
  user_name: 'Username',
  phone_number_new: '(666) 123 45 67',
  save: 'Save',
  isHome: 'isHome',
  "my_sessions": 'My Sessions',
  how_to_play: 'How to play',
  interested: `You'll be interested:`,
  YourSwings: 'Your Swings',
  Swings: 'Swings',
  Name: 'Name',
  play_now: 'Play Now',
  play_title_1: 'Set up your swing area',
  play_des_1:
    'Place down your Golf Daddy mat and take a slow practice swing ensuring you have adequate range of motion around you. Be careful of low ceilings, pets, walls and bystanders.',
  play_title_2: 'Choke up on the club if necessary',
  play_des_2: 'If you’re struggling to find adequate space. slide your hands up on the club.',
  play_title_3: 'Calibrate your framing',
  play_des_3: 'Ensure that you are in the camera’s center of view with your hands and mat visible throughout the swing.',
  buy_divot: 'Buy a Golf Daddy Simulator ',
  divot_daddy: 'You need one of our simulator kits to use the Golf Daddy app',
  whats_club: 'What club?',
  love_app: "Love the app?",
  not_perfact: "Not perfect!",
  not_perface_desc: "How can we improve your game?",
  love_app_desc: "How likely are you to refer this app to a friend?",
  enter_distance: 'Enter Distance',
  thanks: 'Thanks!',
  rateOnStore: 'Rating us on the App Store helps us keep improving your game, are you in?',
  cancel: 'Cancel',
  not_now: 'Not now',
  understanding_golf_clubs: 'Understanding Golf Clubs',
  club_des:
    'Irons are categorized by numbers, with each number indicating a different loft angle. A lower-numbered iron (like a 3-iron) has a lower loft, resulting in longer distances and a lower trajectory, while a higher-numbered iron (like a 9-iron) has a higher loft, producing shorter distances with a high ascent.',
  ok: 'Ok',
  billingMethod: `Billing Method`,
  editCard: `Edit Card`,
  addNewCard: `Add New Card`,
  paymentCart: `Payment Cart`,
  editText: `Edit`,
  cardNumber: `Card Number`,
  expireDate: `Exp. Date`,
  cvvText: `CVV`,
  countryText: `Country`,
  Preferences: `Preferences`,
  generalNotification: `General`,
  messageNotification: `Message Notification`,
  pushNotification: `Push Notification`,
  reminderText: `Reminders`,
  messageText: `Message`,
  termsOfUseText: `Terms of use`,
  return_session: 'Return to Session',
  my_results: 'My Results',
  are_you_sure: 'Are you sure?',
  delete_profile: 'Delete my profile',
  openSetting: 'Open Setting',
  notiPermissionMessage: 'Notifications have been disabled. To re-enable notifications visit\nSettings > Notifications > GolfDaddy.',
  delete_message:
    'All your data and details of all \n sessions will be permanently lost. This \n step cannot be undone',
  end_session: 'End My Session',
  sessio_message: 'All results are automatically saved in the Sessions tab',
  error_choose_photo: 'Please select profile photo',
  error_yds: 'Please input a distance in yards within the range of 50 to 250',
  select_iron: 'Select Iron',
  select_club: 'Select Club',
  limitedAccuricy: 'Temporarily limited accuracy',
  end_sesion_msg: 'The details of the game have been saved in my session',
  no_data: 'No Data Found',
  error_alert_title: 'An error has occurred',
  error_alert_message: 'Something seems to have gone wrong.',
  try_again: 'Try again',
  no_internet_title: "No internet connection",
  internet_connected: "Internet connected",
  no_internet_message: 'There seems to be no internet connection.',
  update_title: "New app version available",
  update_message: "Update the app.",
  update:"Update",
  terms_error: "Please agree with Terms of Service and Privacy Policy",
  server_error: "Server Error! Please try again Later!",
  Carry: "Carry",
  Distance: "Distance",
  Deviation: "Deviation",
  OnboardAgree: "Please agree to the Terms of Service and Privacy Policy",
  emptyFullName: "Full name should not be empty",
  validFullName: "Please enter valid Full name",
  emptyUserName: "User name should not be empty",
  validUserName: "Please enter valid User name",
  emptyEmail: "Email should not be empty",
  validEmail: "Please enter valid Email",
  Submit: "Submit",
  pin_finder: "Pin Finder",
  the_range: "Free Play",
  battle_royale: "Battle Royale",
  the_range_desc: "A digital golf range with instant feedback on every shot. Take a swing and see how it flew with any club and no defined objective.",
  battle_royale_desc: "10 players compete to hole their shots through different scenarios. The last golfer standing wins.",
  pin_finder_desc: "Closest to the pin, from a variety of angles, challenge yourself and get better at golf by mastering every angle and shot on target.",
  what_kind_of_game: "What kind of games?",
  what_kind_of_game_title: "Game modes explained",
  short_game: "Short game (coming soon)",
  feedback: "Feedback",
  distance: "Distance",  
  carry_distance : 'Carry distance',
  carry_deviation : 'Carry deviation',
  whereShot: "Where should your shot have landed?",
  deviation: "Deviation",
  short_game_description: "The short game mode is designed to prepare you for every possible scenario you’ll encounter on the golf course. With new scenarios twice per week, constantly challenge yourself to dial in your short game.",
  free_play: "Free Play",
  free_play_description: "A digital golf range where you get instant feedback on every shot. Take a swing and see how it flew with any club and no defined objective.",
  no_subscription: "You have not subscribed to any plan yet",
  manage_subscription: "Manage Subscription",
  subscribed: "You have already subscribed to one plan",
  modify_subscription: "You can easily cancel or modify your subscription at any time",
  subscribe_text: "No free shots remaining for today, please subscribe!",
  club:'Club',
  onboarding : 'Onboarding',
  consider_yourself : `What level player do you consider ${'\n'} yourself?`,
  height_text : 'Height',
  age_text : 'age',
  score : 'score',
  get_ready : 'Get ready',
  let_go: "Let’s go",
  select_club_text : 'Only select clubs available for onboarding',
  lowest_power : 'Lowest Power',
  record : 'RECORD',
  calibration:'Calibration',
  i_dont_know :'I don’t know',
  not_sure : 'Not sure, I’m a beginner',
  done:'DONE',
  start_simulating : 'Start simulating your swings',
  second_guide: '60-second guide',
  swing_learn_text : 'Watch this quick video to learn how to take your first swing.',  
  unit_of_measurement : 'Unit of measurement',
  Language : 'Language'
}

export const sigup_title = [
  Strings.contact_information,
  Strings.game_play,
  Strings.profile_photo,
  Strings.subscription,
  Strings.onboarding
]
export const sigup_des = [
  Strings.how_do_address,
  Strings.right_left_handed,
  Strings.add_photo,
  Strings.choose_subscription_plan
]
export const Videos = {
  dummy_video :require('../assets/video/Promo.mp4')
}


export const play_title = ['play_title_1', 'play_title_2', 'play_title_3']
export const play_des = ['play_des_1', 'play_des_2', 'play_des_3']
export const play_image = [images.play.swing_area, images.play.choke_up1, images.play.calibreate]



export const languages = [
  {
    Name : 'English (English)',
    languagecode: 'en',
    countryName: 'USA',
    id:1,
    is_Selected : true
  },
  {
    Name : 'Japanese (日本語)',
    languagecode: 'ja',
    countryName: 'Japan',
    id:2,
    is_Selected : false
  }
] 

export const UNIT_MOCK_DATA=[
  {
    Name: 'yards_feet_inches',
    id:1,
    is_Selected : true
  },
  {
    Name: 'meters_centimeters',
    id:2,
    is_Selected : false
  }
]

export default Strings
