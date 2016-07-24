module.exports = (req, res, next, {
  /**
   * @param acceptableDomains
   *
   * List of fully qualified accceptable domain names.
   * Should be for example 'safaricom.co.ke', not just 'safaricom' or 'co.ke'
   *
   * IMPORTANT!!
   * If you use this middleware and add other acceptableDomains, make sure to
   * add 'safaricom.co.ke' in your list as well. It's added here as a default
   * and will be overridden if other values are passed.
   *
   * Not going to validate that you didn't override 'safaricom.co.ke', I trust
   * that you're a developer and you what you're doing. ¯\_(ツ)_/¯
   */
  acceptableDomains = ['safaricom.co.ke']
} = {}) => {
  if (req.body.email) { // Only try to validate if we have an email.
    for (const domain of acceptableDomains) {
      if (new RegExp(`${domain}$`, 'i').test(req.body.email)) {
        return next();
      }
    }

    return res.status(400).send({
      email: 'This email is invalid.'
    });
  }

  return next();
};
