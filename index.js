const fs = require('fs');
console.log('starting lazyloadplay');
const content = fs.readFileSync('lazy-routes.json');
const jsonContent = JSON.parse(content);
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'bundleId', type: Number, multiple: true, defaultOption: true }
];

const options = commandLineArgs(optionDefinitions);

console.log('options', options);

const lazyBundles = jsonContent.routes;
const BUNDLE_ID = 49;
const getBundleInfo = bundleId => {
  return lazyBundles.filter(lazyBundle => {
    return Object.keys(lazyBundle.chunks).some(id => id == bundleId);
  });
};

options.bundleId.forEach(id => {
  console.log('bundleInfo. for: ', id, getBundleInfo(id)
    .map(bundle => bundle.module));
});