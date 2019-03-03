const jsonServer  = require( 'json-server' );
const server      = jsonServer.create();
const router      = jsonServer.router( 'db.json' );
const middlewares = jsonServer.defaults();

router.render = (req, res) => {

  let headersToExpose       = [ 'Authorization' ];
  
  //res.header('X-Total-Count',30);
  //res.header( 'Access-Control-Expose-Headers','X-Total-Count');
  res.header('Content-Range','bytes : 0-9/*');
  res.header( 'Access-Control-Expose-Headers','Content-Range');
  
    
  let currentExposedHeaders = res.getHeader( 'Access-Control-Expose-Headers' );

  console.log(currentExposedHeaders);
  
  if ( currentExposedHeaders ) {
    res.header( 'Access-Control-Expose-Headers', headersToExpose.concat( currentExposedHeaders.split(',') ).join( ',' ) )
  } else {
    res.header( 'Access-Control-Expose-Headers', headersToExpose.join( ',' ) );
  }
  
  res.send(res.locals.data)
}

//default json-server middlewares
server.use( middlewares );

server.use( ( req, res, next ) => {
  //res.header( 'Authorization', 'Bearer 2ee636c8-06b6-474b-b562-f1cde69ea575' );
  next();
} );

server.use( router );

server.listen( 8080, () => {
  console.log( 'http://localhost:8080' );
} );