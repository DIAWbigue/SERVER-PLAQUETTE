const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {

  ac.grant("supervisor")
    .readAny("profile")
    .updateAny("profile")
    .deleteAny("profile")

  ac.grant("admin")
    .extend("supervisor")
    .createAny("profile")


  return ac;
})();