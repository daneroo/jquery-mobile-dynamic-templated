# Replacing jQuery-mobile content

See the [demo](http://daneroo.github.com/jquery-mobile-dynamic-templated).

Replacing jQuery-mobile content, after initialization requires some care.
As the pages need to be enhanced. So partially updating thir content requires
enhancing som parts of the content (such as listviews) as is explained here in the jQuery mobile docs:

  [http://code.jquery.com/mobile/latest/demos/docs/pages/page-dynamic.html](http://code.jquery.com/mobile/latest/demos/docs/pages/page-dynamic.html)  
  [http://code.jquery.com/mobile/latest/demos/docs/pages/dynamic-samples/sample-reuse-page.html](http://code.jquery.com/mobile/latest/demos/docs/pages/dynamic-samples/sample-reuse-page.html)

In the context where I needed to do this the pages are actually generated from templates, where the unit of work is the _page_.

This requires a bit of care when we wish to regenrate the currently active page: `$.mobile.activePage`

## Steps

See the [code app.js::replacePage()](app.js) for details.

If the page we are replacing is not active, we may simply:

 * remove the old page DOM element
 * replace the new one in the DOM.
 
If the the current page is active (being viewed), we must allow for it to coexist in the dom with the new version.
 
 * update the id and data-url of the active page
 * insert the new version in the DOM
 * invoke changePage (transition:none) to view the new version
 * remove the old page DOM element
