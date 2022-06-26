# run-parallel
This program help to set a maximum process at a time, for a bulk of async process.

Imagine if you have a 100 of async API call to your server, for wathever reason. You could just send all of them in one time, but that might be to heavy for the server. You don't want to hurt your server in the process. So you create the task as an array of async functions, split it using lodash into array of arrays, and call the function with Promise.all. This would work, but the execution will wait for each "bulk of functions" to be done before it will execute the next bulk.

You don't want that behavior. So you might think of a queue. This library is exactly it. A queue with max limit. When the limit hasn't been reached, it will add next asyn functions to the queue and execute it. However if the queue is full of pending task, it will pause the addition of next function. If, after a certain amount of time, a function in the queue has finished running, it will immediately add the next function to the queue, until the queue is empty.
