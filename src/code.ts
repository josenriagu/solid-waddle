import { ReplaySubject } from "rxjs-compat/ReplaySubject";

// ReplaySubject requires an argument to specify the number of values to dispatch to
// const subject = new ReplaySubject(2);

// or an additional argument to specify offer time in ms
const subject = new ReplaySubject(30, 200);

subject.subscribe(
  (data) => addItem(`Observer 1: ${data}`),
  (err) => addItem(err),
  () => addItem("Observer 1 completed!")
);

let i = 1;
let int = setInterval(() => subject.next(i++), 100);

setTimeout(() => {
  const observer2 = subject.subscribe((data) => addItem(`Observer 2: ${data}`));
}, 500);

function addItem(val: any) {
  const node = document.createElement("li");
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}
