const assert = require('assert');

const tracker = new assert.CallTracker();

function func() {
    console.log("hello this is jifukui")
}


const callsfunc = tracker.calls(func, 4);
console.dir(tracker.report())
callsfunc();
console.dir(tracker.report())
// func();
process.on('exit', () => {
  try{
    tracker.verify();
  }catch(err){
    console.dir(err)
  }
});