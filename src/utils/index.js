/* eslint-disable */

// for backend
export const backendUrl = 
  process.env.NODE_ENV == 'production'
    ? 'https://jsonplaceholder.typicode.com/users'
    // ? 'CHANGE_ME/find/'
    : 'https://jsonplaceholder.typicode.com/users'
    // : 'http://127.0.0.1:5000/find'