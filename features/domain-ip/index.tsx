'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Copy, Check, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function DomainIpContent() {
    const [domain, setDomain] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    const handleLookup = async () => {
        if (!domain) {
            toast.error("Please enter a domain");
            return;
        }

        setLoading(true);
        setResults([]);
        try {
            // Remove protocol if present
            const cleanDomain = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

            const response = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=A`);
            const data = await response.json();

            if (data.Answer) {
                setResults(data.Answer);
            } else {
                toast.error("No IP addresses found for this domain");
            }
        } catch (error) {
            console.error("Lookup failed:", error);
            toast.error("Failed to fetch IP addresses. Please check the domain.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-500/5">
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                            Domain to IP
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Quickly find the IP addresses associated with any domain name.
                    </p>
                </header>

                <Card className="border-2 border-blue-500/10 shadow-xl overflow-hidden">
                    <CardHeader className="bg-blue-500/5">
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-blue-500" />
                            Lookup Configuration
                        </CardTitle>
                        <CardDescription>Enter a domain name to resolve its A records.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Input
                                placeholder="example.com"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                className="h-12 text-lg rounded-xl border-2 focus-visible:ring-blue-500/50"
                                onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                            />
                            <Button
                                onClick={handleLookup}
                                disabled={loading || !domain}
                                className="h-12 px-8 rounded-xl font-bold bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/20 active:scale-95 transition-all w-full sm:w-auto"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Resolving...
                                    </>
                                ) : (
                                    "Lookup IP"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {results.length > 0 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-xl font-bold flex items-center gap-2 px-2">
                            <ArrowRight className="w-5 h-5 text-blue-500" />
                            Resolution Results
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {results.map((answer, index) => (
                                <Card key={index} className="border-blue-500/10 hover:border-blue-500/30 transition-colors shadow-md">
                                    <CardContent className="p-4 flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Type {answer.type === 1 ? 'A (IPv4)' : 'AAAA (IPv6)'}</p>
                                            <p className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">{answer.data}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleCopy(answer.data)}
                                            className="rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                                        >
                                            {copied === answer.data ? (
                                                <Check className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <Copy className="w-5 h-5" />
                                            )}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
