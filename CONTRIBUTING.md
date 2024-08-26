## Adding Content to GitHub Pages

While the pages are set to private (as they are now), the Pages URL is generated randomly by GitHub. The domain will eventually be https://app-illinois.github.io when we set them to be publicly viewable. For now, it is https://vigilant-fishstick-2k4pppq.pages.github.io/.

All the pages are currently bare-bones sections with no styling.

You can find the index here:
https://vigilant-fishstick-2k4pppq.pages.github.io/

The components will be linked from this page. The first example can be found at the bottom:
https://vigilant-fishstick-2k4pppq.pages.github.io/Login-Button.html

The general guide for a component page can be found here:
https://vigilant-fishstick-2k4pppq.pages.github.io/item-template.html
Steps to set up a page for a component:

- Using the design provided in CodePen/FIGMA, create the .CSS (and any other necessary resource) files and place them into /applications/[component name].
- CSS classes should have the ‘ila-‘ prefix as we discussed.
- Use the component template HTML page as a rough guide to create an HTML page demonstrating your component.
- Use JS to mock up interactions that you need to demonstrate the component.
- Copy the HTML file into the /docs directory; a GitHub action is running with will move the .CSS and .JS files from the /applications/ directories into the css and js directories under /docs for these smaple pages, you no longer need to do this manually.
- Link to your new component's page from the index page.
