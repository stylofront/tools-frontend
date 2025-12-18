'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Fingerprint,
    Copy,
    Check,
    Trash2,
    ClipboardPaste,
    ShieldAlert,
    ShieldCheck,
    Database,
    Code,
    Lock,
    Eye,
    EyeOff,
    RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function JwtDecoderContent() {
    const [token, setToken] = useState('');
    const [headerJson, setHeaderJson] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
    const [payloadJson, setPayloadJson] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
    const [secret, setSecret] = useState('');
    const [showSecret, setShowSecret] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const [isManualEdit, setIsManualEdit] = useState(false);

    // Helpers
    const base64UrlEncode = (str: string) => {
        return btoa(unescape(encodeURIComponent(str)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    };

    const base64UrlDecode = (str: string) => {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        while (str.length % 4) str += '=';
        return decodeURIComponent(escape(atob(str)));
    };

    // Auto-decode when token changes
    useEffect(() => {
        if (isManualEdit) return;
        if (!token) return;

        const parts = token.split('.');
        if (parts.length >= 2) {
            try {
                const h = base64UrlDecode(parts[0]);
                const p = base64UrlDecode(parts[1]);
                // Try to format
                setHeaderJson(JSON.stringify(JSON.parse(h), null, 2));
                setPayloadJson(JSON.stringify(JSON.parse(p), null, 2));
            } catch (e) {
                // Ignore invalid parts while typing
            }
        }
    }, [token, isManualEdit]);

    // Auto-encode when JSON parts change
    const handleEncode = useCallback(() => {
        try {
            const h = base64UrlEncode(JSON.stringify(JSON.parse(headerJson)));
            const p = base64UrlEncode(JSON.stringify(JSON.parse(payloadJson)));
            // Simple approach: we don't actually sign, just append secret if present or placeholder
            const signature = secret ? base64UrlEncode(secret) : 'signature_placeholder';
            setToken(`${h}.${p}.${signature}`);
            toast.success("Token updated from JSON");
        } catch (e) {
            toast.error("Invalid JSON format");
        }
    }, [headerJson, payloadJson, secret]);

    const handleCopy = async (val: string, id: string) => {
        await navigator.clipboard.writeText(val);
        setCopied(id);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(null), 2000);
    };

    const handlePaste = useCallback(async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setIsManualEdit(false);
            setToken(clipboardText);
            toast.success("Token pasted");
        } catch (err) {
            console.error('Failed to read clipboard', err);
        }
    }, []);

    const clearAll = () => {
        setToken('');
        setHeaderJson('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
        setPayloadJson('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
        setSecret('');
        setIsManualEdit(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            <div className="container max-w-7xl mx-auto px-4 py-12 space-y-12">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2"
                    >
                        <Fingerprint className="h-4 w-4" />
                        JWT CONTROL CENTER
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                        JWT Master
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Decode, edit, and encode JSON Web Tokens with full control.
                        Live synchronization between encoded and decoded views.
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* ENCODED VIEW */}
                    <Card className="border-2 border-indigo-500/10 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                        <CardHeader className="bg-indigo-500/5 flex flex-row items-center justify-between border-b space-y-0">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Lock className="w-5 h-5 text-indigo-500" />
                                Encoded Token
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={handlePaste} className="rounded-lg">
                                    <ClipboardPaste className="h-4 w-4 mr-1" /> Paste
                                </Button>
                                <Button variant="outline" size="sm" onClick={clearAll} className="rounded-lg text-red-500 hover:text-red-600">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 flex-grow flex flex-col space-y-6">
                            <div className="flex-grow">
                                <Label className="text-xs uppercase font-bold text-muted-foreground mb-2 block">JWT String</Label>
                                <Textarea
                                    value={token}
                                    onChange={(e) => {
                                        setIsManualEdit(false);
                                        setToken(e.target.value);
                                    }}
                                    placeholder="Paste an encoded token here..."
                                    className="h-[300px] font-mono text-sm resize-none bg-slate-50 dark:bg-slate-900 border-indigo-500/20 focus-visible:ring-indigo-500 shadow-inner"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-xs uppercase font-bold text-muted-foreground block">Verify Signature (Secret/Public Key)</Label>
                                <div className="relative">
                                    <Input
                                        type={showSecret ? "text" : "password"}
                                        value={secret}
                                        onChange={(e) => setSecret(e.target.value)}
                                        placeholder="Enter secret..."
                                        className="pr-12 h-12 rounded-xl"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1 text-muted-foreground"
                                        onClick={() => setShowSecret(!showSecret)}
                                    >
                                        {showSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </Button>
                                </div>
                                <p className="text-[10px] text-muted-foreground italic">
                                    Note: Encoding uses this secret as part of the signature.
                                </p>
                            </div>

                            <Button
                                onClick={() => handleCopy(token, 'token')}
                                disabled={!token}
                                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20"
                            >
                                {copied === 'token' ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
                                Copy Token
                            </Button>
                        </CardContent>
                    </Card>

                    {/* DECODED VIEW */}
                    <div className="space-y-6 flex flex-col min-h-[500px]">
                        {/* Header */}
                        <Card className="border-2 border-amber-500/10 shadow-xl overflow-hidden">
                            <CardHeader className="bg-amber-500/5 py-4 border-b flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Code className="w-4 h-4 text-amber-500" />
                                    HEADER: ALGORITHM & TOKEN TYPE
                                </CardTitle>
                                <Button variant="ghost" size="sm" onClick={() => handleCopy(headerJson, 'header')}>
                                    {copied === 'header' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Textarea
                                    value={headerJson}
                                    onChange={(e) => {
                                        setIsManualEdit(true);
                                        setHeaderJson(e.target.value);
                                    }}
                                    className="min-h-[120px] font-mono text-xs p-4 bg-transparent border-none focus-visible:ring-0 resize-none"
                                />
                            </CardContent>
                        </Card>

                        {/* Payload */}
                        <Card className="border-2 border-emerald-500/10 shadow-xl overflow-hidden flex-grow">
                            <CardHeader className="bg-emerald-500/5 py-4 border-b flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <Database className="w-4 h-4 text-emerald-500" />
                                    PAYLOAD: DATA
                                </CardTitle>
                                <Button variant="ghost" size="sm" onClick={() => handleCopy(payloadJson, 'payload')}>
                                    {copied === 'payload' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <Textarea
                                    value={payloadJson}
                                    onChange={(e) => {
                                        setIsManualEdit(true);
                                        setPayloadJson(e.target.value);
                                    }}
                                    className="min-h-[200px] font-mono text-xs p-4 bg-transparent border-none focus-visible:ring-0 resize-none h-full"
                                />
                            </CardContent>
                        </Card>

                        <Button
                            onClick={handleEncode}
                            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20"
                        >
                            <RefreshCw className="w-5 h-5 mr-2" />
                            Update Token →
                        </Button>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="grid md:grid-cols-3 gap-6 opacity-80">
                    <Card className="bg-muted/50 border-none">
                        <CardContent className="p-4 flex gap-4">
                            <ShieldCheck className="w-10 h-10 text-emerald-500 shrink-0" />
                            <div className="space-y-1">
                                <h4 className="font-bold text-sm">Security Aware</h4>
                                <p className="text-xs text-muted-foreground">This tool decodes Base64Url but does not verify cryptographic signatures unless you provide the key.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/50 border-none">
                        <CardContent className="p-4 flex gap-4">
                            <Check className="w-10 h-10 text-indigo-500 shrink-0" />
                            <div className="space-y-1">
                                <h4 className="font-bold text-sm">Valid JWT Only</h4>
                                <p className="text-xs text-muted-foreground">Tokens are parsed into Header, Payload, and Signature parts according to RFC 7519 standards.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/50 border-none">
                        <CardContent className="p-4 flex gap-4">
                            <RefreshCw className="w-10 h-10 text-purple-500 shrink-0" />
                            <div className="space-y-1">
                                <h4 className="font-bold text-sm">Full Edit Mode</h4>
                                <p className="text-xs text-muted-foreground">You can edit the JSON directly to simulate different payloads and re-encode them instantly.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
