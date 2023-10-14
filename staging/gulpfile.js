const {src, dest, series} = require('gulp');

const srcDir = '${src.rootdir}/';
const destDir = '${webjar.target}/';

function task1() {
    return _copy('basic/ckeditor/*.md');
}

function task2() {
    return _copy(['basic/ckeditor/**', '!**/*.md', '!**/*.json'], 'dist/basic');
}

function task3() {
    return _copy(['full/ckeditor/**', '!**/*.md', '!**/*.json'], 'dist/full');
}

function task4() {
    return _copy(['standard/ckeditor/**', '!**/*.md', '!**/*.json'], 'dist/standard');
}

function _toSrc(_src) {
    return src(_src, {allowEmpty: false, cwd: srcDir});
}

function _toDest(_dest) {
    return dest(_dest || '.', {cwd: destDir});
}

function _copy(_src, _dest) {
    console.log('  Copying ' + _src);
    return _toSrc(_src).pipe(_toDest(_dest))
}

exports.default = series(task1, task2, task3, task4);
