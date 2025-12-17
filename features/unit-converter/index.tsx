'use client';

import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';

const UNITS = {
    length: {
        name: 'Length',
        units: {
            meter: { name: 'Meters', symbol: 'm', factor: 1 },
            kilometer: { name: 'Kilometers', symbol: 'km', factor: 1000 },
            centimeter: { name: 'Centimeters', symbol: 'cm', factor: 0.01 },
            millimeter: { name: 'Millimeters', symbol: 'mm', factor: 0.001 },
            mile: { name: 'Miles', symbol: 'mi', factor: 1609.344 },
            yard: { name: 'Yards', symbol: 'yd', factor: 0.9144 },
            foot: { name: 'Feet', symbol: 'ft', factor: 0.3048 },
            inch: { name: 'Inches', symbol: 'in', factor: 0.0254 },
        }
    },
    weight: {
        name: 'Weight',
        units: {
            kilogram: { name: 'Kilograms', symbol: 'kg', factor: 1 },
            gram: { name: 'Grams', symbol: 'g', factor: 0.001 },
            milligram: { name: 'Milligrams', symbol: 'mg', factor: 0.000001 },
            pound: { name: 'Pounds', symbol: 'lb', factor: 0.453592 },
            ounce: { name: 'Ounces', symbol: 'oz', factor: 0.0283495 },
        }
    },
    temperature: {
        name: 'Temperature',
        units: {
            celsius: { name: 'Celsius', symbol: '°C', factor: 1 },
            fahrenheit: { name: 'Fahrenheit', symbol: '°F', factor: 1 },
            kelvin: { name: 'Kelvin', symbol: 'K', factor: 1 },
        }
    },
    data: {
        name: 'Data',
        units: {
            byte: { name: 'Bytes', symbol: 'B', factor: 1 },
            kilobyte: { name: 'Kilobytes', symbol: 'KB', factor: 1024 },
            megabyte: { name: 'Megabytes', symbol: 'MB', factor: 1048576 },
            gigabyte: { name: 'Gigabytes', symbol: 'GB', factor: 1073741824 },
            terabyte: { name: 'Terabytes', symbol: 'TB', factor: 1099511627776 },
        }
    }
};

export default function UnitConverterContent() {
    const [category, setCategory] = useState<keyof typeof UNITS>('length');
    const [fromUnit, setFromUnit] = useState('meter');
    const [toUnit, setToUnit] = useState('foot');
    const [value, setValue] = useState('1');

    const convert = useMemo(() => {
        const num = parseFloat(value) || 0;
        const cat = UNITS[category];
        const units = cat.units as Record<string, { factor: number }>;

        if (category === 'temperature') {
            // Special handling for temperature
            let celsius = num;
            if (fromUnit === 'fahrenheit') celsius = (num - 32) * 5 / 9;
            if (fromUnit === 'kelvin') celsius = num - 273.15;

            if (toUnit === 'celsius') return celsius;
            if (toUnit === 'fahrenheit') return celsius * 9 / 5 + 32;
            if (toUnit === 'kelvin') return celsius + 273.15;
        }

        const baseValue = num * units[fromUnit].factor;
        return baseValue / units[toUnit].factor;
    }, [value, category, fromUnit, toUnit]);

    const unitOptions = Object.entries(UNITS[category].units);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-violet-500/5">
            <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500">
                            Unit Converter
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Convert between different units of length, weight, temperature, and data.
                    </p>
                </header>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-2">
                    {Object.entries(UNITS).map(([key, val]) => (
                        <button
                            key={key}
                            onClick={() => {
                                setCategory(key as keyof typeof UNITS);
                                const units = Object.keys(val.units);
                                setFromUnit(units[0]);
                                setToUnit(units[1]);
                            }}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === key
                                    ? 'bg-violet-500 text-white shadow-lg'
                                    : 'bg-secondary hover:bg-violet-500/20'
                                }`}
                        >
                            {val.name}
                        </button>
                    ))}
                </div>

                {/* Converter */}
                <div className="p-6 rounded-2xl bg-card border border-border shadow-lg space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        {/* From */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted-foreground">From</label>
                            <input
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-2xl font-bold text-center"
                            />
                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border font-medium"
                            >
                                {unitOptions.map(([key, unit]) => (
                                    <option key={key} value={key}>{(unit as { name: string }).name}</option>
                                ))}
                            </select>
                        </div>

                        {/* To */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted-foreground">To</label>
                            <div className="w-full px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/30 text-2xl font-bold text-center text-violet-500">
                                {convert.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                            </div>
                            <select
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border font-medium"
                            >
                                {unitOptions.map(([key, unit]) => (
                                    <option key={key} value={key}>{(unit as { name: string }).name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                        <Button
                            variant="outline"
                            onClick={() => {
                                const temp = fromUnit;
                                setFromUnit(toUnit);
                                setToUnit(temp);
                            }}
                        >
                            ↔ Swap Units
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
