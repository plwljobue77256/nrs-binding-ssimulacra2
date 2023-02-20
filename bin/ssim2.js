#!/usr/bin/env node
const { program } = require("commander");

const cwd = process.cwd();
const path = require("path");
const { getScore } = require("../main");

program.name('ssim2').description("calculate ssimulacra2 score").usage('<src> <dist>');

program.argument('<src>', 'source image path');
program.argument('<dist>', 'dist image path');
program.action(async (src, dist) => {
  const start = Date.now();
  const score = await getScore(src, dist);
  console.log('');
  console.log('*** ssimulacra2 ***');
  console.log(`score: `, score);
  console.log(`cost: `, Date.now() - start, 'ms');
});

program.parse();
