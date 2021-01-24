var c = require("./config.js");

copy_collection = (root_path) => {
  console.log(root_path);
  c.admin_origin
    .firestore()
    .collection(root_path)
    .listDocuments()
    .then((dcs) => {
      c.admin_origin
        .firestore()
        .getAll(...dcs)
        .then((docs) => {
          docs.forEach((doc) => {
            c.admin_origin
              .firestore()
              .doc(root_path + "/" + doc.id)
              .listCollections()
              .then((abcd) => {
                abcd.forEach((a) => {
                  console.log(a._queryOptions.collectionId);
                  copy_collection(
                    root_path +
                      "/" +
                      doc.id +
                      "/" +
                      a._queryOptions.collectionId
                  );
                });
              });
            if (doc.data()) {
              c.admin_dest
                .firestore()
                .collection(root_path)
                .doc(doc.id)
                .set(doc.data());
            }
          });
        });
    });
};

c.admin_origin
  .firestore()
  .listCollections()
  .then((abcd) => {
    abcd.forEach((a) => {
      console.log(a._queryOptions.collectionId);

      copy_collection("/" + a._queryOptions.collectionId);
    });
  });
