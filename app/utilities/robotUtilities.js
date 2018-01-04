export const checkRobotToken = (state) => {
    return new Promise((resolve, reject) => {
        const accessToken = state.robot.accessToken,
        now = Math.floor(Date.now() / 1000),
        expirationTime = state.robot.expirationTime;
        if (accessToken && (now < expiration)) {
            reslove(true);
        } else {
            resolve(false);
        }    
    });
}