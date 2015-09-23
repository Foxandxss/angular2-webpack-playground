import {Foo} from "../src/foo";

describe('Foo', () => {
  it('returns a list of names', () => {
    const foo = new Foo();
    const entries = foo.entries();

    expect(entries.length).toBe(5);
  });
});