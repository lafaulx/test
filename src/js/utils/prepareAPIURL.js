'use strict';

export default function (url) {
  let preparedUrl = url;

  if (typeof process === 'object' && process.env && process.env.API_ORIGIN) {
    preparedUrl = process.env.API_ORIGIN + url;
  }

  return preparedUrl;
}