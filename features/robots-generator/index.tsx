'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cpu, Copy, Check, Plus, Trash2, Download, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface RobotsRule {
    id: string;
    userAgent: string;
    allow: string[];
    disallow: string[];
}

export default function RobotsGeneratorContent() {
    const [sitemapUrl, setSitemapUrl] = useState('');
    const [rules, setRules] = useState<RobotsRule[]>([
        { id: '1', userAgent: '*', allow: [], disallow: ['/cgi-bin/'] }
    ]);
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const generateRobots = useCallback(() => {
        let content = '';

        rules.forEach(rule => {
            content += `User-agent: ${rule.userAgent}\n`;
            rule.disallow.forEach(path => {
                if (path) content += `Disallow: ${path}\n`;
            });
            rule.allow.forEach(path => {
                if (path) content += `Allow: ${path}\n`;
            });
            content += '\n';
        });

        if (sitemapUrl) {
            content += `Sitemap: ${sitemapUrl}\n`;
        }

        setOutput(content.trim());
    }, [rules, sitemapUrl]);

    useEffect(() => {
        generateRobots();
    }, [generateRobots]);

    const addRule = () => {
        setRules([...rules, {
            id: Math.random().toString(36).substr(2, 9),
            userAgent: '*',
            allow: [],
            disallow: []
        }]);
    };

    const removeRule = (id: string) => {
        if (rules.length === 1) {
            toast.error("At least one rule is required");
            return;
        }
        setRules(rules.filter(r => r.id !== id));
    };

    const updateRule = (id: string, updates: Partial<RobotsRule>) => {
        setRules(rules.map(r => r.id === id ? { ...r, ...updates } : r));
    };

    const addPath = (ruleId: string, type: 'allow' | 'disallow') => {
        setRules(rules.map(r => {
            if (r.id === ruleId) {
                return { ...r, [type]: [...r[type], ''] };
            }
            return r;
        }));
    };

    const updatePath = (ruleId: string, type: 'allow' | 'disallow', index: number, value: string) => {
        setRules(rules.map(r => {
            if (r.id === ruleId) {
                const newPaths = [...r[type]];
                newPaths[index] = value;
                return { ...r, [type]: newPaths };
            }
            return r;
        }));
    };

    const removePath = (ruleId: string, type: 'allow' | 'disallow', index: number) => {
        setRules(rules.map(r => {
            if (r.id === ruleId) {
                const newPaths = [...r[type]];
                newPaths.splice(index, 1);
                return { ...r, [type]: newPaths };
            }
            return r;
        }));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        toast.success("Robots.txt copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'robots.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-500/5">
            <div className="container max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400">
                            Robots.txt Generator
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Create a perfectly formatted robots.txt file to guide search engine crawlers.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Editor */}
                    <div className="space-y-6">
                        <Card className="border-slate-500/10 shadow-lg">
                            <CardHeader className="bg-slate-500/5">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-slate-500" />
                                    General Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-2">
                                    <Label htmlFor="sitemap">Sitemap URL (Optional)</Label>
                                    <Input
                                        id="sitemap"
                                        placeholder="https://example.com/sitemap.xml"
                                        value={sitemapUrl}
                                        onChange={(e) => setSitemapUrl(e.target.value)}
                                        className="h-11 rounded-lg border-2 focus-visible:ring-slate-500/50"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <h3 className="font-bold text-slate-700 dark:text-slate-300">Crawler Rules</h3>
                                <Button onClick={addRule} variant="outline" size="sm" className="rounded-lg h-9">
                                    <Plus className="w-4 h-4 mr-1" /> Add Rule
                                </Button>
                            </div>

                            {rules.map((rule) => (
                                <Card key={rule.id} className="border-slate-500/10 shadow-md">
                                    <CardContent className="p-5 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-grow space-y-1.5">
                                                <Label className="text-xs uppercase text-slate-500">User Agent</Label>
                                                <Input
                                                    value={rule.userAgent}
                                                    onChange={(e) => updateRule(rule.id, { userAgent: e.target.value })}
                                                    placeholder="*"
                                                    className="h-9 font-mono"
                                                />
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeRule(rule.id)}
                                                className="mt-6 text-red-500 hover:text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Disallow Paths */}
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <Label className="text-xs font-bold text-red-500">Disallow</Label>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => addPath(rule.id, 'disallow')}>
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <div className="space-y-2">
                                                    {rule.disallow.map((path, idx) => (
                                                        <div key={idx} className="flex gap-2">
                                                            <Input
                                                                value={path}
                                                                onChange={(e) => updatePath(rule.id, 'disallow', idx, e.target.value)}
                                                                placeholder="/private/"
                                                                className="h-8 text-xs font-mono"
                                                            />
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400" onClick={() => removePath(rule.id, 'disallow', idx)}>
                                                                <Trash2 className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    {rule.disallow.length === 0 && <p className="text-[10px] text-muted-foreground italic text-center py-2">No disallow rules</p>}
                                                </div>
                                            </div>

                                            {/* Allow Paths */}
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <Label className="text-xs font-bold text-emerald-500">Allow</Label>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => addPath(rule.id, 'allow')}>
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <div className="space-y-2">
                                                    {rule.allow.map((path, idx) => (
                                                        <div key={idx} className="flex gap-2">
                                                            <Input
                                                                value={path}
                                                                onChange={(e) => updatePath(rule.id, 'allow', idx, e.target.value)}
                                                                placeholder="/public/"
                                                                className="h-8 text-xs font-mono"
                                                            />
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400" onClick={() => removePath(rule.id, 'allow', idx)}>
                                                                <Trash2 className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    {rule.allow.length === 0 && <p className="text-[10px] text-muted-foreground italic text-center py-2">No allow rules</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Preview */}
                    <Card className="border-slate-500/10 shadow-xl overflow-hidden self-start sticky top-8">
                        <CardHeader className="bg-slate-900 dark:bg-slate-950 text-white">
                            <CardTitle className="text-lg flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Cpu className="w-5 h-5 text-slate-400" />
                                    Preview: robots.txt
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 text-slate-300 hover:text-white hover:bg-slate-800">
                                        {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                                        {copied ? 'Copied' : 'Copy'}
                                    </Button>
                                    <Button size="sm" onClick={handleDownload} className="h-8 bg-slate-700 hover:bg-slate-600 text-white">
                                        <Download className="w-4 h-4 mr-1" /> Export
                                    </Button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="bg-slate-800 dark:bg-black p-6 min-h-[400px]">
                                <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                                    {output || "# Configuration empty"}
                                </pre>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-100 dark:bg-slate-900/50 p-4 border-t">
                            <p className="text-xs text-muted-foreground">
                                Tip: Place this file in the root directory of your website.
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
