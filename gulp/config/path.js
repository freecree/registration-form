import * as nodePath from 'path';
const rootFolder = nodePath.resolve();

const buildFolder = './dist';
const srcFolder = './src'

export const path = {
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/images/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files`,
    },
    src: {
        html: `${srcFolder}/*.html`,
        scss: `${srcFolder}/scss/style.scss`,
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/images/**/*.svg`,
        files: [`${srcFolder}/files/**/*.*`],
    },
    watch: {
        html: `${srcFolder}/**/*.html`,
        scss: `${srcFolder}/**/*.scss`,
        js: `${srcFolder}/**/*.js`,
        images: `${srcFolder}/images/**/*.{jpg,jpeg,png,svg,ico,gif,webp}`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
}