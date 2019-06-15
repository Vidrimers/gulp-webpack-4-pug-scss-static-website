const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const webpack = require('webpack-stream');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin')

sass.compiler = require('node-sass');

let config = {
	dest: './dist',
	isDev: false,
  openAnalyzer: false
}

const webpackConfig = {
	mode: config.isDev ? 'development' : 'production',
	devtool: config.isDev ? 'eval-source-map' : 'production',
	output: {
		filename: 'main.min.js',
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: config.openAnalyzer,
		}),
		new VueLoaderPlugin(),
	],
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					configFile: './.eslintrc'
				}
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			},
			{
				test: /\.pug$/,
				oneOf: [
					{
						resourceQuery: /^\?vue/,
						use: ['pug-plain-loader']
					}, 
				]
			},
			{
				test: /\.vue$/,
				use: 'vue-loader',
			},
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	}
}



function html() {
  return gulp.src('./src/pages/**/*.pug')
							.pipe(pug({
								basedir: './'
							}))
							.pipe(gulp.dest(config.dest))
							.pipe(gulp.dest(config.dest))
							.pipe(browserSync.stream());
}


function styles() {
	return gulp.src('./src/common/scss/main.scss')
							.pipe(sourcemaps.init())
							.pipe(sass().on('error', sass.logError))
							.pipe(concat('main.min.css'))
							.pipe(autoprefixer())
							.pipe(gulpif(!config.isDev, cleanCSS({level: 2})))
							.pipe(gulpif(config.isDev, sourcemaps.write()))
							.pipe(gulp.dest(config.dest + '/assets/css'))
							.pipe(browserSync.stream());
}


function scripts() {
  return gulp.src('./src/common/js/main.js')
							.pipe(webpack(webpackConfig))
							.pipe(gulp.dest(config.dest + '/assets/js'))
							.pipe(browserSync.stream());
}


function images() {
	return gulp.src('src/static/img/*')
							.pipe(gulpif(!config.isDev, imagemin({
								interlaced: true,
								progressive: true,
								optimizationLevel: 5
							})))
							.pipe(gulp.dest((config.dest + '/assets/img')))
							.pipe(browserSync.stream());
}


function assets() {
	return gulp.src(['!src/static/img', 'src/static/**/*'])
							.pipe(gulp.dest((config.dest + '/assets')))
							.pipe(browserSync.stream());
}


function clean() {
	return del(['dist/*'])
}


function build() {
	return gulp.series(clean, 
		gulp.parallel(html, styles, scripts, images, assets)
	)
}


function watch() {
	browserSync.init({
		open: false,
		port: 9000,
		server: {
			baseDir: './dist',
		}
	});
	gulp.watch('./src/**/*.pug', html)
	gulp.watch('./src/**/*.scss', styles)
	gulp.watch('./src/**/*.js', scripts)
	gulp.watch('./src/static/img/*', images)
	gulp.watch('./src/static/*', assets)
}


gulp.task('build', build());
gulp.task('watch', watch);
gulp.task('dev', gulp.series('build', 'watch'));