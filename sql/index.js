module.exports = {
    insert (inserData) {
        return new Promise((resolve, reject) => {
            inserData.save(err => {
                if (err) throw err;
                resolve();
            })
        })
    },
    delete: (col, type, deleteData) => {
        return new Promise((resolve, reject) => {
            col[type](deleteData, err => {
                if (err) throw err;
                resolve();
            })
        })
    },
    update: function (col, type, whereObj, updateObj) {
        return new Promise((resolve, reject) => {
            col[type](whereObj, updateObj, err => {
                if (err) throw err;
                resolve();
            })
        })
    },
    find (col, whereObj, showObj) {
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