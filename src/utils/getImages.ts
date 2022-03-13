import iTile from '../assets/images/iTile.png';
import jTile from '../assets/images/jTile.png';
import lTile from '../assets/images/lTile.png';
import qTile from '../assets/images/qTile.png';
import sTile from '../assets/images/sTile.png';
import tTile from '../assets/images/tTile.png';
import zTile from '../assets/images/zTile.png';

import Image from '../entities/Image';

const getImages = ((): Image[] => {
    return [
        new Image('iTile', iTile),
        new Image('jTile', jTile),
        new Image('lTile', lTile),
        new Image('qTile', qTile),
        new Image('sTile', sTile),
        new Image('tTile', tTile),
        new Image('zTile', zTile)
    ];
})();

export default getImages;