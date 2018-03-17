let expect = require('chai').expect;
let rgbToHexColor = require('../RGBtoHex');

describe("RGBtoHEXConverter ", function() {
  it("should return #FF9EAA for (255, 158, 170)", function() {
    let color = rgbToHexColor(255, 158, 170);
    expect(color).to.be.equal('#FF9EAA');
  });

  it("should return #0C0D0E for (12, 13, 14)", function() {
    let color = rgbToHexColor(12, 13, 14);
    expect(color).to.be.equal('#0C0D0E');
  });

  it("should return #000000 for (0, 0, 0)", function() {
    let color = rgbToHexColor(0, 0, 0);
    expect(color).to.be.equal('#000000');
  });

  it("should return #FFFFFF for (255, 255, 255)", function() {
    let color = rgbToHexColor(255, 255, 255);
    expect(color).to.be.equal('#FFFFFF');
  });

  it("should return undefined for (-1, 0, 0)", function() {
    let color = rgbToHexColor(-1, 0, 0);
    expect(color).to.be.equal(undefined);
  });

  it("should return undefined for (0, -1, 0)", function() {
    let color = rgbToHexColor(0, -1, 0);
    expect(color).to.be.equal(undefined);
  });

  it("should return undefined for (0, 0, -1)", function() {
    let color = rgbToHexColor(0, 0, -1);
    expect(color).to.be.equal(undefined);
  });

  it("should return undefined for (256, 0, 0)", function() {
    let color = rgbToHexColor(256, 0, 0);
    expect(color).to.be.equal(undefined);
  });

  it("should return undefined for (0, 256, 0)", function() {
    let color = rgbToHexColor(0, 256, 0);
    expect(color).to.be.equal(undefined);
  });

  it("should return undefined for (0, 0, 256)", function() {
    let color = rgbToHexColor(0, 0, 256);
    expect(color).to.be.equal(undefined);
  });

  it("should return undefined for (3.14, 0, 0)", function() {
    let color = rgbToHexColor(3.14, 0, 0);
    expect(color).to.be.equal(undefined);
  });

  it("should return undefined for ('5', [3], {8:9})", function() {
    let color = rgbToHexColor('5', [3], {8:9});
    expect(color).to.be.equal(undefined);
  });

  it("should return undefined for ()", function() {
    let color = rgbToHexColor();
    expect(color).to.be.equal(undefined);
  });
});