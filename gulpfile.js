let gulp = require("gulp");
let ts = require("gulp-typescript");
let tsProject = ts.createProject("tsconfig.json");
let tslint = require("gulp-tslint");
let nodemon = require("gulp-nodemon");


gulp.task("default", ["serve"]);

gulp.task("watch", () => {
    gulp.watch('src/**/*.ts', ["compile"]);
});

gulp.task("compile", () => {
    console.log("compiling files")
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("serve", ["compile", "watch"], () => {
    nodemon({
        script: "dist/server.js",
        env: { "NODE_ENV": "development" }
    })
        .on("restart", () => {
            console.log("restarted");
        })
});