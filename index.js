var fs = require('fs'),
    path = require('path');

/**
 * функция генерирующая дерево из файлов и сортируем по расширениям
 * файлы с '_' в начале исключаются
 * @param file - имя файла/папки
 * @returns {Object} - содержит массивы с путями для каждого типа файлов
 */
module.exports = function(file) {
    var resultExts = {};
    function dirTree(file) {
        var stats = fs.lstatSync(file);
        if (stats.isDirectory()) {
            fs.readdirSync(file).map(function (child) {
                return dirTree(file + '/' + child);
            });
        } else {
            if (!/^_/.test(path.basename(file))) {
                if (!resultExts[path.extname(file)]) {
                    resultExts[path.extname(file)] = [];
                }
                return resultExts[path.extname(file)].push(file);
            }
        }
    }
    dirTree(file);
    return resultExts;
};

