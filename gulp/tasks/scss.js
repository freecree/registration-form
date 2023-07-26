import sassCompiler from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autroprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(sassCompiler);

export const scss = () => {
  return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(groupCssMediaQueries())
    // .pipe(webpcss({
    //   webpClass: ".webp",
    //   noWebpClass: ".no-webp"
    // }))
    // .pipe(autroprefixer({
    //   grid: true,
    //   overrideBrowserlist: ["last 3 versions"],
    //   cascade: true
    // }))
    // .pipe(app.gulp.dest(app.path.build.css))
    // .pipe(cleanCss())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
}
