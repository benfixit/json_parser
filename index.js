function parser(jsonStr){
    // Undefined
    if(!jsonStr || jsonStr.length === 0){
        return undefined;
    }

    const firstChar = jsonStr[0];

    // Null
    if(firstChar === 'n'){
        return null;
    }

    // String
    if(firstChar === '"'){
        return jsonStr.slice(1, jsonStr.length - 1);
    }

    // Boolean
    if(firstChar === 't' || firstChar === 'f'){
        if(firstChar === 't'){
            return true;
        }
        return false;
    }

    // Number
    if(jsonStr.charCodeAt(0) > 48 && jsonStr.charCodeAt(0) < 57){
        return Number(jsonStr);
    }

    // Array
    if(firstChar === '['){
        return parseArray(jsonStr.slice(1, jsonStr.length - 1));
    }
}

function peek(stack){
    return stack[stack.length - 1]
}

function parseArray(jsonStr){
    let result = [], stack = [], len = jsonStr.length, start = 0;

    for(let i = 0; i <= len; i++){
        if(
            (jsonStr[i] === '"' && peek(stack) === '"') || 
            (jsonStr[i] === ']' && peek(stack) === '[')
        ){
            stack.pop();
        }else if(
            jsonStr[i] === '"' || 
            (!stack.length && peek(stack) === '[')
        ){
            stack.push(jsonStr[i])
        }
        
        if(!stack.length && (jsonStr[i] === ',' || i === len)){
            result.push(parser(jsonStr.slice(start, i)));
            start = i + 1;
        }
    }

    return result
}

console.log(parser(JSON.stringify([[[]]])))
console.log(parser(JSON.stringify(['test', 5, true])))

console.log(parser(JSON.stringify(['a', 'bc'])))
console.log(parser(JSON.stringify(['[],'])))

console.log(parser(JSON.stringify(undefined)))
console.log(parser(JSON.stringify(null)))
console.log(parser(JSON.stringify('test')))
console.log(parser(JSON.stringify(7)))
console.log(parser(JSON.stringify(true)))
console.log(parser(JSON.stringify(false)))