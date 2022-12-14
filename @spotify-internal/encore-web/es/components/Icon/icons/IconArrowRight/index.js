/**
 * Generated by `./scripts/prebuild/generate-icons.ts`.
 * Run `yarn generate-icons` to regenerate.
 */
import React from 'react';
import { findClosestGlyphAvailable, Icon } from "../../";
export function IconArrowRight(props) {
  var _props$autoMirror;

  /* prettier-ignore */
  var iconList = [{
    'size': 16,
    'svgContent': '<path d=\'M.116 8c0 .414.335.75.75.75h12.189l-3.67 3.67a.75.75 0 001.061 1.06L15.926 8l-5.48-5.48a.75.75 0 10-1.06 1.06l3.669 3.67H.865a.75.75 0 00-.75.75z\'/>'
  }, {
    'size': 24,
    'svgContent': '<path d=\'M1.808 12a1 1 0 001 1h15.97l-4.793 4.793a1 1 0 001.414 1.414L22.607 12l-7.208-7.207a1 1 0 10-1.414 1.414L18.778 11H2.808a1 1 0 00-1 1z\'/>'
  }];
  var closestSize = findClosestGlyphAvailable(iconList, props.iconSize || 24);

  var titleTag = function titleTag(title, titleId) {
    return title ? "<title ".concat(titleId ? "id=\"".concat(titleId, "\"") : "", ">").concat(title, "</title>") : "";
  };

  var descTag = function descTag(desc, descId) {
    return desc ? "<desc ".concat(descId ? "id=\"".concat(descId, "\"") : "", ">").concat(desc, "</desc>") : "";
  };

  var autoMirror = (_props$autoMirror = props.autoMirror) !== null && _props$autoMirror !== void 0 ? _props$autoMirror : true;
  return /*#__PURE__*/React.createElement(Icon, Object.assign({}, props, {
    autoMirror: autoMirror,
    viewBox: "0 0 ".concat(closestSize.size, " ").concat(closestSize.size),
    dangerouslySetInnerHTML: {
      __html: "".concat(titleTag(props.title, props.titleId)).concat(descTag(props.desc, props.descId)).concat(closestSize.svgContent)
    }
  }));
}
/**
 * @deprecated The name Experimental__IconArrowRight is deprecated and will be archived soon. Use IconArrowRight instead.
 */

export function Experimental__IconArrowRight(props) {
  return /*#__PURE__*/React.createElement(IconArrowRight, props);
}