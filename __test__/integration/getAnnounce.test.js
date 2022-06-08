const { Announces } = require("../../src/controllers");
const expect = require("chai").expect;

describe("Create new announce", () => {
  it("Should return status 200", () => {
    expect(
      new Promise((res, rej) => {
        res(Announces.getAnnounce()).to.equal("200");
      })
    );
  });
});