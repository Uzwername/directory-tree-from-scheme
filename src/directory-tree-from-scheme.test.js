import makeDirectoryTreeFromScheme from "./index";

describe(makeDirectoryTreeFromScheme.name, () => {
  it("Has the desired shape", async () => {
    expect(typeof makeDirectoryTreeFromScheme).toBe("function");
    expect(makeDirectoryTreeFromScheme.length).toBe(2);
    expect(typeof await makeDirectoryTreeFromScheme()).toBe("boolean");
  });
});