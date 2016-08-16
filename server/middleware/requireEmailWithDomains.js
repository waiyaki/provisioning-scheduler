let acceptableDomainsFromEnv = process.env.ACCEPTABLE_DOMAINS;

if (acceptableDomainsFromEnv) {
  acceptableDomainsFromEnv = acceptableDomainsFromEnv.split(',').filter(
    domain => !!domain // Remove any empty items from the list.
  );
}

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
   * It's HIGHLY recommended that you don't edit the code to add domains
   * into the list, rather, add them into your environment as a comma
   * separated list in an env variable named ACCEPTABLE_DOMAINS.
   *
   * Not going to validate that you didn't override 'safaricom.co.ke', I trust
   * that you're a developer and you what you're doing. ¯\_(ツ)_/¯
   */
  acceptableDomains = ['safaricom.co.ke']
} = {}) => {
  let domains = acceptableDomains;

  if (acceptableDomainsFromEnv) {
    domains = domains.concat(acceptableDomainsFromEnv);
  }
  if (req.body.email) { // Only try to validate if we have an email.
    for (const domain of domains) {
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
