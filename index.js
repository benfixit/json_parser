function parser(jsonStr){
    // Undefined
    if(!jsonStr || jsonStr.length === 0){
        return undefined
    }

    const firstChar = jsonStr[0]

    // Null
    if(firstChar === 'n'){
        return null;
    }

    // String
    if(firstChar === '"'){
        return jsonStr
    }

    // Boolean
    if(firstChar === 't' || firstChar === 'f'){
        if(firstChar === 't'){
            return true
        }
        return false
    }

    // Number
    if(jsonStr.charCodeAt(0) > 48 && jsonStr.charCodeAt(0) < 57){
        return Number(jsonStr)
    }

    // Array
    if(firstChar === '['){

    }
}

console.log(parser(JSON.stringify(undefined)))
console.log(parser(JSON.stringify(null)))
console.log(parser(JSON.stringify('test')))
console.log(parser(JSON.stringify(7)))
console.log(parser(JSON.stringify(true)))
console.log(parser(JSON.stringify(false)))