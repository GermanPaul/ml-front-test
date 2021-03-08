module.exports = {
    lintOnSave: false,
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:4000',
                },
            },
        },
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Mercado Libre';
            return args
        })
    }
}