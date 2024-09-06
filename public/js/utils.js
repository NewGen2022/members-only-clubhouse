const formatDate = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000); // Difference in seconds

    const units = [
        { name: 'year', seconds: 31536000 }, // 365 * 24 * 60 * 60
        { name: 'month', seconds: 2592000 }, // 30 * 24 * 60 * 60
        { name: 'day', seconds: 86400 }, // 24 * 60 * 60
        { name: 'hour', seconds: 3600 }, // 60 * 60
        { name: 'minute', seconds: 60 },
        { name: 'second', seconds: 1 },
    ];

    for (let unit of units) {
        const count = Math.floor(diffInSeconds / unit.seconds);
        if (count >= 1) {
            return `${count} ${unit.name}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'Just now';
};

module.exports = { formatDate };
