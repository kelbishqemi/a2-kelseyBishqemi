const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = [
  { "idea": "", "reason": "", "desire": "" }
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    const url = request.url;
    const newData = JSON.parse(dataString);

    //let url = request.url.slice( 1 );
    if(url == "/submit") {

    console.log( JSON.parse( dataString ) );

    appdata.push(newData);

    response.writeHead( 200, "OK", {"Content-Type": "application/json" });

    const safe = appdata.length - 1;
    newData.safe = safe;
    response.end(JSON.stringify(newData));
      
    } else if (url == "/update") {
      
      const updateData = JSON.parse(dataString)
      const safe = updateData.safe;

      if (Number.isInteger(safe) && appdata[safe]) {
        appdata[safe] = {
          idea: updateData.idea
        };
      }

      response.writeHead( 200, "OK", {"Content-Type": "application/json" });
      response.end(JSON.stringify(appdata[safe]));
    } else if (url == "/delete") {
      const safe = newData.safe;

      if (Number.isInteger(safe) && appdata[safe]) {
        appdata.splice(safe, 1);
      }

      response.writeHead( 200, "OK", {"Content-Type": "text/plain" });
      response.end(JSON.stringify(appdata[safe]));
    }

    
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
