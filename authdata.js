var c = require("./config.js");

c.admin_origin
  .auth()
  .listUsers()
  .then((getUsersResult) => {
    console.log("Successfully fetched user data:");
    getUsersResult.users.forEach((userRecord) => {
      c.admin_dest
        .auth()
        .createUser({
          phoneNumber: userRecord.phoneNumber,
          displayName: userRecord.displayName,
          uid: userRecord.uid,
          disabled: false,
        })
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully created new user:", userRecord.uid);
        })
        .catch((error) => {
          console.log("Error creating new user:", error);
        });
    });

    console.log("Unable to find users corresponding to these identifiers:");
    getUsersResult.notFound.forEach((userIdentifier) => {
      console.log(userIdentifier);
    });
  })
  .catch((error) => {
    console.log("Error fetching user data:", error);
  });
