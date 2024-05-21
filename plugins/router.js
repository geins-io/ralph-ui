// This file is used to modify the routes with the nuxtjs/router module
import Vue from 'vue';
import Router from 'vue-router';

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
  const newRoutes = defaultRoutes;

  newRoutes.map((route) => {
    if (route.path.includes('/:market?')) {
      return false;
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

  return newRoutes;
}
