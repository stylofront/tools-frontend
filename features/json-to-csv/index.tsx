'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    FileJson,
    Copy,
    Check,
    Trash2,
    ClipboardPaste,
    ArrowRightLeft,
    Zap,
    AlertCircle,
    Table,
    RefreshCw,
    Download,
    FileCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function JsonToCsvContent() {
    const [json, setJson] = useState('');
    const [csv, setCsv] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [isConverting, setIsConverting] = useState(false);

    const flattenObject = (obj: any, prefix = '') => {
        const flattened: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const propName = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    Object.assign(flattened, flattenObject(obj[key], propName));
                } else {
                    flattened[propName] = obj[key];
                }
            }
        }
        return flattened;
    };

    const convertToCsv = useCallback(() => {
        if (!json.trim()) return;
        setIsConverting(true);
        setError(null);

        try {
            let data = JSON.parse(json);

            // Handle single object
            if (!Array.isArray(data)) {
                data = [data];
            }

            if (data.length === 0) {
                setError('JSON array is empty.');
                setIsConverting(false);
                return;
            }

            // Flatten all objects and collect all unique keys
            const flattenedData = data.map((item: any) => flattenObject(item));
            const allHeaders = new Set<string>();
            flattenedData.forEach((item: any) => {
                Object.keys(item).forEach(key => allHeaders.add(key));
            });

            const headers = Array.from(allHeaders);
            const csvRows = [];

            // Add Header Row
            csvRows.push(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','));

            // Add Data Rows
            for (const row of flattenedData) {
                const values = headers.map(header => {
                    const val = row[header];
                    if (val === null || val === undefined) return '';
                    if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
                    return `"${String(val).replace(/"/g, '""')}"`;
                });
                csvRows.push(values.join(','));
            }

            setCsv(csvRows.join('\n'));
            toast.success("Converted to CSV!");
        } catch (err: any) {
            setError(`Invalid JSON: ${err.message}`);
            toast.error("Conversion failed");
        } finally {
            setIsConverting(false);
        }
    }, [json]);

    const handleCopy = useCallback(async () => {
        if (!csv) return;
        await navigator.clipboard.writeText(csv);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    }, [csv]);

    const handlePaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setJson(clipboardText);
            toast.success("Pasted JSON");
        } catch (err) {
            console.error('Failed to read clipboard', err);
        }
    }, []);

    const handleDownload = () => {
        const blob = new Blob([csv], { type: 'text/csv' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'converted_data.csv'
        link.click()
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <div className="container max-w-7xl mx-auto px-4 py-12 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-600 dark:text-blue-400 mb-2"
                    >
                        <ArrowRightLeft className="h-4 w-4" />
                        ADVANCED JSON PROCESSOR
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                        JSON to CSV
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Convert complex JSON arrays or objects into clean, flat CSV files.
                        Automatic nested object flattening and Excel-safe encoding.
                    </p>
                </header>

                <div className="grid lg:grid-cols-11 gap-6 items-start">
                    {/* Input */}
                    <div className="lg:col-span-5">
                        <div className="bg-[#1e1e1e] border-2 border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                                        <FileJson className="h-4 w-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Input JSON</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={handlePaste} className="h-8 text-[10px] font-bold uppercase text-white/50 hover:bg-white/10">Paste</Button>
                                    <Button variant="ghost" size="sm" onClick={() => { setJson(''); setCsv(''); setError(null); }} className="h-8 text-[10px] font-bold uppercase text-white/50 hover:text-red-500">Clear</Button>
                                </div>
                            </div>
                            <textarea
                                value={json}
                                onChange={(e) => setJson(e.target.value)}
                                placeholder='[\n  { "user": { "id": 1, "name": "John" }, "active": true },\n  { "user": { "id": 2, "name": "Jane" }, "active": false }\n]'
                                className="w-full h-[450px] p-8 bg-transparent outline-none text-sm font-mono leading-relaxed resize-none custom-scrollbar text-blue-300 placeholder:text-white/10"
                            />
                        </div>
                    </div>

                    {/* Middle Button */}
                    <div className="lg:col-span-1 flex justify-center lg:pt-48">
                        <Button
                            onClick={convertToCsv}
                            disabled={!json || isConverting}
                            className="rounded-full w-16 h-16 shadow-2xl shadow-blue-500/40 bg-blue-600 hover:bg-blue-700 transition-all hover:scale-110 active:scale-95"
                        >
                            {isConverting ? <RefreshCw className="h-8 w-8 animate-spin" /> : <ArrowRightLeft className="h-8 w-8" />}
                        </Button>
                    </div>

                    {/* Output */}
                    <div className="lg:col-span-5">
                        <div className="bg-card border-2 border-border rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                                        <Table className="h-4 w-4" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">CSV Result</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!csv} className="h-8 text-[10px] font-bold uppercase">
                                        {copied ? <Check className="h-3.5 w-3.5 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={handleDownload} disabled={!csv} className="h-8 text-[10px] font-bold uppercase border-blue-500/20 text-blue-600 hover:bg-blue-50">
                                        <Download className="h-3.5 w-3.5 mr-1" /> Download
                                    </Button>
                                </div>
                            </div>
                            {error ? (
                                <div className="h-[450px] flex flex-col items-center justify-center p-8 text-center space-y-4">
                                    <div className="p-4 rounded-3xl bg-red-500/10">
                                        <AlertCircle className="h-8 w-8 text-red-500" />
                                    </div>
                                    <p className="text-red-500 font-bold text-sm">{error}</p>
                                </div>
                            ) : (
                                <pre className="w-full h-[450px] p-8 text-xs font-mono leading-relaxed overflow-auto custom-scrollbar bg-slate-50 dark:bg-slate-900/50">
                                    {csv || 'CSV rows will appear here...'}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 opacity-80">
                    <div className="p-6 bg-white dark:bg-slate-900 border border-border rounded-3xl space-y-3">
                        <Zap className="h-5 w-5 text-blue-500" />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Nested Objects</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Automatically flattens nested structures into dot-notation columns (e.g., `user.address.city`).
                        </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 border border-border rounded-3xl space-y-3">
                        <FileCode className="h-5 w-5 text-indigo-500" />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Excel Friendly</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Uses standard RFC 4180 formatting with escaped quotes to ensure 100% compatibility with spreadsheet software.
                        </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900 border border-border rounded-3xl space-y-3">
                        <Download className="h-5 w-5 text-emerald-500" />
                        <h4 className="font-bold text-sm uppercase tracking-wider">Local Processing</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                            All processing happens client-side. Your sensitive data never leaves your browser.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
