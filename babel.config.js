module.exports = function(api) {
    api.cache(true);

    const presets = [
        '@babel/preset-env',
        '@babel/preset-react'
    ];

    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import', ['@babel/plugin-transform-runtime', {
            'helpers': false,
            'regenerator': true
        }],
    ]

    return {
        presets,
        plugins,
    };
};