
        
function printSuccess(testFunctionName, shouldBe, isValue) {
    let text = "isValue contains: " + isValue + " | type: " + typeof(isValue)
    printSuccessText(testFunctionName, text)
}
function printSuccessText(testFunctionName, text) {
    text = testFunctionName + " is successful - " + text
    let element = "<p>" + text + "</p>"
    $("#successful").append(element)
}
function printError(testFunctionName, shouldBe, isValue) {
    let text = "isValue contains: " + isValue + " | type: " + typeof(isValue) + " | should be value: " + shouldBe + " | type: " + typeof(shouldBe)
    printErrorText(testFunctionName, text)
}
function printErrorText(testFunctionName, text) {
    text = testFunctionName + " has error - " + text
    let element = "<p>" + text + "</p>"
    $("#errors").append(element)
}
function printTestResult(testFunctionName, shouldBe, isValue, testIsSuccessful) {
    if (testIsSuccessful) {
        printSuccess(testFunctionName, shouldBe, isValue)
    }
    else {
        printError(testFunctionName, shouldBe, isValue)
    }
}
function equals(testFunctionName, shouldBe, isValue) {
    printTestResult(testFunctionName, shouldBe, isValue, shouldBe === isValue)
}
function equalsWithFloats(testFunctionName, shouldBe, isValue, precision = 0.01) {
    printTestResult(testFunctionName, shouldBe, isValue, Math.abs(shouldBe - isValue) <= precision)
}
function equalsOnArray(testFunctionName, shouldBe, isValue, precision = 0.01) {
    if (shouldBe.length == isValue.length) {
        for (let i = 0; i < shouldBe.length; i++) {
            if (typeof shouldBe[i] === "string") {
                equals(testFunctionName, shouldBe[i], isValue[i])
            }
            else {
                equalsWithFloats(testFunctionName, shouldBe[i], isValue[i], precision)
            }
        }
    }
    else {
        printErrorText(testFunctionName, "arrays are different sizes")
    }
}
function checkBoolean(testFunctionName, shouldBe, isValue) {
    if (shouldBe == isValue) {
        printSuccessText(testFunctionName, "returns " + isValue)
    }
    else {
        printErrorText(testFunctionName, "returns " + isValue + " instead of " + shouldBe)
    }
}
function isFalse(testFunctionName, isValue) {
    checkBoolean(testFunctionName, false, isValue)
}
function isTrue(testFunctionName, isValue) {
    checkBoolean(testFunctionName, true, isValue)
}
