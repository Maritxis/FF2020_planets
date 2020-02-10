
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';
import { styles } from './styles.js';
import { Maybe } from './maybe.js';

//constants
const url = "https://images-api.nasa.gov/search?q=";

//pure functions that handles the DOM
export const getDOMElement = (dom, selector, prop) => prop ? dom.querySelector(selector)[prop] : dom.querySelector(selector);
export const renderToContainer = (container) => (element) => render(element, container);
export const renderToSearchContainer = R.compose(renderToContainer, getDOMElement)(document, '.search-container');
export const generateCardTemplate = (styles) => (info) => {
  return html`<div style=${styleMap(styles.card)}>
    <h2>${info.title}</h2>
    <div style=${styleMap(styles.info)}>
      <img style=${styleMap(styles.img)} src=${info.img}>
      <p>${info.description}</p>
    </div>
  </div>`
}

//pure functions that handle the request:
export const getData = planet  => () => fetch(url+planet);
export const getCollection = R.prop('collection');
export const getItems = R.prop('items');
export const getHrefFromElement0 = R.map(R.compose(R.prop('href'), R.prop('0')));
export const getImageFromItem = R.compose(getHrefFromElement0, Maybe.of);
export const processItem = item => ({ title: item.data[0].title, img: getImageFromItem(item.links).getValue(), description: item.data[0].description});
export const processInfo = R.pipe(getCollection, getItems, R.map(processItem));
export const processRes = R.compose(renderToSearchContainer, R.map(generateCardTemplate(styles)),processInfo);