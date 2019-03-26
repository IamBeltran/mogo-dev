//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = userAgent => {
  return /mobile/i.test(userAgent);
};
