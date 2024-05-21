var jwt = require('jsonwebtoken');
function createtoken (payload) {
    return  jwt.sign(payload, "123", {expiresIn: "24h"});
}
module.exports=createtoken