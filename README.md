### @nrs-binding/ssimulacra2
[rust ssimulacra2](https://github.com/rust-av/ssimulacra2_bin) binding for nodejs.

#### Usage with nodejs

install:
```bash
$ npm install @nrs-binding/ssimulacra2 -S
```

run:
```js
const { getScore } = require('@nrs-binding/ssimulacra2');
getScore('path/to/img1', 'path/to/img2').then(score => {
  console.log('ssimulacra2 score:', score);
});
```

#### Usage with cli

install:
```bash
$ npm install @nrs-binding/ssimulacra2 -g
```

run in terminal:
```bash
ssim2 path/to/img1 path/to/img2
```
