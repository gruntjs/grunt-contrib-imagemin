# Options

Options will only apply to the relevant files, so you don't need separate targets for png/jpg.


## optimizationLevel *(png only)*

Type: `Number`
Default: `7`

Select optimization level between `0` and `7`.

> The optimization level 0 enables a set of optimization operations that require minimal effort. There will be no changes to image attributes like bit depth or color type, and no recompression of existing IDAT datastreams. The optimization level 1 enables a single IDAT compression trial. The trial chosen is what. OptiPNG thinks it’s probably the most effective. The optimization levels 2 and higher enable multiple IDAT compression trials; the higher the level, the more trials.

Level and trials:

1. 1 trial
2. 8 trials
3. 16 trials
4. 24 trials
5. 48 trials
6. 120 trials
7. 240 trials


## progressive *(jpg only)*

Type: `Boolean`
Default: `true`

Lossless conversion to progressive.


## interlaced *(gif only)*

Type: `Boolean`
Default: `true`

Interlace gif for progressive rendering.


## pngquant

Type: `Boolean`
Default: `true`

Whether to enable pngquant compression.

> pngquant is a command-line utility for converting 24/32-bit PNG images to paletted (8-bit) PNGs. The conversion reduces file sizes significantly (often as much as 70%) and preserves full alpha transparency.
