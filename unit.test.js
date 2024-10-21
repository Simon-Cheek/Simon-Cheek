const { randomNum } = require("./helpers");

describe("Setting up unit tests for JS helper functions", () => {
  it("Generates a random number between 1 and 255", () => {
    for (let i = 0; i < 50; i++) {
      const randomNumber = randomNum();
      expect(randomNumber).not.toBeNull();
      expect(randomNumber).toBeGreaterThan(0);
      expect(randomNumber).toBeLessThan(260);
    }
  });
});
