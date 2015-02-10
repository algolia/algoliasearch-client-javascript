module.exports = createTestFunction;

function createTestFunction( shouldBeCalled, times ){
  if( times > 0 && !shouldBeCalled )
    console.log( "WARNING : Trying to test if it should not be called with times > 0",
                 ( new Error() ).stack );

  var numberOfCalls = 0;

  var f = function testFunction(){
    numberOfCalls++; 
  };

  f.hasBeenCalled = function hasBeenCalled(){ return numberOfCalls > 0; };
  f.numberOfCalls = function numberOfCalls(){ return numberOfCalls; };
  f.test          = function testFunctionCall( t ){ 
    if( shouldBeCalled ) {
      if( times > 0 ) {
        t.equal( numberOfCalls, times, "The function should have been called " +
                                        times + " times, and was called " +
                                        numberOfCalls + " times.");
      }
      else {
        t.equal( numberOfCalls > 0, true, "The function should have been called at least once, " + 
                                          "and was called " + numberOfCalls + " times." );
      }
    }
    else {
      t.equal( numberOfCalls === 0, true, "The function should not have been called, "+
                                          "and was called " + numberOfCalls + " times.");
    }
  }
  
  return f;
}
