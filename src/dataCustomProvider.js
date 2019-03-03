import { stringify } from 'query-string';
import {
	fetchUtils,
	GET_LIST,
	GET_ONE,
	GET_MANY,
	GET_MANY_REFERENCE,
	CREATE,
	UPDATE,
	UPDATE_MANY,
	DELETE,
	DELETE_MANY
} from 'react-admin';
import config from './config';

const { host } = config;
const apiUrl = host;

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The data request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const defaultConvertDataRequestToHTTP = (type, resource, params) => {
	let url = '';
	const options = {};
	switch (type) {
		case GET_LIST: {
			const { page, perPage } = params.pagination;
			const { field, order } = params.sort;
			const query = {
				...fetchUtils.flattenObject(params.filter),
				_sort: field,
				_order: order,
				_start: (page - 1) * perPage,
				_end: page * perPage
			};
			url = `${apiUrl}/${resource}?${stringify(query)}`;
			break;
		}
		case GET_ONE:
			url = `${apiUrl}/${resource}/${params.id}`;
			break;
		case GET_MANY_REFERENCE: {
			const { page, perPage } = params.pagination;
			const { field, order } = params.sort;
			const query = {
				...fetchUtils.flattenObject(params.filter),
				[params.target]: params.id,
				_sort: field,
				_order: order,
				_start: (page - 1) * perPage,
				_end: page * perPage
			};
			url = `${apiUrl}/${resource}?${stringify(query)}`;
			break;
		}
		case UPDATE:
			url = `${apiUrl}/${resource}/${params.id}`;
			options.method = 'PUT';
			options.body = JSON.stringify(params.data);
			break;
		case CREATE:
			url = `${apiUrl}/${resource}`;
			options.method = 'POST';
			options.body = JSON.stringify(params.data);
			break;
		case DELETE:
			url = `${apiUrl}/${resource}/${params.id}`;
			options.method = 'DELETE';
			break;
		case GET_MANY: {
			const query = {
				[`id_like`]: params.ids.join('|')
			};
			url = `${apiUrl}/${resource}?${stringify(query)}`;
			break;
		}
		default:
			throw new Error(`Unsupported fetch action type ${type}`);
	}
	return { url, options };
};

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The data request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const customConvertDataRequestToHTTP = (type, resource, params) => {
	let url = '';
	const options = {};
	switch (type) {
		case GET_LIST: {
			const { page, perPage } = params.pagination;
			const { field, order } = params.sort;
			const query = {
				...fetchUtils.flattenObject(params.filter),
				_sort: field,
				_order: order,
				_start: (page - 1) * perPage,
				_end: page * perPage
			};
			url = `${apiUrl}/${resource}?${stringify(query)}`;
			break;
		}
		case GET_ONE:
			url = `${apiUrl}/${resource}/${params.id}`;
			break;
		case GET_MANY: {
			const query = {
				[`id_like`]: params.ids.join('|')
			};
			url = `${apiUrl}/${resource}?${stringify(query)}`;
			break;
		}
		case GET_MANY_REFERENCE: {
			const { page, perPage } = params.pagination;
			const { field, order } = params.sort;
			const query = {
				...fetchUtils.flattenObject(params.filter),
				[params.target]: params.id,
				_sort: field,
				_order: order,
				_start: (page - 1) * perPage,
				_end: page * perPage
			};
			url = `${apiUrl}/${resource}?${stringify(query)}`;
			break;
		}
		case CREATE:
			url = `${apiUrl}/${resource}`;
			options.method = 'POST';
			options.body = JSON.stringify(params.data);
			break;
		case UPDATE:
			url = `${apiUrl}/${resource}/${params.id}`;
			options.method = 'PUT';
			options.body = JSON.stringify(params.data);
			break;
		case UPDATE_MANY: {
			const query = {
				filter: JSON.stringify({ id: params.ids })
			};
			url = `${apiUrl}/${resource}?${stringify(query)}`;
			options.method = 'PATCH';
			options.body = JSON.stringify(params.data);
			break;
		}
		case DELETE:
			url = `${apiUrl}/${resource}/${params.id}`;
			options.method = 'DELETE';
			break;
		case DELETE_MANY: {
			const query = {
				filter: JSON.stringify({ id: params.ids })
			};
			url = `${apiUrl}/${resource}?${stringify(query)}`;
			options.method = 'DELETE';
			break;
		}
		default:
			throw new Error(`Unsupported fetch action type ${type}`);
	}
	return { url, options };
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The data request params, depending on the type
 * @returns {Object} Data response
 */
const defaultConvertHTTPResponse = (response, type, resource, params) => {
	const { headers, json } = response;
	switch (type) {
		case GET_LIST:
		case GET_MANY_REFERENCE:
			if (!headers.has('x-total-count')) {
				throw new Error(
					'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
				);
			}
			return {
				data: json,
				total: parseInt(
					headers
						.get('x-total-count')
						.split('/')
						.pop(),
					10
				)
			};
		case CREATE:
			return { data: { ...params.data, id: json.id } };
		default:
			return { data: json };
	}
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The data request params, depending on the type
 * @returns {Object} Data response
 */
const customConvertHTTPResponse = (response, type, resource, params) => {
	const { headers, json } = response;
	switch (type) {
		case GET_LIST:
		case GET_MANY_REFERENCE:
			if (!headers.has('x-total-count')) {
				throw new Error(
					'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
				);
			}
			return {
				data: json,
				total: parseInt(
					headers
						.get('x-total-count')
						.split('/')
						.pop(),
					10
				)
			};
		case CREATE:
			return { data: { ...params.data, id: json.id } };
		default:
			return { data: json };
	}
};

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export const defaultDataProvider = (type, resource, params) => {
	const { url, options } = defaultConvertDataRequestToHTTP(type, resource, params);
	const httpClient = fetchUtils.fetchJson;
	return httpClient(url, options).then(response =>
		defaultConvertHTTPResponse(response, type, resource, params)
	);
};

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export const customDataProvider = (type, resource, params) => {
	const { url, options } = customConvertDataRequestToHTTP(type, resource, params);
	let headers;
	return fetch(url, options)
		.then(res => {
			headers = res.headers;
			return res.json();
		})
		.then(json => {
			const response = {
				headers: headers,
				json: json
			};

			return customConvertHTTPResponse(response, type, resource, params);
		});
};
