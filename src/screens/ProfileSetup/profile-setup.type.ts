export interface IProfileObject {
  answered: boolean
  input_fields: InputFieldsProfile
  screen_type: string
  stage_id: number
  subtitle: string
  title: string
}

interface InputFieldsProfile {
  email: string
  full_name: string
  marketing_allowed: boolean
  username: string
}


export interface IOnboardItem {
  stage_id: number
  title: string
  subtitle: string
}

export interface IOnBoardGamePlay {
  answered: boolean
  options: IGamePlay
  screen_type: string
  stage_id: number
  subtitle: string
  title: string
}

export interface IGamePlay {
  left: boolean
  right: boolean
}

export interface IOnboardHeight {
  answered: boolean
  screen_type: string
  slider: boolean
  stage_id: number
  subtitle: string
  title: string
}

export interface IPlayerLevel {
  stage_id: number;
  screen_type: string;
  title: string;
  subtitle: string;
  options: IOptionsPlayerLevel;
  answered: boolean;
}

export interface IOptionsPlayerLevel {
  Beginner: boolean;
  Intermediate: boolean;
  Advanced: boolean;
  Competitive: boolean;
  Professional: boolean;
}
