export const throttle = (callback: () => void) => {
    //don't run the function if throttlePause is true
    let throttlePause: boolean
    return () => {
        if (throttlePause) return
        throttlePause = true
        //setTimeout runs the callback within the specified time
        setTimeout(() => {
            callback()
            throttlePause = false
        }, 100)
    }
}
