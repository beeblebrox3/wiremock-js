/**
 *
 * @param {Object} writer
 */
function Parser(writer) {
    this.writer = writer;
}

/**
 * @param {Array} routes
 */
Parser.prototype.parse = function (routes) {
    routes.map(route => {
        if (!route.hasOwnProperty("name")) {
            throw Error("Route must have name");
        }

        this.writer.write(route.name, this.parseRoute(route));
    });
}

Parser.prototype.parseRoute = function (route) {
    return JSON.stringify({
        request: this.parseRequest(route.request || {}),
        response: this.parseResponse(route.response || {})
    })
}

Parser.prototype.parseRequest = function (requestConfig) {
    let request = {};
    request.urlPath = requestConfig.path;
    request.method = requestConfig.method ? requestConfig.method.toUpperCase() : "GET";

    request = Object.assign(request, this.translateRequestRules(
        {"headers": "headers", "queryString": "queryParameters", "cookie": "cookies"},
        requestConfig
    ));

    request.bodyPatterns = [];
    if (requestConfig.hasOwnProperty("jsonBody")) {
        request.bodyPatterns.push({
            equalToJson: JSON.stringify(requestConfig.jsonBody)
        });
    }

    if (requestConfig.ignoreArrayOrder) {
        request.bodyPatterns.ignoreArrayOrder = true;
    }

    if (requestConfig.ignoreExtraElements) {
        request.bodyPatterns.ignoreExtraElements = true;
    }

    if (requestConfig['auth'] && Array.isArray(requestConfig['auth'])) {
        request.basicAuth = {
            "username": requestConfig.auth[0],
            "password": requestConfig.auth[1]
        };
    } else if (requestConfig.auth && requestConfig.auth.user && requestConfig.auth.pass) {
        request.basicAuth = {
            "username": requestConfig.auth.user,
            "password": requestConfig.auth.pass
        }
    }

    return request;
}

/**
 * @param {Object} dict
 * @param {Object} requestConfig
 */
Parser.prototype.translateRequestRules = function (dict, requestConfig) {
    const res = {};
    for (let key in dict) {
        let prop = dict[key];

        if (requestConfig.hasOwnProperty(key)) {
            res[prop] = {};

            for (let id in requestConfig[key]) {
                res[prop][id] = this.normalizeRule(requestConfig[key][id]);
            }
        }
    }
}

/**
 * @param {String|Object} value
 */
Parser.prototype.normalizeRule = function (value) {
    if (typeof value === "string" || !isNaN(value)) {
        return {
            equalTo: value
        };
    }

    if (value.hasOwnProperty("matches")) {
        return {
            matches: value
        };
    }

    throw Error("Impossible to parse rule");
}

Parser.prototype.parseResponse = function (responseConfig) {
    let response = {
        status: responseConfig.status ? parseInt(responseConfig.status, 10) : 200
    };

    if (responseConfig.jsonBody) {
        response.body = JSON.stringify(responseConfig.jsonBody);
    } else if (responseConfig.body) {
        response.body = responseConfig.body;
    }

    if (responseConfig.headers) {
        response = responseConfig.headers;
    }

    return response;
}

module.exports = Parser;
