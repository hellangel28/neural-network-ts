export const sleep = (ms: number) => {
    let currentTime = new Date().getTime();
    while ((new Date().getTime() - currentTime) < ms) {

    }
}