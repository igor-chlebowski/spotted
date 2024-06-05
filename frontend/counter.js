function countChars(obj) {
    var maxLength = 500;
    var textLength = obj.value.length;
    var charCount = document.getElementById("charCount");
    charCount.innerHTML = textLength + "/" + maxLength;
}