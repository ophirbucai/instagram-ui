import React, { useMemo } from 'react';
import { formatDistanceToNow, format } from 'date-fns';

function PostDate({date}) {
    const displayedDate = useMemo(() => {
        const yesterday = new Date(new Date().getTime() - (12 * 60 * 60 * 1000));
        const formattedDate = new Date(date)
        if (yesterday > formattedDate) {
            return format(formattedDate, 'eeee, MMM dd yyyy, h:mm');
        } else {
            return formatDistanceToNow(formattedDate, {addSuffix: true});
        }
    }, [date])

    return (
        <span>{displayedDate}</span>
    );
}

export default PostDate;