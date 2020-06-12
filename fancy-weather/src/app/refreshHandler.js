import { getImageUrl } from './getImgUrl';
import { createBackground } from './utils';

async function refreshHandler(tags) {
  const imageUrl = await getImageUrl(tags);

  createBackground(imageUrl);
}

export { refreshHandler };
