var gulp = require("gulp");

var getTsProject = (function () {
    var tsProjects = {};
    var gulpTypeScript;

    return function (fileName, options) {
        if (!gulpTypeScript) {
             gulpTypeScript = require("gulp-typescript");
        }

        if (!tsProjects[fileName]) {
            tsProjects[fileName] = gulpTypeScript.createProject(fileName, options);
        }

        return tsProjects[fileName];
    }
})();

gulp.task("clean", function (callback) {
    require("run-sequence")("src:clean", "test:clean", callback);
});

gulp.task("src:clean", function () {
    var del = require("del");

    return del([
        "lib/*",
        "src/**/*.js"
    ]);
});

gulp.task("src:tslint", function () {
    var gulpTslint = require("gulp-tslint");
    var tslint = require("tslint");
    var program = tslint.Linter.createProgram("./tsconfig.json");

    return gulp
        .src("src/**/*.ts")
        .pipe(gulpTslint({ program }));
});

gulp.task("src:tsc", function () {
    var merge = require("merge2");
    var tsProject = getTsProject("tsconfig.json");
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest("lib")),
        tsResult.js.pipe(gulp.dest("lib"))
    ]);
});

gulp.task("src", function (callback) {
    require("run-sequence")(
        "src:clean",
        "src:tsc",
        "src:tslint",
        callback);
});

gulp.task("test:clean", function () {
    var del = require("del");

    return del([
        "test/run/**/*.js"
    ]);
});

gulp.task("test:tslint", function () {
    var gulpTslint = require("gulp-tslint");
    var tslint = require("tslint");
    var program = tslint.Linter.createProgram("./test/tsconfig.json");

    return gulp
        .src([
            "./test/*.ts"
        ])
        .pipe(gulpTslint({ program }));
});

gulp.task("test:tsc", function () {
    var merge = require("merge2");
    var sourcemaps = require("gulp-sourcemaps");
    var tsProject = getTsProject("./test/tsconfig.json");
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest(".")),
        tsResult.js
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("."))
    ]);
});

function runTests(wildcard) {
    var mocha = require("gulp-mocha");

    return gulp.src(wildcard)
        .pipe(mocha({
            reporter: "spec",
        }))
        .on("error", function () {
            process.exitCode = 1;
        });
}

gulp.task("test:run", function () {
    return runTests([
        "test/*.js",
        "test/**/*.js"
    ]);
});

gulp.task("test", function (callback) {
    require("run-sequence")(
        "test:clean",
        "test:tsc",
        "test:tslint",
        "test:run",
        callback);
});

gulp.task("watch", ["default"], function () {
    gulp.watch("src/**/*.ts", ["src:tsc"]);
    gulp.watch("test/**/*.ts", ["test:tsc"]);
});

gulp.task("default", function (callback) {
    require("run-sequence")("src", "test", callback);
});
