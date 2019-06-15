export const HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*'
};


export const MEDIA = {
  DESKTOP: window.matchMedia('screen and (min-width: 1025px)').matches,
  MOBILE: window.matchMedia('screen and (max-width: 767px)').matches,
  TABLET: window.matchMedia('screen and (min-width: 768px) and (max-width: 1024px)').matches
};


export const {
  api: {
    root: API_ROOT = '/api/',
    routes: {
      test: API_ROUTES_TEST = '/test',
    } = {}
  } = {},
} = window.config || {};
