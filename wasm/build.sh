#!/bin/bash
# Build all WASM modules

echo "🔧 Building all WASM modules..."

cd "$(dirname "$0")"

for dir in */; do
    if [ -f "$dir/Cargo.toml" ] && [ "$dir" != "target/" ]; then
        echo ""
        echo "📦 Building $dir..."
        cd "$dir"
        wasm-pack build --target web
        if [ $? -eq 0 ]; then
            echo "✅ $dir built successfully!"
        else
            echo "❌ $dir build failed!"
            exit 1
        fi
        cd ..
    fi
done

echo ""
echo "🎉 All WASM modules built successfully!"
