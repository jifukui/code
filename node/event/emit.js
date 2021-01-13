const Event = require("events");
class Emit extends Event{};
const emit = new Emit();
emit.on("event",()=>{
    console.log("have someting happen");
})
emit.emit("event");
console.log(emit.eventNames());
console.log(emit.getMaxListeners());