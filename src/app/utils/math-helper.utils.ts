export class MathHelper {
    public static standardDeviation(values: number[]) {
        let totalValues = values.reduce((x, no) => {
            x = x + no;
            return x;
        }, 0);
        const ave = totalValues / values.length;

        const sum = values.reduce((x: number, no: number) => {
            x = x + Math.pow(no - ave, 2);
            return x;
        }, 0);
        const result = Math.sqrt(sum / values.length);
        return result;
    }

    public static average(values: number[]) {
        let totalValues = values.reduce((x, no) => {
            x = x + no;
            return x;
        }, 0);

        const ave = totalValues / values.length;
        return ave;
    }
}
