const cspParserToObjectFn = policy =>
    policy.split(';').reduce((result, directive) => {
        const [directiveKey, ...directiveValue] = directive.trim().split(/\s+/g);

        if (directiveKey && !Object.prototype.hasOwnProperty.call(result, directiveKey)) {
            result[directiveKey] = directiveValue;
        }

        return result;
    }, {});
const cspParserToStringFn = policyObject =>
    Object.entries(policyObject).map(([k, v]) => `${k}${v.length > 0 ? ' ' : ''}${v.join(' ')}`).join('; ');

export {cspParserToObjectFn, cspParserToStringFn};
