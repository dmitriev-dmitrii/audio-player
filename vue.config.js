
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
		? './'
		: '/',

    outputDir: 'docs',

    css: {

		loaderOptions: {
			sass: {
				prependData: `@import "@/assets/scss/index.scss";`
			}
		}
	},

}
