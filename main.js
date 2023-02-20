const fs = require('fs');
const binding = require('./index');
const path = require('path');
const sharp = require('sharp');

// 生成一个随机文件名
function randomName() {
  return Math.random().toString(36).slice(2);
}

// 将非png格式的图片通过sharp转换为png格式
function convertToPng(img) {
  const { ext } = path.parse(img);
  const sharpImg = sharp(img);
  return sharpImg.metadata().then((metadata) => {
    // 生成一个临时图片路径
    if (!fs.existsSync(path.join(__dirname, '/.tmp'))) {
      fs.mkdirSync(path.join(__dirname, '/.tmp'));
    }
    const tmpPath = path.join(__dirname, '/.tmp/', randomName() + '.png');
    if (metadata.format !== 'png') {
      return sharpImg.png().toFile(tmpPath).then(() => tmpPath);
    }
    if (ext !== '.png') {
      // rust里的image.open依赖文件后缀，所以如果是png格式但是后缀不是png，需要复制一份
      fs.cpSync(img, tmpPath);
      return tmpPath;
    }
    return img;
  });
}

function withImg(img1, img2, callback) {
  return Promise.all([convertToPng(img1), convertToPng(img2)]).then((res) => {
    const img1Png = res[0];
    const img2Png = res[1];

    const result = callback(img1Png, img2Png);

    // 如果是临时图片，需要在比较完成后删除
    if (img1Png !== img1) {
      fs.rmSync(img1Png);
    }
    if (img2Png !== img2) {
      fs.rmSync(img2Png);
    }

    return result;
  });
}

function getScore(img1, img2) {
  return withImg(img1, img2, (img1Png, img2Png) => {
    const score = binding.getScore(img1Png, img2Png);
    return score;
  });
}

module.exports.getScore = getScore;
