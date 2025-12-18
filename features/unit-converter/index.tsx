"use client"

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
    Calculator,
    ArrowRightLeft,
    Zap,
    Scale,
    Ruler,
    Thermometer,
    Zap as Flash,
    RefreshCw,
    ClipboardPaste,
    Copy,
    Check,
    Box
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'

type Category = 'length' | 'weight' | 'temp'

interface Unit {
    label: string
    value: string
    ratio?: number // standard is meter/kg/celsius
}

const UNITS: Record<Category, Unit[]> = {
    length: [
        { label: 'Meters (m)', value: 'm', ratio: 1 },
        { label: 'Kilometers (km)', value: 'km', ratio: 1000 },
        { label: 'Centimeters (cm)', value: 'cm', ratio: 0.01 },
        { label: 'Miles (mi)', value: 'mi', ratio: 1609.34 },
        { label: 'Inches (in)', value: 'in', ratio: 0.0254 },
        { label: 'Feet (ft)', value: 'ft', ratio: 0.3048 }
    ],
    weight: [
        { label: 'Kilograms (kg)', value: 'kg', ratio: 1 },
        { label: 'Grams (g)', value: 'g', ratio: 0.001 },
        { label: 'Pounds (lb)', value: 'lb', ratio: 0.453592 },
        { label: 'Ounces (oz)', value: 'oz', ratio: 0.0283495 }
    ],
    temp: [
        { label: 'Celsius (°C)', value: 'c' },
        { label: 'Fahrenheit (°F)', value: 'f' },
        { label: 'Kelvin (K)', value: 'k' }
    ]
}

export default function UnitConverterContent() {
    const [category, setCategory] = useState<Category>('length')
    const [value, setValue] = useState('')
    const [fromUnit, setFromUnit] = useState(UNITS.length[0].value)
    const [toUnit, setToUnit] = useState(UNITS.length[1].value)
    const [copied, setCopied] = useState(false)

    const result = useMemo(() => {
        const num = parseFloat(value)
        if (isNaN(num)) return ''

        if (category === 'temp') {
            let celsius = num
            if (fromUnit === 'f') celsius = (num - 32) * 5 / 9
            if (fromUnit === 'k') celsius = num - 273.15

            if (toUnit === 'c') return celsius.toFixed(2)
            if (toUnit === 'f') return (celsius * 9 / 5 + 32).toFixed(2)
            if (toUnit === 'k') return (celsius + 273.15).toFixed(2)
            return ''
        } else {
            const units = UNITS[category]
            const from = units.find(u => u.value === fromUnit)
            const to = units.find(u => u.value === toUnit)
            if (!from || !to) return ''
            return ((num * from.ratio!) / to.ratio!).toFixed(4)
        }
    }, [value, fromUnit, toUnit, category])

    const swap = () => {
        setFromUnit(toUnit)
        setToUnit(fromUnit)
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
            <div className="container relative z-10 max-w-4xl mx-auto px-4 space-y-8">
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-1"
                    >
                        <Scale className="h-4 w-4" />
                        Scientific Conversion
                    </motion.div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">Unit <span className="text-primary">Converter</span></h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                        Quickly convert between different units of measurement.
                    </p>
                </header>

                <div className="grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-12">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-[2rem] blur opacity-50 transition duration-500" />
                            <div className="relative bg-card border-2 border-border rounded-[2rem] p-6 md:p-8 shadow-2xl space-y-8">

                                {/* Category Tabs */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {(['length', 'weight', 'temp'] as const).map(c => (
                                        <button
                                            key={c}
                                            onClick={() => {
                                                setCategory(c)
                                                setFromUnit(UNITS[c][0].value)
                                                setToUnit(UNITS[c][1].value)
                                            }}
                                            className={cn(
                                                "px-5 py-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all",
                                                category === c
                                                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                                                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                            )}
                                        >
                                            {c === 'length' && <Ruler className="h-4 w-4" />}
                                            {c === 'weight' && <Scale className="h-4 w-4" />}
                                            {c === 'temp' && <Thermometer className="h-4 w-4" />}
                                            {c}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid md:grid-cols-11 gap-4 items-center">
                                    {/* From */}
                                    <div className="md:col-span-5 space-y-3">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-[10px] font-bold uppercase text-muted-foreground ml-1">
                                                <span>From</span>
                                                <span>{UNITS[category].find(u => u.value === fromUnit)?.label}</span>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={value}
                                                    onChange={(e) => setValue(e.target.value)}
                                                    placeholder="0.00"
                                                    className="w-full bg-muted/30 border-2 border-border p-5 rounded-2xl text-2xl font-black focus:border-primary outline-none transition-all placeholder:opacity-20"
                                                />
                                                <div className="mt-2">
                                                    <Select value={fromUnit} onValueChange={setFromUnit}>
                                                        <SelectTrigger className="w-full h-10 rounded-xl bg-background">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {UNITS[category].map(u => (
                                                                <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Swap */}
                                    <div className="md:col-span-1 flex justify-center">
                                        <Button
                                            variant="ghost"
                                            onClick={swap}
                                            className="rounded-full w-10 h-10 bg-primary/10 text-primary hover:bg-primary/20"
                                        >
                                            <ArrowRightLeft className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    {/* To */}
                                    <div className="md:col-span-5 space-y-3">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center text-[10px] font-bold uppercase text-muted-foreground ml-1">
                                                <span>To</span>
                                                <span>{UNITS[category].find(u => u.value === toUnit)?.label}</span>
                                            </div>
                                            <div className="relative">
                                                <div className="w-full bg-primary/5 border-2 border-primary/20 p-5 rounded-2xl text-2xl font-black text-primary overflow-hidden min-h-[72px]">
                                                    {result || '0.00'}
                                                </div>
                                                <div className="mt-2">
                                                    <Select value={toUnit} onValueChange={setToUnit}>
                                                        <SelectTrigger className="w-full h-10 rounded-xl bg-background">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {UNITS[category].map(u => (
                                                                <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <Button
                                        disabled={!result}
                                        onClick={() => {
                                            navigator.clipboard.writeText(result)
                                            setCopied(true)
                                            setTimeout(() => setCopied(false), 2000)
                                        }}
                                        className={cn(
                                            "rounded-xl px-10 h-12 font-black uppercase tracking-widest shadow-lg transition-all",
                                            copied ? "bg-green-500 hover:bg-green-600 shadow-green-500/20" : "shadow-primary/20"
                                        )}
                                    >
                                        {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                        {copied ? 'Copied' : 'Copy Result'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-8 bg-muted/20 border border-border rounded-3xl space-y-4">
                        <Box className="h-6 w-6 text-primary" />
                        <h4 className="font-bold">Multiple Scales</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Support for Imperial, Metric, and SI units. Perfectly calculated for accuracy.
                        </p>
                    </div>
                    <div className="p-8 bg-muted/20 border border-border rounded-3xl space-y-4">
                        <Zap className="h-6 w-6 text-primary" />
                        <h4 className="font-bold">Real-time</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            No "Calculate" button needed. See your results instantly as you type.
                        </p>
                    </div>
                    <div className="p-8 bg-muted/20 border border-border rounded-3xl space-y-4">
                        <Calculator className="h-6 w-6 text-primary" />
                        <h4 className="font-bold">Scientific Accuracy</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            We use double-precision floating point math to ensure your conversions are correct for engineering tasks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
