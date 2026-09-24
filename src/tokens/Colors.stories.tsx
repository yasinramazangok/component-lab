import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * A live view of the color tokens in `tokens.css`.
 * Each swatch reads its value from the browser, so this page is never out of date.
 * Switch the theme in the toolbar to see the dark values.
 */
const tokens = [
  ['--color-ink', 'Primary button, headings'],
  ['--color-on-ink', 'Text on the primary button'],
  ['--color-text', 'Body text'],
  ['--color-text-muted', 'Subtitles, labels'],
  ['--color-text-subtle', 'Placeholders'],
  ['--color-surface', 'Inputs, secondary buttons'],
  ['--color-border', 'Input and outline borders'],
  ['--color-divider', 'Divider lines'],
  ['--color-badge', 'Icon badge background'],
  ['--color-canvas-start', 'Page background (start)'],
  ['--color-canvas-end', 'Page background (end)'],
  ['--color-danger', 'Errors'],
  ['--color-focus-ring', 'Keyboard focus'],
] as const;

function Swatch({ name, usage }: { name: string; usage: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).getPropertyValue(name).trim());
  });
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--font-body)' }}>
      <div style={{ width: 56, height: 56, borderRadius: 8, background: `var(${name})`, border: '1px solid var(--color-divider)' }} />
      <div style={{ display: 'grid', gap: 2 }}>
        <code style={{ fontSize: 14, color: 'var(--color-text)' }}>{name}</code>
        <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{usage} · {value}</span>
      </div>
    </div>
  );
}

function ColorPalette() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
      {tokens.map(([name, usage]) => <Swatch key={name} name={name} usage={usage} />)}
    </div>
  );
}

const meta = {
  title: 'Foundations/Colors',
  component: ColorPalette,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
