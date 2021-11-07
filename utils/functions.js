exports.handleError = (err, res) => {
    console.log(err)
    res.status(500).send({success: false, error: err.message})
}
