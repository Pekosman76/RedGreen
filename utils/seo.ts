
export const updateMeta = (title: string, description: string) => {
  document.title = `${title} | RedFlag / GreenFlag`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  }
};
