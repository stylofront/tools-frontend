'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ImageCompressorContent() {
    const [wasm, setWasm] = useState<any>(null);
    const [isWasmLoading, setIsWasmLoading] = useState(true);
    const [wasmError, setWasmError] = useState<string | null>(null);

    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [originalUrl, setOriginalUrl] = useState<string>('');
    const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
    const [compressedUrl, setCompressedUrl] = useState<string>('');
    const [quality, setQuality] = useState(80);
    const [isCompressing, setIsCompressing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Load WASM
    useEffect(() => {
        async function loadWasm() {
            try {
                // Import the init function and compress_image separately
                const wasmModule = await import('@/wasm/image-compressor/pkg/image_compressor_wasm');
                // The default export IS the init function
                await wasmModule.default();
                setWasm(wasmModule);
                console.log('WASM loaded successfully');
            } catch (err: any) {
                console.error('WASM load error:', err);
                setWasmError(err.message || 'Failed to load compression engine');
            } finally {
                setIsWasmLoading(false);
            }
        }
        loadWasm();
    }, []);

    // Compress when file or quality changes
    const compress = useCallback(async () => {
        if (!wasm || !originalFile) return;

        setIsCompressing(true);
        try {
            const arrayBuffer = await originalFile.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            // Always compress as JPEG for quality control
            // PNG is lossless and ignores quality parameter
            const result = wasm.compress_image(uint8Array, quality, 'jpeg');

            // Output as JPEG
            const blob = new Blob([result], { type: 'image/jpeg' });

            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            setCompressedBlob(blob);
            setCompressedUrl(URL.createObjectURL(blob));
        } catch (err) {
            console.error('Compression error:', err);
        } finally {
            setIsCompressing(false);
        }
    }, [wasm, originalFile, quality, compressedUrl]);

    // Debounced compression
    useEffect(() => {
        if (!wasm || !originalFile) return;
        const timer = setTimeout(compress, 200);
        return () => clearTimeout(timer);
    }, [quality, originalFile, wasm]);

    // Handle file select
    const handleFileSelect = useCallback((file: File) => {
        if (originalUrl) URL.revokeObjectURL(originalUrl);
        setOriginalFile(file);
        setOriginalUrl(URL.createObjectURL(file));
        setCompressedBlob(null);
        setCompressedUrl('');
    }, [originalUrl]);

    // Handle drop
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileSelect(file);
        }
    }, [handleFileSelect]);

    // Handle download
    const handleDownload = useCallback(() => {
        if (!compressedUrl || !originalFile) return;
        const link = document.createElement('a');
        link.href = compressedUrl;
        const name = originalFile.name.replace(/\.[^/.]+$/, '');
        // Always output as JPG since we compress as JPEG
        link.download = `sf-image-compres-${name}.jpg`;
        link.click();
    }, [compressedUrl, originalFile]);

    // Reset
    const handleReset = useCallback(() => {
        if (originalUrl) URL.revokeObjectURL(originalUrl);
        if (compressedUrl) URL.revokeObjectURL(compressedUrl);
        setOriginalFile(null);
        setOriginalUrl('');
        setCompressedBlob(null);
        setCompressedUrl('');
        setQuality(80);
    }, [originalUrl, compressedUrl]);

    // Format file size
    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const originalSize = originalFile?.size || 0;
    const compressedSize = compressedBlob?.size || 0;
    const savings = originalSize > 0 && compressedSize > 0
        ? Math.round((1 - compressedSize / originalSize) * 100)
        : 0;

    if (wasmError) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center text-red-500 p-8 bg-red-500/10 rounded-2xl border border-red-500/20">
                    <p className="text-xl font-bold mb-2">Error Loading Compressor</p>
                    <p className="text-sm">{wasmError}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                            Image Compressor
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Compress images with <span className="font-semibold text-foreground">Rust + WebAssembly</span>.
                        Fast, private, and runs in your browser.
                    </p>
                    {isWasmLoading && (
                        <div className="inline-flex items-center gap-2 text-sm text-primary bg-primary/10 px-4 py-2 rounded-full">
                            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            Loading engine...
                        </div>
                    )}
                </header>

                {/* Upload Zone */}
                {!originalFile ? (
                    <div className="max-w-xl mx-auto">
                        <label
                            className={`group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 ${isDragging
                                ? 'border-primary bg-primary/10 scale-[1.02]'
                                : 'border-border hover:border-primary/50 hover:bg-card/50'
                                }`}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center justify-center space-y-4 text-center px-4">
                                <div className={`p-4 rounded-2xl transition-all duration-300 ${isDragging ? 'bg-primary/20 scale-110' : 'bg-secondary group-hover:bg-primary/10'}`}>
                                    <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold">Drop your image here</p>
                                    <p className="text-sm text-muted-foreground">or click to browse</p>
                                </div>
                                <p className="text-xs text-muted-foreground/70">JPEG • PNG • WebP</p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                                disabled={isWasmLoading}
                            />
                        </label>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Preview Section */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* Original Image */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-muted-foreground">Original</span>
                                        <span className="text-sm font-bold text-foreground">{formatSize(originalSize)}</span>
                                    </div>
                                    <div className="aspect-square rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-border">
                                        <img src={originalUrl} alt="Original" className="w-full h-full object-contain" />
                                    </div>
                                </div>

                                {/* Compressed Image */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-muted-foreground">Compressed</span>
                                        <div className="flex items-center gap-2">
                                            {isCompressing ? (
                                                <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            ) : compressedSize > 0 && (
                                                <>
                                                    <span className="text-sm font-bold text-foreground">{formatSize(compressedSize)}</span>
                                                    {savings > 0 && (
                                                        <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                                                            -{savings}%
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="aspect-square rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-border relative">
                                        {compressedUrl ? (
                                            <img src={compressedUrl} alt="Compressed" className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Size Comparison Bar */}
                            {compressedSize > 0 && (
                                <div className="p-5 rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 border border-border shadow-lg">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-xl bg-primary/10">
                                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-foreground">Compression Results</h4>
                                            <p className="text-xs text-muted-foreground">See how much space you saved</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-black text-green-500">-{savings}%</span>
                                        </div>
                                    </div>

                                    {/* Size bars */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-medium text-muted-foreground w-20">Original</span>
                                            <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-red-400 to-orange-400 rounded-full" style={{ width: '100%' }} />
                                            </div>
                                            <span className="text-sm font-bold w-20 text-right">{formatSize(originalSize)}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-medium text-muted-foreground w-20">Compressed</span>
                                            <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${Math.max(5, (compressedSize / originalSize) * 100)}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-bold w-20 text-right text-green-500">{formatSize(compressedSize)}</span>
                                        </div>
                                    </div>

                                    {/* Saved badge */}
                                    <div className="mt-4 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-green-500/10 border border-green-500/20">
                                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm font-semibold text-green-500">
                                            You saved {formatSize(originalSize - compressedSize)}!
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Controls Panel */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-6 space-y-5 p-6 rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 border border-border shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-primary/10">
                                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-lg">Settings</h3>
                                </div>

                                {/* Quality Slider */}
                                <div className="space-y-4 p-4 rounded-xl bg-secondary/30 border border-border/50">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-semibold text-foreground">Quality</label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                                                {quality}
                                            </span>
                                            <span className="text-sm font-medium text-muted-foreground">%</span>
                                        </div>
                                    </div>

                                    {/* Custom styled slider */}
                                    <div className="relative">
                                        <input
                                            type="range"
                                            min="1"
                                            max="100"
                                            value={quality}
                                            onChange={(e) => setQuality(Number(e.target.value))}
                                            className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-red-400 via-yellow-400 to-green-400"
                                            style={{
                                                background: `linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #22c55e 100%)`
                                            }}
                                        />
                                    </div>

                                    <div className="flex justify-between text-xs">
                                        <span className="flex items-center gap-1 text-red-400">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                                            </svg>
                                            Smaller
                                        </span>
                                        <span className="flex items-center gap-1 text-green-400">
                                            Higher
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                {/* File Info */}
                                <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-3">
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">File Info</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Name
                                            </span>
                                            <span className="font-medium text-sm truncate max-w-[140px]" title={originalFile.name}>{originalFile.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Type
                                            </span>
                                            <span className="font-medium text-sm px-2 py-0.5 rounded bg-primary/10 text-primary">
                                                {originalFile.type.split('/')[1].toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Download Button */}
                                <Button
                                    onClick={handleDownload}
                                    disabled={!compressedBlob || isCompressing}
                                    className="w-full h-14 rounded-xl font-bold text-base bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-[1.02]"
                                >
                                    {isCompressing ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Compressing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download Compressed
                                        </span>
                                    )}
                                </Button>

                                {/* Reset Button */}
                                <button
                                    onClick={handleReset}
                                    className="w-full text-sm text-muted-foreground hover:text-primary transition-all py-3 flex items-center justify-center gap-2 rounded-xl hover:bg-secondary/50"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Compress another image
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
