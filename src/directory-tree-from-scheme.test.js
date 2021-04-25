import makeDirectoryTreeFromScheme from "./index";

describe(makeDirectoryTreeFromScheme.name, () => {
  test(`${makeDirectoryTreeFromScheme.name} is a function`, () => {
    expect(typeof makeDirectoryTreeFromScheme).toBe("function");
  });
});