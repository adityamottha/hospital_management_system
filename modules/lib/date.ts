
// function for add hours
export function addHours(hour:number): Date{
    return new Date(Date.now() + hour * 60 * 60 * 1000)
}

// function for add minutes
export function addMinutes(minute:number):Date{
    return new Date(Date.now() + minute * 60 * 1000)
}