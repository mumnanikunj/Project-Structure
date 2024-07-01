interface IDetailSessionsOverview {
    ArrayofDetailes: IArrayofDetailes[]
    isUnity: boolean
}

interface IArrayofDetailes {
    text: string
    times: string
    img?: any
}

interface IDetailSessionListView {
    onEndReach: () => void
    data: any[]
    isTitleCenter?: boolean
}

export type {
    IArrayofDetailes,
    IDetailSessionListView,
    IDetailSessionsOverview
}