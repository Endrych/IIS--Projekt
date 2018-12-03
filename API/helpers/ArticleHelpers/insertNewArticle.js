module.exports = (article, author, db) => {
    return new Promise((resolve, reject) => {
        article.Deleted = 0;
        article.Created = new Date();
        article.Author = author;

        db.promiseQuery('INSERT INTO article SET ?', article)
            .then(res => resolve(res['insertId'].toString()))
            .catch(err => {
                reject(err);
            });
    });
};
