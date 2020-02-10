import { 
    getDOMElement, 
    renderToContainer, 
    renderToSearchContainer, 
    generateCardTemplate,
    getData,
    getCollection,
    getItems,
    getHrefFromElement0,
    getImageFromItem,
    processItem,
    processInfo,
    processRes
  } from '../src/intentions.js';
  import { styles } from '../src/styles.js';
  import { Maybe } from '../src/maybe.js';

describe('unitary tests for functional programming', () => {
    const assert =chai.assert;
    const fakeDOM = (nodes) => ({
        nodes,
        querySelector: (node) => nodes[node],
    })
    it('getDOMElement should return the element from the DOM if it exits', () => {
        const DOM = fakeDOM({ input: { value: 'pluto' }});
        const inputValue = getDOMElement(DOM, 'input', 'value');
        assert.equal(inputValue, 'pluto')
    });
    it('rendertoContainer should return a function of just one parameter', () => {
        const container = fakeDOM({ div: {}});
        const functionRender = renderToContainer(container);
        assert.include(functionRender.toString(),'render');
    });
    it('renderToSearchContainer should ', () => {
        //Esto depende del document, ¡Habría que hacer un refactor!
    });
    it('generateCardTemplate, should return an html object with 6 values from outside', () => {
        const info = {
            title: 'The moon',
            description: 'The satellite',
        }
        const card = generateCardTemplate(styles)(info);
        assert.equal(typeof card, 'object');
        assert.equal(card.values.length, 6);
        assert.equal(card.type, 'html');
    });
    it('getData returns a function with no name and no arguments', () =>{
      const planet = 'earth';
      const fetchFunc = getData(planet);
      assert.equal(typeof fetchFunc, 'function');
      assert.equal(fetchFunc.name, '');
      assert.equal(fetchFunc.length, 0);
    });
    it('getCollections should return colection from data', () => {
        const collection = ['1', '2', '3', '4'];
        const fakeRes = {
            collection,
        }
        assert.deepEqual(getCollection(fakeRes), collection);
    });
    it('geItems should return prop item from an object', () => {
        const items = ['1', '2', '3', '4'];
        const fakeCollection = {
            items
        }
        assert.deepEqual(getItems(fakeCollection), items);
    });
    it('getHrefFromElement0, should return image url from elemet indexed to 0 inside an array', () => {
        const href = '../icons/txomski.jpg'
        const array = Maybe.of([
            {
                href,
            }
        ]);
        assert.deepEqual(getHrefFromElement0(array), Maybe.of(href));
    });
    it('getImageFromItem', () => {
        const href = '../icons/txomski.jpg'
        const array = [
            {
                href,
            }
        ];
        assert.deepEqual(getImageFromItem(array), Maybe.of(href));
    });
    it('processItem', () => {
        const title = 'Moon image';
        const description = 'This is an image of the moon';
        const link = './fake.jpg'
        const item = {
            data: [{
                title,
                description
            }],
            links: [{
                href: link
            }]
        };
        const processedItem = {
            title,
            img: link,
            description
        }
        assert.deepEqual(processItem(item), processedItem);
    });
    it('processInfo', () => {
        
    });
    it('processRes', () => {
        
    });
})