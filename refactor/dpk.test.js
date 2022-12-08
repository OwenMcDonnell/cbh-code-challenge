const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns an event partitionKey if one is inluded in the input object", () => {
    let event = {
      partitionKey: "A",
    };
    const candidateKey = deterministicPartitionKey(event);
    expect(candidateKey).toBe("A");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns hash of event if no partionKey is in the input object", () => {
    let event = {
      testValue: "test",
    };
    const noPartitionKey1 = deterministicPartitionKey(event);
    const noPartitionKey2 = deterministicPartitionKey(event);
    expect(typeof noPartitionKey1).toBe("string");
    expect(noPartitionKey1).toMatch(noPartitionKey2);
  });
});

describe("deterministicPartitionKey", () => {
  it("If partitionKey is not string return stringified JSON", () => {
    let event = {
      partitionKey: {
        foo: "bar",
        baz: 10,
      },
    };
    const partionKeyObject = deterministicPartitionKey(event);
    expect(typeof partionKeyObject).toBe("string");
    expect(partionKeyObject).toBe('{"foo":"bar","baz":10}');
  });
});

describe("deterministicPartitionKey", () => {
  it("If partitionKey is longer than 256 characters hash it. ", () => {
    let event = {
      partitionKey:
        "BfVrN2zeWGWmMCfXxxAC0hQzOgpAuGpLo08dyTyzozZjFwbz5QlprkktC8xVb2ATP7OSdwLSeS14ARvGqEhchrRvlS6bJMUiEvhjk7B55useDqtCmu9VxXYR3nWK2scJRzJETSgpB7SrKVrhaXudBwO9IzflBMGXWu5uR8iW7Bhm4psQld2lfhdxtbcVu5I4dJsq9bTOGlbebTdUciYzErFSsHAG1FDpp6Kx28SFJ4Xkw9ZqdtzAz6d6Yjr1oAhBJ",
    };
    const partionKeyLength = deterministicPartitionKey(event);
    expect(event.partitionKey).toEqual(
      expect.not.stringMatching(partionKeyLength)
    );
  });
});
