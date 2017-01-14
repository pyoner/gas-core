export default function promiseMiddleware(type) {
    return (next) => (...args) => {
        let result = next(...args);
        if (result instanceof Promise) {
            let value = null;
            let obj = {
                valueOf() {
                    return value;
                }
            }
            result.then((v) => value = v);
            return obj;
        }
        return result;
    }
}
