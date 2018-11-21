module.exports = (res, error) =>{
    if (error.error) {
        console.log(error.error);
    }
    res.sendStatus(error.status);
}