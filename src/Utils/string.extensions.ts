function interpolate(this: any, params: {}) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    // eslint-disable-next-line no-new-func
    return new Function(...names, `return \`${this}\`;`)(...vals);
}

// eslint-disable-next-line no-extend-native
String.prototype.interpolate = interpolate;

export {};
