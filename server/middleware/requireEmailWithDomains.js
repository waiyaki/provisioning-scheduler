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
   */
  acceptableDomains = []
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
