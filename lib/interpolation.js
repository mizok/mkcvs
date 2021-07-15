import { is, colorToRgba, getChannelValuesFromRgba } from './function';

/**
 * 線性內插函數
 *
 * @export
 * @param {*} x
 * @param {*} min
 * @param {*} max
 * @param {*} virtualMin
 * @param {*} virtualMax
 * @returns
 */
export function linearInterpolation(x, x0, x1, v0, v1) {
  if (!(x >= x0 && x <= x1) && !(x <= x0 && x >= x1)) return new TypeError(`linearInterpolation: 參數x 的值必須大於參數min 並小於參數max, 但x為${x},x0為${x0},x1為${x1}`)
  return ((x - x0) / (x1 - x0)) * (v1 - v0) + v0;
}


export function colorInterpolation(x, x0, x1, fromColor, toColor) {
  // 先驗證收到的color 是正式規範的色彩格式 (hex/rgb/rgba/hsl)
  let valueIsValidated = is.col(fromColor) && is.col(toColor);
  if (!valueIsValidated) return new TypeError("colorInterpolation: 色彩參數非規制");

  let rgba0 = getChannelValuesFromRgba(colorToRgba(fromColor)),
    rgba1 = getChannelValuesFromRgba(colorToRgba(toColor));
  let rgba = [];
  for (let i = 0; i < 4; i++) {
    rgba[i] = linearInterpolation(x, x0, x1, rgba0[i], rgba1[i])
  }

  return `rgba(${rgba})`;
}


