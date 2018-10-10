# Report

createTransaction.js: source javascript chứa các hàm để tạo transaction và batch list (byte) lưu vào file.

postToServer.js: source javascript chứa các hàm để  load file và đưa đến server.

createTx.js:

    - source javascript.

    - entries là list có dạng [Tên file, số  lượng Tx].

sendTx.js:

    - source javascript.

    - cmd: node sendTx.js filePath url nuberTxPerSecond.

send.py:

    - source python.

    - Tự động gửi Tx đến server.

getNumberTx.py:

    - source python.

    - Tính số lượng transactions, từ block_num start đến block_num end.

    - Chạy tại máy có thể gọi sawtooth block list (server).

getDifftime.py:

    - source python.

    - get the difference of time UTC
