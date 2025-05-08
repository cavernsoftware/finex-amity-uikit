import React, { useState, useEffect, useMemo } from 'react';
import { useAmityElement } from '~/v4/core/hooks/uikit';
import styles from './Timestamp.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Typography } from '~/v4/core/components';

// FINEX: Set constants
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

// FINEX: Implement custom time ago
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
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(date));
  const formatted = useMemo(() => dayjs(date).format('dddd, MMMM D, YYYY h:mm A'), [date]);

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
      setTimeAgo(getTimeAgo(date));
    }, updateInterval);

    return () => {
      clearInterval(timer);
    }
  }, [updateInterval]);

  return <span title={formatted}>{timeAgo}</span>;
}


dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'Just now',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: function (number: number, withoutSuffix: string, key: string, isFuture: boolean) {
      if (isFuture) return number + 'M';
      const date = dayjs().subtract(number, 'M');
      const currentDate = dayjs();
      if (date.get('year') === currentDate.get('year')) {
        return date.format('D MMM');
      }
      return date.format('D MMM YYYY');
    },
    MM: function (number: number, withoutSuffix: string, key: string, isFuture: boolean) {
      if (isFuture) return number + 'M';
      const date = dayjs().subtract(number, 'M');
      const currentDate = dayjs();
      if (date.get('year') === currentDate.get('year')) {
        return date.format('D MMM');
      }
      return date.format('D MMM YYYY');
    },
    y: function (number: number, withoutSuffix: string, key: string, isFuture: boolean) {
      if (isFuture) return number + 'y';
      const date = dayjs().subtract(number, 'y');
      const currentDate = dayjs();
      if (date.get('year') === currentDate.get('year')) {
        return date.format('D MMM');
      }
      return date.format('D MMM YYYY');
    },
    yy: function (number: number, withoutSuffix: string, key: string, isFuture: boolean) {
      if (isFuture) return number + 'y';
      const date = dayjs().subtract(number, 'y');
      const currentDate = dayjs();
      if (date.get('year') === currentDate.get('year')) {
        return date.format('D MMM');
      }
      return date.format('D MMM YYYY');
    },
  },
});

interface TimestampProps {
  pageId?: string;
  componentId?: string;
  timestamp: Date | string;
}

export function Timestamp({ pageId = '*', componentId = '*', timestamp }: TimestampProps) {
  const elementId = 'timestamp';
  const { accessibilityId, isExcluded, themeStyles } = useAmityElement({
    pageId,
    componentId,
    elementId,
  });

  // FINEX: Commented out since we're using custom time ago
  // const relativeTimeStr = dayjs(timestamp).fromNow();

  if (isExcluded) return null;

  return (
    <Typography.Caption
      className={styles.timestamp}
      style={themeStyles}
      data-testid={accessibilityId}
    >
      {/* // FINEX: Use custom time ago */}
      {/* {relativeTimeStr} */}
      <CustomTimeAgo date={new Date(timestamp)} />
    </Typography.Caption>
  );
}
