export class Stopwatch {
    private startTime: number;

    public start(): void {
        this.startTime = this.getCurrentTime();
    }

    public getCurrentTime(): number {
        return new Date().getTime();
    }

    public getTime(): number {
        if (!this.startTime) return 0;
        return this.getCurrentTime() - this.startTime;
    }

    public getMs(): number {
        return this.getTime() / 1000;
    }
}