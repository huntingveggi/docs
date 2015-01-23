var PDFDocument = require("pdfkit");

function Document(argument) {
	this._doc = new PDFDocument();
}

Document.prototype.add = function(elem) {
	if (elem instanceof Text) {
		this.addText(elem)
	}
}

Document.prototype.addText = function(text) {
	this._doc.text
}

module.exports = Document;
