
import {
  getDOMElement,
  getData,
  processRes,
} from './src/intentions.js';


//impure functions
const addListenerToElement = (element, f) => {
  element.addEventListener("click", () => f(document));
}


const buttonListenerFunction = (dom) => {
  const res = R.compose(getData, getDOMElement)('#planet', 'value');
  res.then(res => res.json().then(data => processRes(data)));
}

const currifiedAddListener = R.curry(addListenerToElement);
currifiedAddListener(getDOMElement('button'))(buttonListenerFunction);




