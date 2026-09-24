import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { BackButton } from './BackButton';

const meta = {
  title: 'Components/BackButton',
  component: BackButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { label: 'Back', onClick: fn() },
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Shown at the top of the password step. */
export const Default: Story = {};

/** Clicking it calls `onClick`, so the screen can go back one step. */
export const TestClick: Story = {
  tags: ['test'],
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Back' }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
