import { Observable } from "rxjs-compat/observable";

const observable = Observable.create((observer: any) => {
  try {
    // observers read values coming from the observables
    observer.next("Hey guys!");
    observer.next("How are you?");
    observer.complete();
    observer.next("This will not show!");
  } catch (err) {
    observer.error(err);
  }
});

// subscribe takes 3 arguments, one for next, one for error and one for complete
observable.subscribe(
  (x: any) => addItem(x),
  (error: any) => addItem(error),
  () => addItem("Completed!")
);

function addItem(val: any) {
  const node = document.createElement("li");
  const textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById("output").appendChild(node);
}
