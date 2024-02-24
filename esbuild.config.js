import { build } from 'esbuild';
import copy from 'esbuild-copy-static-files';

const esbuildBackendConfig = {
    entryPoints:['src/index.ts'],
    minify: true,
    splitting: true,
    ignoreAnnotations: true,
    lineLimit: 50,
    treeShaking: true,
    bundle: true,
    format: 'esm',
    outdir: 'serve',
    target: 'es6',
    chunkNames: './src/[name]-[hash]',
    loader: {
        '.ts':'ts',
        '.png':'copy',
        '.js':'js'
    },
    platform: 'node',
    plugins: [
        copy({
            src: './upload/images',
            dest: './serve/upload/images',
            recursive: true,
            minify: true,
            target: 'es5'
        })
    ]
}

await build(esbuildBackendConfig)
