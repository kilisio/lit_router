import clear from 'rollup-plugin-clear';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/views.js',
    output: {
        file: 'app/web/views.js',
        format: 'esm'
    },
    plugins: [
        clear({
            targets: ['app/web'],
        }),
        resolve(),
        commonJS({
              include: 'node_modules/**'
        }),
        cleanup(),
        terser(),
        copy({
            targets: [
                {
                    src: [
                        'src/views/assets',
                        'src/lib',
                        'src/index.html',
                    ], 
                    dest: 'app/web/'
                }
            ]
        })
    ]
};
