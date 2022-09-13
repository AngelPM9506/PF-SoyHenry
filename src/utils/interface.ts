export interface User {
    name: string;
    mail: string;
    description: string;
}

export interface UserUpdate {
    name: string;
    description: string;
}

export interface Activity {
    where: {
        id: string
    }
    data: {
        name: string
        availability: string
        description: string
        price: number
        active?: boolean
    }
}

export enum weekdays {
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
}