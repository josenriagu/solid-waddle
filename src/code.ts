import { Observable } from "rxjs-compat/observable";

const observable = Observable.create((observer: any) => {
  try {
    // observers read values coming from the observables
    observer.next("Hey guys!");
    observer.next("How are you?");
    setInterval(() => {
      observer.next("We are good 🙌");
    }, 2000);
  } catch (err) {
    observer.error(err);
  }
});

// subscribe takes 3 arguments, one for next, one for error and one for complete
const observer = observable.subscribe(
  (x: any) => addItem(x),
  (error: any) => addItem(error),
  () => addItem("Completed!")
);

// to cancel an observer, assign it to a variable and call the unsubscribe method
setTimeout(() => {
  observer.unsubscribe();
}, 6001);

function addItem(val: any) {
  const node = document.createElement("li");
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}
