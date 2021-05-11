import makeDirectoryTreeFromScheme from "./mkdir-tree";

describe(makeDirectoryTreeFromScheme.name, () => {
  it("Has the desired shape", async () => {
    expect(typeof makeDirectoryTreeFromScheme).toBe("function");
    expect(makeDirectoryTreeFromScheme.length).toBe(2);
    // Throws if first argument is missing
    expect(() => makeDirectoryTreeFromScheme()).toThrow("Directory path must be a string, passed path's type was undefined.");
    // Throws if first argument is invalid
    expect(() => makeDirectoryTreeFromScheme([])).toThrow("Directory path must be a string, passed path's type was object.");
    // Throws if first argument is an empty string
    expect(() => makeDirectoryTreeFromScheme("")).toThrow("Empty string cannot be used as a directory path.");
    // Throws if second argument is missing
    expect(() => makeDirectoryTreeFromScheme(".")).toThrow("Scheme must be a string, passed scheme's type was undefined.");
    // Throws if second argument is invalid
    expect(() => makeDirectoryTreeFromScheme(".", {})).toThrow("Scheme must be a string, passed scheme's type was object.");
  });
  
  it("Works", () => {
    /**
     * @TODO Re-create this project shape in one command
     */
  });
}); 