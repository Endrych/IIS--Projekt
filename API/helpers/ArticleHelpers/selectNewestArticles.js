module.exports = (count, offset, db) => {
    return new Promise((resolve, reject) => {
        db.promiseQuery('SELECT * FROM ARTICLE WHERE Deleted = 0 order by Created DESC limit ?', count + offset)
            .then(res => resolve(res.slice(offset)))
            .catch(err => {
                reject(err);
            });
    });
};
