'use strict'

// JQuery

@@include('../../node_modules/jquery/dist/jquery.min.js')

// Slick slider

@@include('../../node_modules/slick-carousel/slick/slick.min.js')

// JS function to test webp support

// include('files/webp-test.js', {})

// Dynamic Adapt (https://www.youtube.com/watch?v=QKuMr575vlQ)

// include('libs/dynamic_adapt/da.js', {})

// Focus-visible (https://www.npmjs.com/package/focus-visible)

@@include('../../node_modules/focus-visible/dist/focus-visible.min.js', {})

// Blocking-elements (https://github.com/PolymerLabs/blocking-elements)

@@include('../../node_modules/babel-polyfill/dist/polyfill.min.js', {})
@@include('../../node_modules/wicg-inert/dist/inert.min.js', {})
@@include('../../node_modules/blocking-elements/dist/blocking-elements.min.js', {})

// Other scripts

@@include('files/script.js', {})