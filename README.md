### @nrs-binding/ssimulacra2
[rust ssimulacra2](https://github.com/rust-av/ssimulacra2_bin) binding for nodejs.

#### Usage

install:
```bash
$ tnpm install @nrs-binding/ssimulacra2 -S
```

run:
```js
const { getScore } = require('@nrs-binding/ssimulacra2');
getScore('path/to/img1', 'path/to/img2').then(score => {
  console.log('ssimulacra2 score:', score);
});
```
