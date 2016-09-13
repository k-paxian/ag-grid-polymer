var gulp = require('gulp');
var gulpTypescript = require('gulp-typescript');
var typescript = require('typescript');
var header = require('gulp-header');
var merge = require('merge2');
var webmake = require('webmake');
var pkg = require('./package.json');

var headerTemplate = '// <%= pkg.name %> v<%= pkg.version %>\n';

gulp.task('compile', tscCompile);

gulp.task('default', ['compile'], tscWebMake);

function tscWebMake() {
    webmake('./lib/sample/my-grid.js', {
        output: './lib/sample/my-grid.web.js',
        sourceMap: true,
        cache: false
    })
}

function tscCompile() {
    var tsResult = gulp
        .src('src/**/*.ts')
        .pipe(gulpTypescript({
            typescript: typescript,
            module: 'commonjs',
            moduleResolution: 'node',
            removeComments: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            declarationFiles: true,
            target: 'ES5',
            noImplicitAny: true
        }));

    return merge([
        tsResult.dts
            .pipe(header(headerTemplate, { pkg : pkg }))
            .pipe(gulp.dest('lib')),
        tsResult.js
            .pipe(header(headerTemplate, { pkg : pkg }))
            .pipe(gulp.dest('lib'))
    ]);
}
