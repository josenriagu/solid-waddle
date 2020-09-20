import { BehaviorSubject } from "rxjs-compat/BehaviorSubject";

// BehaviorSubject requires an initial argument
const subject = new BehaviorSubject("First");

subject.subscribe(
  (data) => addItem(`Observer 1: ${data}`),
  (err) => addItem(err),
  () => addItem("Observer 1 completed!")
);

subject.next("The first thing has been sent");
subject.next("...Observer 2 is about to be subscribed...");

const observer2 = subject.subscribe((data) => addItem(`Observer 2: ${data}`));

subject.next("The second thing has been sent");
subject.next("A third thing has been sent");

observer2.unsubscribe(); // doesn't get subsequent data anymore
subject.next("A final thing has been sent");

function addItem(val: any) {
  const node = document.createElement("li");
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}
