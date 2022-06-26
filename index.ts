import { ParalellRunData, ParallelRunFunction } from "./model";

const MAX_PARALEL_DOWNLOAD = 5;

export default function runParallel<T>({
  data,
  fn,
  maxParalelProcess = MAX_PARALEL_DOWNLOAD,
}: {
  data: ParalellRunData<T>[];
  fn: ParallelRunFunction<T>;
  maxParalelProcess?: number;
}) {
  let workCount = 0;
  async function recursivuh(): Promise<void> {
    for (let i in data) {
      const datum = data[i];
      if (workCount < maxParalelProcess) {
        if (!datum.isDone && !datum.isDownloading) {
          workCount++;

          datum.isDownloading = true;
          fn(datum.payload).then(() => {
            datum.isDownloading = false;
            datum.isDone = true;
            workCount--;
            recursivuh();
          });
        }
      }
    }

    if (data.every((file) => file.isDone)) {
      return;
    }
  }

  recursivuh();
}
