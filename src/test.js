const {
  storeTx
 } = require('./createTransactions')
 
const {
  postToValidator,
  processFile
} = require('./postToServer')

var data = processFile('batchList0.txt');
var count = 0;
var url = 'http://139.162.47.17:8008/batches'

function autoTest(txPerSec, timePerTest, timeout) {
    stop = setInterval(
      function () {
        let limit = count + txPerSec;
        while (count < limit) {
            postToValidator(data[count], url);
        }
      }, timePerTest
    )
    
    setTimeout(()=>{
      clearInterval(stop);
    }, timeout)
}
  
autoTest(+process.argv[2], +process.argv[3], +process.argv[4])
