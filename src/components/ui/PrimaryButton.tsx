import React from 'react';

import Button from '@/components/Button';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled,
}: Props) {
  return (
    <Button
      title={title}
      onPress={onPress}
      disabled={disabled}
    />
  );
}