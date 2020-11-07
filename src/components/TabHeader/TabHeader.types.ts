import { PropsWithChildren } from 'react';
import { PropsWithClassName } from 'typings/common';

export type TabHeaderProps = PropsWithChildren<
  PropsWithClassName<{
    title: string;
    showSpinner?: boolean;
  }>
>;
