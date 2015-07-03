Minify images using [imagemin](https://github.com/imagemin/imagemin).

Comes bundled with the following optimizers:

- [gifsicle](https://github.com/imagemin/imagemin-gifsicle) — *Compress GIF images*
- [jpegtran](https://github.com/imagemin/imagemin-jpegtran) — *Compress JPEG images*
- [optipng](https://github.com/imagemin/imagemin-optipng) — *Compress PNG images*
- [svgo](https://github.com/imagemin/imagemin-svgo) — *Compress SVG images*

We recommend using [grunt-newer](https://github.com/tschaub/grunt-newer) to only process changed files as minifying images can be quite slow.
