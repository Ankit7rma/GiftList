const express = require("express");
const cors = require("cors"); // Import CORS
const verifyProof = require("../utils/verifyProof");
const MerkleTree = require("../utils/MerkleTree");
const niceList = require("../utils/niceList.json");

const port = 1225;

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();
const MERKLE_ROOT = root;

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const { name, proof } = body;
  console.log(name);
  // TODO: prove that a name is in the list
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    res.send({ gift: "You got a toy robot!" });
  } else {
    res.status(403).send({ error: "You are not on the list :(" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
