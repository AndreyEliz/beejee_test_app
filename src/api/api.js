import 'whatwg-fetch'; // fetch polifill

/**
 * Authentication error
 */
export class AuthError extends Error {
    constructor(...props) {
        super(...props);
        this.name = 'AuthError';
    }
}

/**
 * Bad request error
 */
export class BadRequestError extends Error {
    constructor(...props) {
        super(...props);
        this.name = 'BadRequestError';
    }
}

/**
 * Not found error
 */
export class NotFoundError extends Error {
    constructor(...props) {
        super(...props);
        this.name = 'NotFoundError';
    }
}

/**
 * Error occured when all is ok and there is no errors,
 * response status is ok and response is readed well
 */
export class BeeJeeError extends Error {
    constructor(...props) {
        super(props);
        this.name = 'BeeJeeError';
    }
}

const throwNetworkError = (remoteError, response) => {
    if (response.status === 401) throw new AuthError(remoteError.message);
    if (response.status === 404) throw new NotFoundError(remoteError.message);
    if (response.status === 400) throw new BadRequestError(remoteError.message);
    else throw new Error(remoteError.message);
};

const handleErrors = (response) => {
    return response.ok ?
        Promise.resolve(response)
        :
        response.json().finally((e) => throwNetworkError(e, response))
};

const handleResponse = (response) => {
    return response.text().then((text) => {
        try {
            return JSON.parse(text);
        } catch (e) {
            return text ? text: {};
        }
    });
};

const fetchData = (url, options) => fetch(url, {...options})
        .then(handleErrors)
        .then(handleResponse)
        .then((response) => {
            //for sake of beejee way of error handling
            if (response.status === 'error') throw new BeeJeeError(JSON.stringify(response.message));
            return response;
        })
        .catch((e) => {
            throw e;
        });

const generateFormData = (obj) => {
    let formData = '';
    for (let key in obj ) {
        if (obj[key] || obj[key] === 0 || obj[key] === '') {
            // eslint-disable-next-line
            if (formData != '') {
                formData += '&';
            }
            if (obj[key] === '') formData += key;
            else formData += key + '=' + encodeURIComponent(obj[key]);
        }
    }
    return formData;
};


/**
 *  set token to storage
 */
export const setAuthData = (data) => {
    localStorage.setItem('accessToken', data.message.token);
};

const get = (url='', data={}, options={}) => {
    const requestData = generateFormData(data);
    const requestUrl = requestData ? `${url}?${requestData}` : url;
    const getData = () => fetchData(requestUrl, {
            method: 'GET',
            ...options
    });

    return getData();
};

const post = (url, data) => {
    const formData  = new FormData();
  
    for(const name in data) {
      formData.append(name, data[name]);
    }
  
    return fetchData(url, {
      method: 'POST',
      body: formData
    });
  }

export { 
    get,
    post,
};
