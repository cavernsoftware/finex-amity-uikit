import React, { useEffect, useState, useMemo } from 'react';

import { DateContainer } from './styles';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

function getTimeAgo(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();

  if (diff < MINUTE) {
    return 'Just now';
  }

  if (diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE);
    return `${minutes}m`;
  }

  if (diff < DAY) {
    const hours = Math.floor(diff / HOUR);
    return `${hours}h`;
  }

  if (diff < WEEK) {
    const days = Math.floor(diff / DAY);
    return `${days}d`;
  }

  const weeks = Math.floor(diff / WEEK);
  return `${weeks}w`;
}

export function CustomTimeAgo({ date }: { date: Date }) {
  const [, setUpdate] = useState(0);

  // Determine update interval based on time difference
  const updateInterval = useMemo(() => {
    const diff = Date.now() - date.getTime();
    if (diff < HOUR) return MINUTE; // Update every minute if less than an hour old
    if (diff < DAY) return HOUR; // Update every hour if less than a day old
    if (diff < WEEK) return DAY; // Update every day if less than a week old
    return WEEK; // Update every week otherwise
  }, [date]);

  useEffect(() => {
    const timer = setInterval(() => {
      setUpdate((prev) => prev + 1);
    }, updateInterval);

    return () => clearInterval(timer);
  }, [updateInterval]);

  const timeAgo = useMemo(() => getTimeAgo(date), [date, updateInterval]);

  return <span title={date.toLocaleString()}>{timeAgo}</span>;
}

export interface TimeProps {
  className?: string;
  date?: number;
}

export const Time = ({ className, date = Date.now() }: TimeProps) => {
  const isValidDate = !isNaN(date);

  return (
    <DateContainer className={className}>
      {isValidDate && <CustomTimeAgo date={new Date(date)} />}
    </DateContainer>
  );
};

export default Time;
