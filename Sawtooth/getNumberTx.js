// npm install --save async
// created by phukq

var request = require('request')
var async = require('async')


function getBlock(url, blockhash, cb) {
    url = url + '/blocks/' + blockhash
    request.get(url, function (err, response, body) {
        if (response.body) {
            return cb(null, JSON.parse(response.body))
        }
        cb(err, response)
    })

}


var url = 'http://localhost:8008'
var stopBlockNumber = 491
var blockNumber = stopBlockNumber + 1
var latestBlockHash = '3a2ab5cba83dce1c8f901104a31a5c6440f34019c03fa17a0b22d2233440b59f3b7b2e83684fccc280242b30c5fec1317cb17563e5fdd7d2bb915d7c6f4e2676'
var totalTx = 0
var totalBlock = 0;
async.whilst(
    () => {
        return blockNumber > stopBlockNumber
    },
    (next) => {
        getBlock(url, latestBlockHash, (err, rs) => {
            if (err) {
                console.log(err);
                return next(err)
            }

            if (rs.error) {
                return next(rs)
            }
            console.log(blockNumber);

            blockNumber = 1 * rs.data.header.block_num;
            latestBlockHash = rs.data.header.previous_block_id;
            totalTx += rs.data.batches.length;
            totalBlock++;

            next()
        })
    },
    (err) => {
        if (err) {
            console.log(err);
        }
        console.log('DONE');
        console.log('Total (tx/block) ', totalTx, '/', totalBlock);
    }
)
