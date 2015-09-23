export class Foo {
  private names: Array<string> = [];

  constructor() {
    this.names.push('Wes', 'Chad', 'Adam', 'Rob', 'Jesus');
  }

  entries() {
    return this.names;
  }
}