const fs = require('fs');
const content = fs.readFileSync('lazy-routes.json');
const jsonContent = JSON.parse(content);
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'bundleId', type: Number, multiple: true, defaultOption: true }
];

const options = commandLineArgs(optionDefinitions);

const lazyBundles = jsonContent.routes;

const getMatchingBundles = ids => {
  return lazyBundles.filter(lazyBundle => {
    return ids.every(id => Object.keys(lazyBundle.chunks).some(chunkId => chunkId == id));
  })
};

const matchingBundles = getMatchingBundles(options.bundleId);

console.log('matching bundles:');
matchingBundles.forEach(bundle => {
  console.log(bundle.module);
});