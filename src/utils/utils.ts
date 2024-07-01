import _ from "lodash";

import images from "../assets/images";
import { IArrayofDetailes } from "../screens/DetailSessions/DetailSession.props";

const getSessionDetailObj = (sessionDetail: any):
    IArrayofDetailes[] => {
    return [
        {
            text: _.get(sessionDetail, "title1", "Game Type"),
            times: _.get(sessionDetail, "value1", "")
        },
        {
            img: images.tabs.distance,
            text: _.get(sessionDetail, "title2", "Streak Max"),
            times: _.get(sessionDetail, "value2", "-")
        },
        {
            img: images.tabs.book,
            text: _.get(sessionDetail, "title3", "Total Swings"),
            times: _.get(sessionDetail, "value3", 0)
        },
        {
            img: images.tabs.timer,
            text: _.get(sessionDetail, "title4", "Duration"),
            times: _.get(sessionDetail, "value4", '00:00:00')
        }
    ];

}

const getNumberFromString = (text: string): string => {
    return text.replace(/[^0-9]/g, '');
}

const formatPhoneNumber = (text, previousText): string => {
    if (!text) return text

    const deleting = previousText && previousText.length > text.length
    if (deleting) {
        return text
    }

    let cleaned = text.replace(/\D/g, '') // remove non-digit characters
    let match = null

    if (cleaned.length > 0 && cleaned.length < 2) {
        return `(${cleaned}`
    } else if (cleaned.length == 3) {
        return `(${cleaned}) `
    } else if (cleaned.length > 3 && cleaned.length < 5) {
        match = cleaned.match(/(\d{3})(\d{1,3})$/)
        if (match) {
            return `(${match[1]}) ${match[2]}`
        }
    } else if (cleaned.length == 6) {
        match = cleaned.match(/(\d{3})(\d{3})$/)
        if (match) {
            return `(${match[1]}) ${match[2]}-`
        }
    } else if (cleaned.length > 6) {
        match = cleaned.match(/(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`
        }
    }

    return text
};

export {
    formatPhoneNumber,
    getNumberFromString,
    getSessionDetailObj}