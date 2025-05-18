// ____ ____ ____ ____ ____ ____ ____ 
// ||A |||n |||t |||o |||C |||i |||c ||
// ||__|||__|||__|||__|||__|||__|||__||

import { log } from "./logger";

// |/__\|/__\|/__\|/__\|/__\|/__\|/__\|

export function getFunctionToResolve(event, _routes, pathParams, oldDefaultFunction = undefined, pathIndex = 0) {
    if (_routes !== undefined) {
        const routToCheck = _routes[pathParams?.[pathIndex]];
        if (routToCheck) {
            switch (typeof routToCheck) {
                case 'function':
                    return { functionToResolve: routToCheck, routerEntry: pathParams?.[pathIndex] };

                case 'object':
                    const currentFunction = routToCheck?.['']
                    return getFunctionToResolve(event, routToCheck, pathParams, currentFunction, pathIndex + 1);

                case 'boolean':
                case 'string':
                case 'number':
                    return { functionToResolve: () => routToCheck };

                default:
                    return 'Rout dichiarata male.';
            }
        } else {
            if (pathIndex === 1) {
                oldDefaultFunction = _routes?.['']
            }
            if (oldDefaultFunction !== undefined || _routes[pathParams?.[pathIndex - 1]]) {
                switch (typeof oldDefaultFunction) {
                    case 'function':
                        return {
                            functionToResolve: oldDefaultFunction,
                            routerEntry: pathParams?.[pathIndex] === 'user' && pathParams?.[pathIndex + 2] === 'personalInfo' ? 'personalInfo' : undefined
                        };

                    case 'boolean':
                    case 'string':
                    case 'number':
                        return { functionToResolve: () => oldDefaultFunction };
                    default:
                        return 'Rout dichiarata male.';
                }
            }
            return 'Route not found';
        }
    } else {
        return 'Route not found';
    }
}
