// File: utils/generateThumbnail.js
module.exports = (title) => {
    const baseUrl = 'https://ui-avatars.com/api/';
    const query = `?name=${encodeURIComponent(title)}&size=500&rounded=true&background=random`;
    return baseUrl + query;
  };
  