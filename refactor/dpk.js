const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = event.partitionKey
      ? event.partitionKey
      : crypto
          .createHash("sha3-512")
          .update(JSON.stringify(event))
          .digest("hex");
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};

// The original function had multiple superfluous nested condition checks which i simplified with concise ternaries.
// In the refactored code it is easier to see that we are simply reassigning a value to the "candidate" variable
// only if there is an event passed to the function, and after we have dealth with the passed in parameter we do checks
// on the type of value we have and its length and take apporpriate action
