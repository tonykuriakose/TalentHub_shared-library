declare const asyncWrapper: (fn: Function) => (req: any, res: any, next: any) => Promise<void>;
export default asyncWrapper;
