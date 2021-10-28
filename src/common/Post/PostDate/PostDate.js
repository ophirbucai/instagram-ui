import React, { useMemo } from 'react';
import { formatDistanceToNow, format } from 'date-fns';

function PostDate({date}) {
    const displayedDate = useMemo(() => {
        const yesterday = new Date(new Date().getTime() - (12 * 60 * 60 * 1000));
        const formattedDate = new Date(date)
        if (yesterday > formattedDate) {
            return format(formattedDate, 'MM/dd/yy hh:mm', {includeDays: true});
        } else {
            return formatDistanceToNow(formattedDate) + ' ago';
        }
    }, [date])

    return (
        <span>
            {displayedDate}
        </span>
    );
}

export default PostDate;