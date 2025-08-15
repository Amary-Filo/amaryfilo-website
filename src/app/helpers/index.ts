export const getImagePath = (
  name: string | undefined,
  slug: string | undefined
): string => {
  return `assets/designs/images/${slug}/${name}`;
};
