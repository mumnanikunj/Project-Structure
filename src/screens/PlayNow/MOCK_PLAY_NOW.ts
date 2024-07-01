import images from "../../assets/images"

const PLAY_NOW_DATA = [
    {
        "desc": "play_range",
        "id": 0,
        "image": images.play.play_pin_finder,
        "is_disabled": false,
        "title": "pin_finder",
        "isTarget": true,
        "game_mode": 'pinFinder'
    },
    {   
        "desc": "daily_challenges",
        "id": 1,
        "image": images.play.play_battle,
        "is_disabled": false,
        "title":"battle_royale",
        "isTarget": false,
        "game_mode" : "battleRoyale",
        "map": "fsCentralCityRange"
    },
    {
        "desc": "play_range",
        "id": 2,
        "image": images.play.play_free_play,
        "is_disabled": true,
        "title": "the_range",
        "isTarget": true,
        "game_mode" : "freePlay",
        "map": "fsCentralCityRange"
    }
]

export {
    PLAY_NOW_DATA
}