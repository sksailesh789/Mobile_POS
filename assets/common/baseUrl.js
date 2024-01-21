import { Platform } from 'react-native'


let baseURL = '';
let imageURL = '';


// {Platform.OS == 'android'
// ? baseURL ='http://18.217.30.123:5005/api/'
// : baseURL = 'http://18.217.30.123:5005/api/'
// }

// {Platform.OS == 'android'
// ? imageURL ='http://18.217.30.123:5005/'
// : imageURL = 'http://18.217.30.123:5005/'
// }

{Platform.OS == 'android'
? baseURL ='http://18.118.135.79:5005/api/'
: baseURL = 'http://18.118.135.79:5005/api/'
}

{Platform.OS == 'android'
? imageURL ='http://18.118.135.79:5005/'
: imageURL = 'http://18.118.135.79:5005/'
}
export default baseURL;
export {imageURL}

