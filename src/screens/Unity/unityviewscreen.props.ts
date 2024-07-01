import { IArrayofDetailes } from "../DetailSessions/DetailSession.props"

type GameModeType = 'pin_finder' | 'free_shot' | 'Battle_royale'

type Iron = '8 Iron' | '9 Iron' | 'Pitching Wedge' | 'PW'

type SendEventToUnityType = 'stop_camera' | 'result' | 'startSession' | 'changeClub' | 'close_sheet'

interface IStartSession {
  type: 'startSession',
  gameMode: GameModeType,
  GameObject: string
  Method: string
  map: string
  clubType: string
}

interface IVideoResult {
  type: string
  carryDistance: number
  carryDeviation: number
  totalDistance: number
  totalDeviationDifference: number
  totalDistanceDiff: number
  totalDeviationDiff: number
  shotType: string
  apexHeight: number
  clubSpeed: number
  launchAngle: number
  launchDirection: number
  swingNumber: number
}

interface ISessionResultUnity {
  sessionId: string
  bottomSheetRef: any
  onEndReach: () => void
  swingId: string
  isUnity: boolean
}

export type {
  ISessionResultUnity,
  IStartSession,
  IVideoResult,
  SendEventToUnityType}