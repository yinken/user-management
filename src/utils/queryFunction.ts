/* eslint-disable @typescript-eslint/no-explicit-any */

export enum CONTENT_TYPES {
  JSON = 'application/json',
  FORMDATA = 'multipart/form-data',
  URLENCODED = 'application/x-www-form-urlencoded; charset=UTF-8',
}

export enum HTTP_STATUS_CODES {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string | FormData;
  signal?: AbortSignal;
  credentials?: 'omit' | 'same-origin' | 'include';
  contentType?: CONTENT_TYPES;
};

type QueryParams = {
  callback?: (data: any) => any;
  url: string;
  body?: any;
  options?: FetchOptions;
  searchParams?: Record<string, string | string>;
  initialData?: any;
};

type PostParams = {
  url: string;
  data: any;
  callback?: (data: any) => any;
};

export const apiQuery = async (params: QueryParams) => {
  const { callback, url, options = {}, searchParams, body } = params;
  const queryParams = new URLSearchParams(searchParams);
  const method = options?.method || 'GET';

  if (body && ['POST', 'PUT'].includes(method)) {
    options.headers = {
      ...options.headers,
      'Content-Type': options.contentType || CONTENT_TYPES.JSON,
    };

    if (options.contentType === CONTENT_TYPES.FORMDATA) {
      options.credentials = options?.credentials || 'include';
      delete options.headers['Content-Type'];
      options.body = body as FormData;
    } else if (options.contentType === CONTENT_TYPES.URLENCODED) {
      options.body = queryParams.toString();
    } else {
      options.body = JSON.stringify(body);
    }
  }

  let requestUrl = url;
  if (searchParams) {
    requestUrl = `${url}?${queryParams.toString()}`;
  }

  if (callback) {
    return await fetch(requestUrl, options)
      .then((res) => {
        if (HTTP_STATUS_CODES.OK === res.status) {
          return res.json();
        } else if (HTTP_STATUS_CODES.NO_CONTENT) {
          return 'NO_CONTENT';
        }
      })
      .then(callback)
      .catch((err) => {
        console.error(err.names);
      });
  } else {
    return await fetch(requestUrl, options)
      .then((res) => {
        if (HTTP_STATUS_CODES.OK === res.status) {
          return res.json();
        } else if (HTTP_STATUS_CODES.NO_CONTENT) {
          return 'NO_CONTENT';
        }
      })
      .catch((err) => {
        console.error(err.name);
      });
  }
};

export const postRequest = <T>(params: PostParams): Promise<T> => {
  const { callback, url, data } = params;
  const body = JSON.stringify(data);

  if (!body.length) {
    return Promise.reject();
  }

  if (callback) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((res) => res.json())
      .then(callback);
  } else {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .catch(() => {
        // ignore empty response
      });
  }
};

export const putRequest = (params: PostParams) => {
  const { callback, url, data } = params;
  const body = JSON.stringify(data);

  if (!body.length) {
    return;
  }

  if (callback) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((res) => res.json())
      .then(callback);
  } else {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .catch(() => {
        // ignore empty response
      });
  }
};
