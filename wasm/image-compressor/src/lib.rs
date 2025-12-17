use wasm_bindgen::prelude::*;
use image::{ImageFormat, ImageOutputFormat};
use std::io::Cursor;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen(start)]
pub fn init() {
    console_error_panic_hook::set_once();
}

/// Compress an image with specified quality.
/// - data: raw image bytes
/// - quality: 1-100 for JPEG (ignored for PNG)
/// - format: "jpeg" or "png"
/// Returns compressed image bytes
#[wasm_bindgen]
pub fn compress_image(data: &[u8], quality: u8, format: &str) -> Result<Vec<u8>, JsValue> {
    // Load image from memory
    let img = image::load_from_memory(data)
        .map_err(|e| JsValue::from_str(&format!("Failed to load image: {}", e)))?;

    let mut output = Cursor::new(Vec::new());

    // Compress based on format
    match format {
        "jpeg" | "jpg" => {
            img.write_to(&mut output, ImageOutputFormat::Jpeg(quality))
                .map_err(|e| JsValue::from_str(&format!("JPEG compression failed: {}", e)))?;
        }
        "png" => {
            img.write_to(&mut output, ImageOutputFormat::Png)
                .map_err(|e| JsValue::from_str(&format!("PNG compression failed: {}", e)))?;
        }
        _ => {
            // Default to JPEG for unknown formats
            img.write_to(&mut output, ImageOutputFormat::Jpeg(quality))
                .map_err(|e| JsValue::from_str(&format!("Compression failed: {}", e)))?;
        }
    }

    Ok(output.into_inner())
}
