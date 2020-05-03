/* eslint-disable camelcase */
import Foundation_ttf from 'react-web-vector-icons/fonts/Foundation.ttf';
import FontAwesome_ttf from 'react-web-vector-icons/fonts/FontAwesome.ttf';
import Entypo_ttf from 'react-web-vector-icons/fonts/Entypo.ttf';
import MaterialCommunityIcons_ttf from 'react-web-vector-icons/fonts/MaterialCommunityIcons.ttf';

const IconsCSS = `
@font-face {
  src: url(${Foundation_ttf});
  font-family: Foundation;
}
@font-face {
  src: url(${FontAwesome_ttf});
  font-family: FontAwesome;
}
@font-face {
  src: url(${MaterialCommunityIcons_ttf});
  font-family: MaterialCommunityIcons;
}
@font-face {
  src: url(${Entypo_ttf});
  font-family: Entypo;
}
`;

const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) style.styleSheet.cssText = IconsCSS;
else style.appendChild(document.createTextNode(IconsCSS));

document.head.appendChild(style);