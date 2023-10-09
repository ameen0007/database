const checkwanteditems = (requiredarray, requereditem, res) => {
  console.log("inside err");
  const missingItems = requiredarray.filter(
    (field) => !(field in requereditem)
  );

  if (missingItems.length > 0) {
    console.log("inside missing");
    res.status(404).json({ messsage: `${missingItems} is missing` });
  }
  console.log(missingItems, "missingitems");
};

module.exports = {
  checkwanteditems,
};
