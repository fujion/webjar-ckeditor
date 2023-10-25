const {src, dest, series} = require('gulp');
const download = require("gulp-download-stream");
const unzip = require('gulp-unzip');
const streamify = require('gulp-streamify');

const srcDir = '${webjar.staging}/';
const destDir = '${webjar.target}/';
const urlRoot = 'https://download.cksource.com/CKEditor/CKEditor/CKEditor%20${version.unrevise}/ckeditor_${version.unrevise}_'

function task1_1() {
    return _unzip('basic');
}

function task1_2() {
    return _unzip('full');
}

function task1_3() {
    return _unzip('standard');
}

function task2_1() {
    return _copy2('basic');
}

function task2_2() {
    return _copy2('full');
}

function task2_3() {
    return _copy2('standard');
}

function task3() {
    return _copy('basic/ckeditor/*.md');
}

function _unzip(which) {
    return download(urlRoot + which + '.zip')
        .pipe(streamify(unzip()))
        .pipe(dest('./' + which));
}

function _copy2(which) {
    return _copy([which + '/ckeditor/**', '!**/*.md', '!**/*.json'], 'dist/' + which);
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

exports.default = series(task1_1, task1_2, task1_3, task2_1, task2_2, task2_3, task3);
