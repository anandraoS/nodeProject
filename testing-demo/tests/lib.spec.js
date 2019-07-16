const lib = require("../lib");
describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  it("should return a 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});
describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Anand");
    expect(result).toMatch(/Anand/);
    expect(result).toContain("Anand");
  });
});

describe("getCurrencies", () => {
  it("it should return supported currencies", () => {
      const result = lib.getCurrencies();
      //Too general
      expect(result).toBeDefined();
      expect(result).not.toBeNull();

      //Too  Specific
      expect(result[0]).toBe('USD');
      expect(result[1]).toBe('AUD');
      expect(result[2]).toBe('EUR');
      expect(result.length).toBe(3);

      //Proper Way - checking of existance irrespect to location
      expect(result).toContain('USD');
      expect(result).toContain('AUD');
      expect(result).toContain('EUR');

      // Ideal Way
      expect(result).toEqual(expect.arrayContaining(['AUD','USD','EUR']));

  });
});
