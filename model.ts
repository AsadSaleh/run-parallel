export interface ParalellRunData<T = any> {
  isDownloading: boolean;
  isDone: boolean;
  payload: T;
}

export type ParallelRunFunction<T> = (
  payload: ParalellRunData<T>["payload"]
) => Promise<any>;
