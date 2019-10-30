import clear from 'rollup-plugin-clear';
import cleanup from 'rollup-plugin-cleanup';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import generatePackageJson from 'rollup-plugin-generate-package-json';
import * as pkgson from "../../package.json";

export default {
    input: 'src/lib.js',
    output: {
        file: 'build/lib/lib.js',
        format: 'esm'
    },
    plugins: [
        clear({
            targets: ['build/lib'],
        }),
        resolve(),
        commonJS({
              include: 'node_modules/**'
        }),
        cleanup(),
        terser(),
        generatePackageJson({
            outputFolder: 'build/lib',
            baseContents: {
                "name": '@kilisio/' + pkgson.name + '_lib',
                "version": pkgson.version,
                "main": "lib.js",
                "author": "kilisio ",
                "license": "MIT"
            }
        })
    ]
};
