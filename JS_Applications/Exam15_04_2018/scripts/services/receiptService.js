let receipts = (() => {

  function getActiveReceipt (userId) {
    let endpoint = `receipts?query={"_acl.creator":"${userId}","active": true}`;
    return remote.get('appdata', endpoint, 'kinvey');
  }

  function createReceipt () {
    let data = {
      'active': true,
      'productCount': +0,
      'total': +0,
    };

    return remote.post('appdata', 'receipts', 'kinvey', data);
  }

  function getMyReceipts (userID) {
    const endpoint = `receipts?query={"_acl.creator":"${userID}","active": false}`;

    return remote.get('appdata', endpoint, 'kinvey');
  }

  function receiptDetails (receiptId) {
    const endpoint = `receipts/${receiptId}`;
    return remote.get('appdata', endpoint, 'kinvey');
  }
  
  function commitReceipt (productCount, total, receipt_id) {
    let data = {
      'active': false,
      'productCount': +productCount,
      'total': +total,
    };
    let endpoint = `receipts/${receipt_id}`
    return remote.update('appdata', endpoint, 'kinvey', data);
  }

  function updateReceipt (productCount, total, receipt_id) {
    let data = {
      'active': true,
      'productCount': +productCount,
      'total': +total,
    };

    let endpoint = `receipts/${receipt_id}`;

    return remote.update('appdata', endpoint, 'kinvey', data);
  }

  return {
    getActiveReceipt,
    createReceipt,
    getMyReceipts,
    receiptDetails,
    commitReceipt,
    updateReceipt
  };
})();