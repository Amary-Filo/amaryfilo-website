export const getImagePath = (
  name: string | undefined,
  slug: string | undefined,
  path: string
): string => {
  return `assets/${path}/images/${slug}/${name}`;
};
