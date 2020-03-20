module.exports = {
    insert (inserData) {
        return new Promise((resolve, reject) => {
            inserData.save(err => {
                if (err) throw err;
                resolve();
            })
        })
    },
    delete: (col,  deleteData, type) => {
        type = type || 'deleteOne';
        return new Promise((resolve, reject) => {
            col[type](deleteData, err => {
                if (err) throw err;
                resolve();
            })
        })
    },
    update: function (col, whereObj, updateObj, type) {
        type = type || 'updateOne';
        return new Promise((resolve, reject) => {
            col[type](whereObj, updateObj, err => {
                if (err) throw err;
                resolve('已更新');
            })
        })
    },
    find (col, whereObj, showObj) {
        console.log(col)
        return new Promise((resolve, reject) => {
            col.find(whereObj, showObj).exec((err, data) => {
                if (err) throw err;
                resolve(data);
            })
        })
    },
    sort (col, whereObj, showObj, sortObj) {
        return new Promise((resolve, reject) => {
            col.find(whereObj, showObj).sort(sortObj).exec((err, data) => {
                if (err) throw err;
                resolve(data);
            })
        })
    }
  }