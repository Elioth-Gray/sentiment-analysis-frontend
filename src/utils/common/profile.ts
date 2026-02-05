export const getInitials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const profile = {
  username: 'snpmb_id',
  full_name: 'SNPMB',
  url: 'https://www.instagram.com/snpmb_id/',
};
