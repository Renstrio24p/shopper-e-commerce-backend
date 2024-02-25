
const esbuild = require('esbuild')
const copy = require('esbuild-copy-static-files')

esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    outdir: 'dist',
    lineLimit: 50,
    splitting: true,
    ignoreAnnotations: true,
    format: 'esm',
    platform: 'node',
    loader: {
        '.png':'copy',
        '.ts':'ts'
    },
    plugins: [
        copy({
            src: './upload/images',
            dest: './dist/images',
            recursive: true,
            minify: true,
            target: 'es5'
        })
    ]
})