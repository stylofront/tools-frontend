'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

// Simple Markdown to HTML converter
function markdownToHtml(md: string): string {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Bold and Italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" />');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Lists
    html = html.replace(/^\* (.*$)/gm, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
    html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');

    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr />');

    // Paragraphs (simple)
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><\/p>/g, '');

    return html;
}

export default function MarkdownHtmlContent() {
    const [markdown, setMarkdown] = useState(`# Hello World

This is a **markdown** to *HTML* converter.

## Features

- Real-time preview
- **Bold** and *italic* text
- [Links](https://example.com)
- \`inline code\`

> Blockquote example

---

### Code Block

\`\`\`
function hello() {
    console.log("Hello!");
}
\`\`\`
`);
    const [copied, setCopied] = useState(false);
    const [view, setView] = useState<'preview' | 'html'>('preview');

    const html = useMemo(() => markdownToHtml(markdown), [markdown]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(html);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-500/5">
            <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-6">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-500 via-gray-500 to-zinc-500">
                            Markdown → HTML
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Convert Markdown to HTML instantly with live preview.
                    </p>
                </header>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Markdown Input */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold">Markdown</label>
                            <Button size="sm" variant="ghost" onClick={() => setMarkdown('')}>Clear</Button>
                        </div>
                        <textarea
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            placeholder="Enter markdown here..."
                            className="w-full h-[500px] p-4 rounded-xl bg-card border border-border resize-none focus:outline-none focus:ring-2 focus:ring-slate-500/50 font-mono text-sm"
                            spellCheck={false}
                        />
                    </div>

                    {/* Output */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setView('preview')}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium ${view === 'preview' ? 'bg-slate-500 text-white' : 'bg-secondary'}`}
                                >
                                    Preview
                                </button>
                                <button
                                    onClick={() => setView('html')}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium ${view === 'html' ? 'bg-slate-500 text-white' : 'bg-secondary'}`}
                                >
                                    HTML
                                </button>
                            </div>
                            <Button size="sm" variant="outline" onClick={handleCopy}>
                                {copied ? '✓ Copied!' : 'Copy HTML'}
                            </Button>
                        </div>

                        {view === 'preview' ? (
                            <div
                                className="w-full h-[500px] p-6 rounded-xl bg-card border border-border overflow-auto prose prose-sm dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        ) : (
                            <pre className="w-full h-[500px] p-4 rounded-xl bg-card border border-slate-500/30 overflow-auto font-mono text-xs whitespace-pre-wrap">
                                {html}
                            </pre>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
