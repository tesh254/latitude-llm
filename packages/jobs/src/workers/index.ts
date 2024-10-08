import { Worker } from 'bullmq'
import { Redis } from 'ioredis'

import { defaultWorker } from './worker-definitions/defaultWorker'

const WORKER_OPTS = {
  concurrency: 5,
  autorun: true,
  ...(process.env.NODE_ENV !== 'development' && {
    removeOnComplete: { count: 0 },
    removeOnFail: { count: 0 },
  }),
}
const WORKERS = [defaultWorker]

export default function startWorkers({ connection }: { connection: Redis }) {
  return WORKERS.flatMap((w) =>
    w.queues.map(
      (q) =>
        new Worker(q, w.processor, {
          ...WORKER_OPTS,
          connection,
        }),
    ),
  )
}
