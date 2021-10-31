

module.exports = async function(req, res, next) {

    try {
        const user = await User.findById(req.user.id).select('-password')
        if(user.role !=='admin'){
            return res.status(401).json({msg: 'Auhorization denied.'})
        }
     
       

} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
}

next()
}