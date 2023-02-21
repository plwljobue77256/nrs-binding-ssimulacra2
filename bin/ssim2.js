#!/usr/bin/env node
const { program } = require("commander");

const cwd = process.cwd();
const fs = require("fs");
const { ssim } = require("ssim.js");
const sharp = require("sharp");
const path = require("path");
const { getScore } = require("../main");

const getSizeStr = (file) => {
  const size = fs.statSync(file).size;
  if (size < 1024) {
    return `${size}B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)}KB`;
  }
  if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(2)}MB`;
  }
  return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`;
};

const readPixels = (url) => {
  return sharp(url)
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then((bufferWithInfo) => {
      const {
        data,
        info: { width, height },
      } = bufferWithInfo;
      return {
        data,
        width,
        height,
      };
    });
};

const getSSIM = async (src, dist) => {
  const [img1Data, img2Data] = await Promise.all([
    readPixels(src),
    readPixels(dist),
  ]);
  try {
    const result = ssim(img1Data, img2Data);
    return result.mssim;
  } catch (err) {
    return 0;
  }
};

program
  .name("ssim2")
  .description("calculate ssimulacra2 score")
  .usage("<src> <dist>");

program.argument("<src>", "source image path");
program.argument("<dist>", "dist image path");
program.action(async (src, dist) => {
  const srcFileName = path.resolve(cwd, src);
  const distFileName = path.resolve(cwd, dist);

  const start = Date.now();
  const score = await getScore(srcFileName, distFileName);
  console.log("");
  console.log("*** ssimulacra2 ***");
  console.log("");
  console.log(
    `size: `,
    `${getSizeStr(srcFileName)} - ${getSizeStr(distFileName)}`
  );
  console.log(`ssim2:`, score);
  console.log(`ssim2 cost:`, Date.now() - start, "ms");

  console.log("");

  const start1 = Date.now();
  console.log(`ssim: ${await getSSIM(srcFileName, distFileName)}`);
  console.log(`ssim cost:`, Date.now() - start1, "ms");
});

program.parse();
