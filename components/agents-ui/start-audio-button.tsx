import { type ComponentProps } from 'react';
import { Room } from 'livekit-client';
import { useEnsureRoom, useStartAudio } from '@livekit/components-react';
import { Button } from '@/components/ui/button';

export interface StartAudioButtonProps extends ComponentProps<'button'> {
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  room?: Room;
  label: string;
}

export function StartAudioButton({
  size = 'default',
  variant = 'default',
  label,
  room,
  ...props
}: StartAudioButtonProps) {
  const roomEnsured = useEnsureRoom(room);
  // We use useStartAudio to get the click handler, 
  // but we are going to ignore the 'className' it tries to hide us with.
  const { mergedProps } = useStartAudio({ room: roomEnsured, props });

  return (
    <Button 
      size={size} 
      variant={variant} 
      {...props} 
      {...mergedProps}
      // FORCE display: block so the button doesn't hide itself!
      style={{ display: 'block', visibility: 'visible', opacity: 1 }}
    >
      {label}
    </Button>
  );
}