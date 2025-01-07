/*
Here, your task is to create a simple Todo JSON API that uses a list for storing todo items. The application should have the following endpoints:

    GET /todos returns the list of todos as a JSON formatted string.
    POST /todos adds a new todo to the list of todos and returns a response with status code 200. If the request is incorrectly formed (e.g. it does not contain JSON), the server should respond with the status code 400 and nothing should be added to the list.

You may use the the following structure for individual todos: {item: "name"}. The list of todos should be a list consisting of such todos, i.e. [{item: "name"},{item: "another"}]. The server should launch at the port 7777.
*/

const todos = []; 

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  
  if (path === "/todos" && request.method === "GET") {
    return handleGetItems(request); //return the list of todos
  }

  if (path === "/todos" && request.method === "POST") {
    return handlePostItems(request); //add a new todo
  }

  return new Response("Not Found", { status: 404 });
};

//handle GET /todos
const handleGetItems = async (request) => {
  return Response.json(todos);
};

//handle POST /todos
const handlePostItems = async (request) => {
  try {
    const todo = await request.json();
    todos.push(todo);
    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Bad Request", { status: 400 });
  }
};

//start the server
Deno.serve({ port: 7777 }, handleRequest);