import clear from 'rollup-plugin-clear';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
    input: 'fork_src/views.js',
    output: {
        file: 'fork_app/views.js',
        format: 'esm'
    },
    plugins: [
        clear({
            targets: ['fork_app'],
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
                        'fork_src/views/assets',
                        'fork_src/lib',
                        'fork_src/index.html',
                    ], 
                    dest: 'fork_app/'
                }
            ]
        })
    ]
};
