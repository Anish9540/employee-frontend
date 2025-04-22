// module.exports = {
//     presets: [
//         '@babel/preset-env',         // For modern JavaScript features
//         '@babel/preset-react',       // For JSX (React files)
//         '@babel/preset-typescript',  // For TypeScript
//     ],
// };


module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        '@babel/preset-react'
    ],
};