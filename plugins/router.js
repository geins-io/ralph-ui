// This file is used to modify the routes with the nuxtjs/router module
import Vue from 'vue';
import Router from 'vue-router';

import FrontPage from '~/pages/start/index.vue';
import StartPage from '~/pages/index.vue';

Vue.use(Router);

export function createRouter(
  ssrContext,
  createDefaultRouter,
  routerOptions,
  config,
) {
  const defaultOptions =
    routerOptions || createDefaultRouter(ssrContext, config).options;

  const newRouterOptions = {
    ...defaultOptions,
    routes: fixRoutes(defaultOptions.routes, config),
  };

  return new Router(newRouterOptions);
}

// Modify routes
function fixRoutes(defaultRoutes, config) {
  // Remove start page from routes, since we only want ot use modifed start page
  const newRoutes = defaultRoutes.filter((route) => {
    return !route.name.includes('start');
  });

  newRoutes.map((route) => {
    if (route.path.includes('/:market?')) {
      return false;
    }
    // Change start page conmponent to front page
    if (route.name.includes('index')) {
      route.component = FrontPage;
    }

    // Add dynamic param :market param to all routes
    if (config.marketInPath) {
      const path = route.path === '/' ? '' : route.path;
      route.path = '/:market?' + path;
      if (!config.isMultiLanguage && route.name.includes('index')) {
        route.path = '/:market';
      }
    }

    return route;
  });

  if (config.marketInPath || config.isMultiLanguage) {
    newRoutes.push({
      path: '/',
      component: StartPage,
      name: 'start',
    });
  }

  return newRoutes;
}
