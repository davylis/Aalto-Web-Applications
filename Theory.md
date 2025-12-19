## Internet and client-server model
- The internet is a network of networks that use the TCP/IP protocol for communication. The core principle of the internet builds on the client-server model, where servers provide resources and services to clients
- From an application point of view, clients are typically dependent on the servers. Clients ask for services or resources from servers. On the other hand, while servers share their resources, clients do not.

## HyperText Transfer Protocol
- Communication over TCP/IP is done using HyperText Transfer Protocol (HTTP), which is at the core of (almost) all web applications. HTTP defines the structure of messages that are sent between the client and the server.
- HTTP is used with the request-response method, where a client is responsible for sending a request to the server, and the server is responsible for returning a response to the client.

## HTTP request structure
- The first row of an HTTP request contains a request method, an identifier of the requested resource, and an indicator of the HTTP protocol. The subsequent rows may contain additional header rows, where each row has one header-value pair.
- The resource identifier can be more complex, including a path, query parameters, and an anchor. The path is the part of the URI that comes after the domain name (e.g. /news/index.html). Query parameters come after a question mark and are used to provide additional information on what is being requested (e.g. /news/index.html?limit=10), and an anchor comes after a hash and is used to point to a specific part of a resource (e.g. /news/index.html#newest).
- However, due to the increased use of virtual servers, where multiple servers are hosted on the same physical server, the server address is needed. HTTP protocol versions since 1.1 have introduced a Host header that is included in the HTTP request and that has the server name. This way, even if an IP address has multiple servers, the specific server to which the request is meant for can be determined.

### Requests
- (HEAD) that is used for asking for the header information related to a resource, but not the resource itself, and 
- (OPTIONS) that is used for asking information about the possible options available regarding a request.
  
## HTTP response structure
- The first row of an HTTP response contains the HTTP-protocol version, a HTTP-status code, and a textual clarification of the status code.

## The most common status codes
- 1**: Information messages (e.g. 100 “Continue”)
- 2**: Succesful events (e.g. 200 “OK”)
- 3**: Additional actions required from the client (e.g. 301 “Moved Permanently”, which often is accompanied by a header that tells the new location, which the client then can retrieve)
- 4**: Error in the request or other issues (e.g. 401 “Not Authorized” and 404 “Not Found”)
- 5**: Error on the server e.g. 500 “Internal Server Error”)

## HTTP uses text-based communication
- Communication over the HTTP-protocol is text-based. This means that the messages are human-readable, and users with access to the network over which the messages are sent can study the messages.

## HTTP and retrieving a web page with a browser
- Retrieving a single web page might in reality consist of the browser making hundreds of requests, even though for the user it might seem that only a single address is visited.
- While interpreting the content, the browser also detects linked resources such as images, style files, and scripts. For each linked resource, the browser automatically makes a new request to the server.


