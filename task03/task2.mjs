import {performance} from "perf_hooks";
import {EventEmitter} from "./task1.mjs";

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit('start');
    const startTime = performance.now();

    await asyncFunc(...args);

    const endTime = performance.now();
    this.emit('end');

    console.log(`Time taken to execute function is ${(endTime - startTime).toFixed(2)}ms.`);
  }
}

const fetchFromUrl = async (url, cb) => {
  const response = await fetch(url);
  const post = await response.json();
  cb(post);
}

const withTime = new WithTime();
withTime.on('start', () => console.log('About to execute'));
withTime.on('data', (value) => console.log(`Data received: ${JSON.stringify(value)}`));
withTime.on('end', () => console.log('Done with execute'));

await withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1', (result) => withTime.emit('data', result));

console.log(withTime.rawListeners("end"));