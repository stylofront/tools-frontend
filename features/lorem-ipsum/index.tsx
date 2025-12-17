'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const LOREM_WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

export default function LoremIpsumContent() {
    const [output, setOutput] = useState('');
    const [count, setCount] = useState(3);
    const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
    const [copied, setCopied] = useState(false);

    const getRandomWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

    const generateSentence = (wordCount: number = 12) => {
        const words = Array.from({ length: wordCount }, getRandomWord);
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(' ') + '.';
    };

    const generateParagraph = (sentenceCount: number = 5) => {
        return Array.from({ length: sentenceCount }, () =>
            generateSentence(8 + Math.floor(Math.random() * 8))
        ).join(' ');
    };

    const generate = useCallback(() => {
        let result = '';
        switch (type) {
            case 'words':
                result = Array.from({ length: count }, getRandomWord).join(' ');
                break;
            case 'sentences':
                result = Array.from({ length: count }, () => generateSentence()).join(' ');
                break;
            case 'paragraphs':
                result = Array.from({ length: count }, () => generateParagraph()).join('\n\n');
                break;
        }
        // Always start with "Lorem ipsum dolor sit amet"
        if (result.length > 0) {
            const classic = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            result = classic + ' ' + result.slice(result.indexOf(' ') + 1);
        }
        setOutput(result);
    }, [count, type]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-stone-500/5">
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-stone-600 via-stone-500 to-stone-400">
                            Lorem Ipsum
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Generate placeholder text for your designs and mockups.
                    </p>
                </header>

                {/* Controls */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-lg space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium">Generate</label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={count}
                                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-20 px-3 py-2 rounded-xl bg-secondary border border-border text-center font-bold"
                            />
                        </div>
                        <div className="flex gap-2">
                            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${type === t
                                            ? 'bg-stone-500 text-white'
                                            : 'bg-secondary hover:bg-stone-500/20'
                                        }`}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <Button
                        onClick={generate}
                        className="w-full h-12 rounded-xl font-bold bg-gradient-to-r from-stone-600 to-stone-500 hover:from-stone-700 hover:to-stone-600"
                    >
                        Generate Lorem Ipsum
                    </Button>
                </div>

                {/* Output */}
                {output && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold">Generated Text</h2>
                            <Button variant="outline" size="sm" onClick={handleCopy}>
                                {copied ? '✓ Copied!' : 'Copy'}
                            </Button>
                        </div>
                        <div className="p-6 rounded-2xl bg-card border border-border max-h-[400px] overflow-y-auto">
                            <p className="whitespace-pre-wrap leading-relaxed font-serif text-muted-foreground">
                                {output}
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground text-right">
                            {output.split(/\s+/).length} words • {output.length} characters
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
