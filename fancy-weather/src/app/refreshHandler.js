import {getImageUrl} from "./getImgUrl";
import {createBackground} from "./utils";

async function refreshHandler(tags) {
  const iconRefresh = document.querySelector('.icon-refresh');

  iconRefresh.classList.add('icon-refresh--spin');

  const imageUrl = await getImageUrl(tags);

  createBackground(imageUrl);


}

export { refreshHandler };
