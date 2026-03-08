import { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Play, RotateCcw, Pause, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const ALGORITHMS = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Quick Sort'];

function generateArray(size: number) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
}

const DevAlgorithmVisualizerPage = () => {
  const [algo, setAlgo] = useState('Bubble Sort');
  const [size, setSize] = useState(20);
  const [arr, setArr] = useState(() => generateArray(20));
  const [sorting, setSorting] = useState(false);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const stopRef = useRef(false);

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

  const reset = () => { stopRef.current = true; setSorting(false); const a = generateArray(size); setArr(a); setComparing([]); setSorted([]); };

  const bubbleSort = useCallback(async () => {
    const a = [...arr]; setSorting(true); stopRef.current = false;
    for (let i = 0; i < a.length && !stopRef.current; i++) {
      for (let j = 0; j < a.length - i - 1 && !stopRef.current; j++) {
        setComparing([j, j + 1]);
        if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; setArr([...a]); }
        await delay(50);
      }
      setSorted(prev => [...prev, a.length - 1 - i]);
    }
    setComparing([]); setSorted(a.map((_, i) => i)); setSorting(false);
  }, [arr]);

  const selectionSort = useCallback(async () => {
    const a = [...arr]; setSorting(true); stopRef.current = false;
    for (let i = 0; i < a.length && !stopRef.current; i++) {
      let min = i;
      for (let j = i + 1; j < a.length && !stopRef.current; j++) {
        setComparing([min, j]); await delay(50);
        if (a[j] < a[min]) min = j;
      }
      [a[i], a[min]] = [a[min], a[i]]; setArr([...a]); setSorted(prev => [...prev, i]);
    }
    setComparing([]); setSorted(a.map((_, i) => i)); setSorting(false);
  }, [arr]);

  const insertionSort = useCallback(async () => {
    const a = [...arr]; setSorting(true); stopRef.current = false;
    for (let i = 1; i < a.length && !stopRef.current; i++) {
      let key = a[i], j = i - 1;
      while (j >= 0 && a[j] > key && !stopRef.current) {
        setComparing([j, j + 1]); a[j + 1] = a[j]; j--; setArr([...a]); await delay(50);
      }
      a[j + 1] = key; setArr([...a]); setSorted(prev => [...prev, i]);
    }
    setComparing([]); setSorted(a.map((_, i) => i)); setSorting(false);
  }, [arr]);

  const start = () => {
    if (algo === 'Bubble Sort') bubbleSort();
    else if (algo === 'Selection Sort') selectionSort();
    else if (algo === 'Insertion Sort') insertionSort();
    else bubbleSort(); // fallback
  };

  const maxVal = Math.max(...arr);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Code className="w-6 h-6 text-primary" /> Algorithm Visualizer</h1>
        <p className="text-sm text-muted-foreground">Watch sorting algorithms step by step</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3 flex-wrap items-center mb-4">
            <Select value={algo} onValueChange={setAlgo} disabled={sorting}>
              <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
              <SelectContent>{ALGORITHMS.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Size:</span>
              <Slider value={[size]} onValueChange={([v]) => { setSize(v); setArr(generateArray(v)); setSorted([]); setComparing([]); }}
                min={10} max={50} step={5} className="w-32" disabled={sorting} />
              <Badge variant="outline">{size}</Badge>
            </div>
            <Button onClick={start} disabled={sorting}><Play className="w-4 h-4 mr-2" />Sort</Button>
            <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-2" />Reset</Button>
          </div>

          <div className="flex items-end gap-[2px] h-[300px] bg-muted/20 rounded p-2">
            {arr.map((val, i) => (
              <motion.div key={i} layout transition={{ duration: 0.05 }}
                className={`flex-1 rounded-t ${sorted.includes(i) ? 'bg-green-500' : comparing.includes(i) ? 'bg-destructive' : 'bg-primary/70'}`}
                style={{ height: `${(val / maxVal) * 100}%` }} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm">Algorithm Info</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {algo === 'Bubble Sort' && <p>Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Time: O(n²), Space: O(1).</p>}
          {algo === 'Selection Sort' && <p>Selection Sort finds the minimum element and places it at the beginning, repeating for each position. Time: O(n²), Space: O(1).</p>}
          {algo === 'Insertion Sort' && <p>Insertion Sort builds the sorted array one item at a time by inserting each element into its correct position. Time: O(n²), Space: O(1).</p>}
          {algo === 'Quick Sort' && <p>Quick Sort selects a pivot element and partitions the array around it. Time: O(n log n) avg, O(n²) worst, Space: O(log n).</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default DevAlgorithmVisualizerPage;
