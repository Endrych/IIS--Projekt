module.exports = (id, db) => {
    return new Promise((resolve, reject) => {
		if(!id){
			resolve(null);
		}
        db.promiseQuery('SELECT Name FROM PUBLISHER WHERE Id = ?',id)
            .then(res => {
                if (res.length > 0) {
                    resolve(res[0].Name);
                } else {
                    resolve(null);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};
