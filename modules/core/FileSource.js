(function() {
	"use strict";

	var fs = require('fs');
	var Promise = require('bluebird');

	function FileSource(file) {
		this._file = file;
	}

	FileSource.prototype.getData = function() {
		var self = this;
		return new Promise(function(resolve, reject) {
			var file = self._file;
			fs.readFile(file, function(err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			})
		});
	};

	module.exports = FileSource;


}());
