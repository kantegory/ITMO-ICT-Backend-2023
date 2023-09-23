/**
 * The `PathUtils` class provides utility methods for printing and splitting route paths.
 */
class PathUtils {
    /**
     * Recursively prints the route paths of Express application routes.
     * @param path - The current path segments.
     * @param layer - The Express route layer being processed.
     */
    static print(path: any, layer: any) {
        if (layer.route) {
            layer.route.stack.forEach(PathUtils.print.bind(null, path.concat(PathUtils.split(layer.route.path))));
        } else if (layer.name === 'router' && layer.handle.stack) {
            layer.handle.stack.forEach(PathUtils.print.bind(null, path.concat(PathUtils.split(layer.regexp))));
        } else if (layer.method) {
            console.log('%s /%s',
                layer.method.toUpperCase(),
                path.concat(PathUtils.split(layer.regexp)).filter(Boolean).join('/'));
        }
    }

    /**
     * Splits a route path into individual segments.
     * @param thing - The route path to split.
     * @returns An array of route path segments.
     */
    static split(thing: any) {
        if (typeof thing === 'string') {
            return thing.split('/');
        } else if (thing.fast_slash) {
            return '';
        } else {
            var match = thing.toString()
                .replace('\\/?', '')
                .replace('(?=\\/|$)', '$')
                .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
            return match
                ? match[1].replace(/\\(.)/g, '$1').split('/')
                : '<complex:' + thing.toString() + '>';
        }
    }
}

export default PathUtils;
