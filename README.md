# Vuetify-tab-issue

This project reproduces an issue with using v-router in combination with v-tabs. Opened tabs get mounted multiple times in some cases.

## How to start the application

```
npm i
npm run start
```

Go to page localhost:5173

## Structure

The project consists of a tab handler directly in the App.vue file. The handler manages the tabs, one of which is the "Home" tab, corresponding to the "/" route. It is possible to open 2 additional tabs using the buttons provided by the Home tab or by manually setting the url to "localhost:5173/detail/:id". These additional tabs are detail tabs,
corresponding to the routes "/detail/:id". The tab urls are managed and stored within the pinia tab-store. When changing tabs, the components should not get remounted after they have been initially mounted.

A new tab gets opened, when the url is changed, this is handled by the router and can be seen in index.ts ln. 24. As such it is possible to add a new tab and navigate to it by manually typing in an url, e.g. "localhost:5173/detail/1"

## How to reproduce "Homeview gets mounted multiple times"

1. Open the application to the home view with no additional tabs & open developer tools console
2. You will see in the console, that the onMounted function for the
   Home component gets called.
3. Press one of the "Go to Detail View" button once. A new tab will open

### Expected Behaviour:

The Tab gets opened with no onMounted call for the Home Component, since keep-alive was used in the Tab Handler and it has been mounted already in step 2.

### Actual Behaviour:

You will see printed in the console, that the onMounted function for the Home component gets called again.

## How to reproduce "DetailView gets mounted multiple times"

Note that this will ONLY happen if it is the first tab to be opened by a button or when opening a tab by manually typing in the url! All subsequent opened tabs work fine.

1. Open the application to the home view with no additional tabs & open developer tools console
2. Press one of the "Go to Detail View" buttons once. A new tab will open

### Expected Behaviour:

The Detail Component is displayed and the component is mounted exactly once.

### Actual Behaviour:

The Detail Component is displayed and the component is mounted twice, as
can be seen printed in the console.
