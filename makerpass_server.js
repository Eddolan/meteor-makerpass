Makerpass = {}

OAuth.registerService('makerpass', 2, null, function(query) {

  var accessToken = getAccessToken(query)
  var identity = getIdentity(accessToken)

  return {
    serviceData: {
      id: identity.uid,
      name: identity.name,
      accessToken: OAuth.sealSecret(accessToken),
      email: identity.email,
      avatarUrl: identity.avatar_url,
      memberships: identity.memberships
    },
    options: {profile: {name: identity.name}}
  }
})

var getAccessToken = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'makerpass'})
  if (!config)
    throw new ServiceConfiguration.ConfigError()

  var response
  try {
    response = HTTP.post(
      "https://auth.makerpass.com/oauth/token", {
        headers: {
          Accept: 'application/json'
        },
        params: {
          code: query.code,
          client_id: config.clientId,
          client_secret: OAuth.openSecret(config.secret),
          redirect_uri: OAuth._redirectUri('makerpass', config),
          grant_type: 'authorization_code',
          // state: query.state
        }
      })
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Makerpass. " + err.message),
                   {response: err.response})
  }

  if (response.data.error) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with Makerpass. " + response.data.error)
  } else {
    return response.data.access_token
  }
}

var getIdentity = function (accessToken) {
  try {
    return HTTP.get(
      "https://auth.makerpass.com/api/v1/me.json", {
        params: {access_token: accessToken}
      }).data
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Makerpass. " + err.message),
                   {response: err.response})
  }
}


Makerpass.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret)
}
