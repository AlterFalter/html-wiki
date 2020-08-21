function searchInWiki(searchFieldId, divToFilterId) {
    let searchTerm = $("#" + searchFieldId).val()
    let searchTerms = splitSearchTerm(searchTerm)
    
    let childrenFromDivToFilter = $("#" + divToFilterId).children().toArray()
    let scores = []

    for (let i = 0; i < childrenFromDivToFilter.length; i++) {
        let text = getInnerTextWithoutMultiSpace(childrenFromDivToFilter[i])
        let score = searchTermsInStringAndGetScore(text, searchTerms)
        scores.push(score)
    }

    let sortedWikiId = "sortedWiki"
    $("#" + divToFilterId).append("<div id=\"" + sortedWikiId + "\"></div>")
    let childrenOrdered = mapOrder(childrenFromDivToFilter, scores)
    for (let i = 0; i < childrenOrdered.length; i++) {
        $("#" + sortedWikiId).append($(childrenOrdered[i]))
    }
    $("#" + sortedWikiId).contents().unwrap()
}
function splitSearchTerm(searchTerm) {
    // split by space, comma, point, tab, enter
    // create array
    // --> go throw split characters, every time split elments in array
    // --> do this for all orders the characters can have and combine all in one array
    // --> distinct array
    let result = splitMulti(searchTerm, [" ", ",", ".", "|", "\n", "\t", "-"]).filter(i => i !== "")
    result.push(searchTerm)
    result.push(searchTerm)
    return result
}
function getInnerTextWithoutMultiSpace(element) {
    return removeMultispace($(element).text())
}
function joinStringArray(array) {
    array = distinctArray(array)
    return array.filter(i => i.length > 0).map(i => i.trim()).join(" ")
}
function searchTermsInStringAndGetScore(textToSearch, searchTerms) {
    // calculate score on how good it was
    let score = 0
    textToSearch = textToSearch.toLowerCase()
    for (let i = 0; i < searchTerms.length; i++) {
        score += countOccurrences(textToSearch, searchTerms[i].toLowerCase(), false)
    }
    return score
}
function mapOrder(array, order) {
    array.sort(function (a, b) {
        aValue = order[array.indexOf(a)]
        bValue = order[array.indexOf(b)]
        if (aValue < bValue) {
            return -1
        }
        if (aValue > bValue) {
            return 1
        }
        return 0
    })
    array = array.reverse()
    return array
}
function pushArray(arr, arr2) {
    // add range
    // add one array to the second array on first dimension
    arr.push.apply(arr, arr2);
}
/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function countOccurrences(string, subString, allowOverlapping) {
    string += "";
    subString += "";
    if (subString.length <= 0) {
        return (string.length + 1)
    }

    var n = 0
    var pos = 0
    var step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}
function splitMulti(str, tokens) {
    // We can use the first token as a temporary join character
    var tempChar = tokens[0]; 
    for(var i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
}
function distinctArray(array) {
    return Array.from(new Set(array))
}
function removeMultispace(text) {
    return text.replace(/\s+/g, ' ')
}
