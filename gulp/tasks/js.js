import webpack from 'webpack-stream';
import nodePath from 'path';

export const js = () => {
    return app.gulp.src(app.path.src.js, {sourcemaps: app.isDev})
        .pipe(webpack({
            mode: app.isBuild ? "production" : "development",
            output: {
                filename: "app.min.js",
                path: nodePath.resolve('src/js')
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js));
}