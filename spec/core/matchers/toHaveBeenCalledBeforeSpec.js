describe("toHaveBeenCalledBefore", function() {
  it("throws an exception when the actual is not a spy", function() {
    var matcher = jasmineUnderTest.matchers.toHaveBeenCalledBefore(),
        fn = function() {},
        secondSpy = jasmineUnderTest.createSpy('second spy');

    expect(function() { matcher.compare(fn, secondSpy) }).toThrowError(Error, /Expected a spy, but got Function./);
  });

  it("throws an exception when the expected is not a spy", function() {
    var matcher = jasmineUnderTest.matchers.toHaveBeenCalledBefore(),
        firstSpy = jasmineUnderTest.createSpy('first spy'),
        fn = function() {};

    expect(function() { matcher.compare(firstSpy, fn) }).toThrowError(Error, /Expected a spy, but got Function./);
  });

  it("fails when the actual was not called", function() {
    var matcher = jasmineUnderTest.matchers.toHaveBeenCalledBefore(),
        firstSpy = jasmineUnderTest.createSpy('first spy'),
        secondSpy = jasmineUnderTest.createSpy('second spy');

    secondSpy();

    result = matcher.compare(firstSpy, secondSpy);
    expect(result.pass).toBe(false);
    expect(result.message).toMatch(/Expected spy first spy to have been called./);
  });

  it("fails when the expected was not called", function() {
    var matcher = jasmineUnderTest.matchers.toHaveBeenCalledBefore(),
        firstSpy = jasmineUnderTest.createSpy('first spy'),
        secondSpy = jasmineUnderTest.createSpy('second spy');

    firstSpy();

    result = matcher.compare(firstSpy, secondSpy);
    expect(result.pass).toBe(false);
    expect(result.message).toMatch(/Expected spy second spy to have been called./);
  });

  it("fails when the actual is called after the expected", function() {
    var matcher = jasmineUnderTest.matchers.toHaveBeenCalledBefore(),
        firstSpy = jasmineUnderTest.createSpy('first spy'),
        secondSpy = jasmineUnderTest.createSpy('second spy'),
        result;

    secondSpy();
    firstSpy();

    result = matcher.compare(firstSpy, secondSpy);
    expect(result.pass).toBe(false);
    expect(result.message).toEqual('Expected first spy to have been called before second spy');
  });

  it("passes when first spy is called before second spy", function() {
    var matcher = jasmineUnderTest.matchers.toHaveBeenCalledBefore(),
        firstSpy = jasmineUnderTest.createSpy('first spy'),
        secondSpy = jasmineUnderTest.createSpy('second spy'),
        result;

    firstSpy();
    secondSpy();

    result = matcher.compare(firstSpy, secondSpy);
    expect(result.pass).toBe(true);
    expect(result.message).toEqual('Expected first spy to not have been called before second spy, but it was');
  });
});
