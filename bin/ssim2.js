#!/usr/bin/env node
const stdio = require("stdio");
const ops = stdio.getopt({});

const cwd = process.cwd();
const path = require("path");
const { getScore } = require("../index");

const src = path.resolve(cwd, ops.args[0]);
const dist = path.resolve(cwd, ops.args[1]);

async function run() {
  const start = Date.now();
  const score = await getScore(src, dist);
  console.log('');
  console.log('*** ssimulacra2 ***');
  console.log(`score: `, score);
  console.log(`cost: `, Date.now() - start, 'ms');
}

run();
