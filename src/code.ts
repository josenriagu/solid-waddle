import { Observable } from "rxjs-compat/observable";

// COLD Observable is one in which its producer ( the callback in the create method) is activated once its subscription has been activated
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

// we could have multiple observers
const observer2 = observable.subscribe((x: any) => addItem(x));

// however, canceling stops only the indicated observer,
// although we may add extra observers to the indicated observer like below,
// so that unsubscribing from one, does same to others

observer.add(observer2);

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
