#![deny(clippy::all)]

use std::path::Path;

use napi_derive::napi;
use napi::*;
use ssimulacra2::*;

#[napi]
pub fn getScore(source: String, distorted: String) -> f64 {
  let source = image::open(source).expect("Failed to open source file");
  let distorted = image::open(distorted).expect("Failed to open distorted file");

  let source_data = source
      .to_rgb32f()
      .chunks_exact(3)
      .map(|chunk| [chunk[0], chunk[1], chunk[2]])
      .collect::<Vec<_>>();

  let source_data = Xyb::try_from(
      Rgb::new(
          source_data,
          source.width() as usize,
          source.height() as usize,
          TransferCharacteristic::SRGB,
          ColorPrimaries::BT709,
      )
      .expect("Failed to process source_data into RGB"),
  )
  .expect("Failed to process source_data into XYB");

  let distorted_data = distorted
      .to_rgb32f()
      .chunks_exact(3)
      .map(|chunk| [chunk[0], chunk[1], chunk[2]])
      .collect::<Vec<_>>();

  let distorted_data = Xyb::try_from(
      Rgb::new(
          distorted_data,
          distorted.width() as usize,
          distorted.height() as usize,
          TransferCharacteristic::SRGB,
          ColorPrimaries::BT709,
      )
      .expect("Failed to process distorted_data into RGB"),
  )
  .expect("Failed to process distorted_data into XYB");

  return compute_frame_ssimulacra2(source_data, distorted_data).expect("Failed to calculate ssimulacra2");
}
