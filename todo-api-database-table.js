//importing postgres library
import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js"

//initializing db connection
const sql = postgres({});

//root route handler
const handleGetRoot = async (request) => {
    return new Response("Hello world at root!");
  };
  
//fetch all todos
const handleGetTodos = async (request) => {
        const todos = await sql`SELECT * FROM todos`;
        return Response.json(todos);
  };

//fetch a single todo by its ID
const handleGetTodo = async (request, urlPatternResult) => {
    const id = urlPatternResult.pathname.groups.id;
        const todos = await sql`SELECT * FROM todos WHERE id = ${id}`;
        if (todos.length === 0){
            return new Response("Todo not found", { status: 404 });
        }
    //The postgres.js library returns the result of a query as an array of rows. 
    // Even if the query matches only one row, the result will still be wrapped in an array. 
    //assuming that there's always that matches the id.
        return Response.json(todos[0]);
  };
  
//add a new todo to the db
const handlePostTodo = async (request) => {
    let todo;
    //if not json
    try {
        todo = await request.json();  //parse the incoming JSON
    } catch (error) {
        //if the JSON parsing fails, return a 400 response
        return new Response("Invalid JSON format", { status: 400 });
    }

    //validate that 'todo' is an object and has the 'item' field
    if (!todo || typeof todo !== "object" || !todo.hasOwnProperty('item')) {
        return new Response("Invalid 'item' field", { status: 400 });
    }

    //check if 'item' exists and is a non-empty string
    if (typeof todo.item !== "string" || todo.item.trim() === "") {
        return new Response("Invalid 'item' field", { status: 400 });
    }

    //insert the new todo into the database
    await sql`INSERT INTO todos (item) VALUES (${todo.item})`;

    //return a 200 status for success
    return new Response("OK", { status: 200 });
};

//define the routing logic
const handleRequest = async (request) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method;
  
    const routes = [
      { method: "GET", path: "/", handler: handleGetRoot },
      { method: "GET", path: "/todos", handler: handleGetTodos },
      { method: "GET", path: "/todos/:id", handler: handleGetTodo },
      { method: "POST", path: "/todos", handler: handlePostTodo },
    ];
  
    // Match request to a route
    for (const route of routes) {
      const urlPattern = new URLPattern({ pathname: route.path });
      const match = urlPattern.exec(url);
      if (match && method === route.method) {
        return route.handler(request, match);
      }
    }
  
    //default response for unmatched routes
    return new Response("Not Found", { status: 404 });
  };
  

Deno.serve({ port: 7777 }, handleRequest);
