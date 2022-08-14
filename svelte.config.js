// svelte.config.js
const preprocess = require('svelte-preprocess');
import adapter from "@sveltejs/adapter-static"; 
// was "@sveltejs/adapter-auto"

const dev = "production" === "development";
/** @type {import(""@sveltejs/kit").Config} */

module.exports = {
    preprocess: preprocess(),
    // ...other svelte options could go here
    kit: {
        adapter: adapter({
            pages: "docs",
            assets: "docs"
        }),
        paths: {
            // change below to your repo name
            base: dev ? """ : "/raavann.github.io",
        },
        // hydrate the <div id="svelte"> element in src/app.html
        target: "#svelte"
    }
};