### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Callbacks, Promises, Async/Await 
- What is a Promise?
 Methods to handle success, error, and cleanup.

- What are the differences between an async function and a regular function?
  they behavire diffrent. Regular funtctionretunrs the specified value as is with no promise wrapping. While async function retunrs a promsise no mattter returnes into the function.
- What is the difference between Node.js and Express.js?

Express is built ontop of node.js and provides tools and utilits for creating web servers and handles the HTTP request and responses. 

node.js is actually the server side of thinngs not just browsers. Node.js provides the foundation needed fro building server-side applications.

- What is the error-first callback pattern?

handles async operations and errors.Reservcing the first argument for an error and teh remaning arguments to provided resutls of the operation success...

- What is middleware? Multiple functions, req, res, next. Used in the request-response cycle. These function can perfom task like modifiying requeisting, handling resp and managing errors. 

- What does the `next` function do? passes control from one middleware function to the next middleware in the stack. it allows the request -response cycle to move forward, letting each middleware function to modify the req,resp, objects as needed.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

instead of using await $.getJSON is making it all individual, faster solution Promise.all().

I also noticed the array return is not in the same order as the function execution.

also not error handling so probably add something that is gonna benefit the after math to help target and save time on debugging.



```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
