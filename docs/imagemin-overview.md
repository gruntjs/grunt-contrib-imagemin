Minify images using [imagemin](https://github.com/kevva/imagemin).

Comes bundled with the following optimizers:

- [gifsicle](https://github.com/kevva/imagemin-gifsicle) — *Compress GIF images*
- [jpegtran](https://github.com/kevva/imagemin-jpegtran) — *Compress JPEG images*
- [optipng](https://github.com/kevva/imagemin-optipng) — *Compress PNG images*
- [svgo](https://github.com/kevva/imagemin-svgo) — *Compress SVG images*

We recommend using [grunt-newer](https://github.com/tschaub/grunt-newer) to only process changed files as minifying images can be quite slow.
