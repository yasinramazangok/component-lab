import type { Meta, StoryObj } from '@storybook/react-vite';
import { LockIcon, MailIcon, SparkIcon } from '../../icons';
import { IconBadge } from './IconBadge';

const meta = {
  title: 'Components/IconBadge',
  component: IconBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { size: 'lg', children: <LockIcon size={40} /> },
  argTypes: { size: { control: 'inline-radio', options: ['md', 'lg'] }, children: { control: false } },
} satisfies Meta<typeof IconBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Shown above "Enter your password". */
export const Lock: Story = {};

/** A welcome badge for the first step. */
export const Welcome: Story = {
  args: { children: <SparkIcon size={36} /> },
};

/** Both sizes with different icons. */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <IconBadge size="md"><MailIcon size={28} /></IconBadge>
      <IconBadge size="lg"><LockIcon size={40} /></IconBadge>
    </div>
  ),
};
