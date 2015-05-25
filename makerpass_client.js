Makerpass = {}

// Request Makerpass credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Makerpass.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options
    options = {}
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'makerpass'})
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError())
    return
  }
  var credentialToken = Random.secret()

  var scope = (options && options.requestPermissions) || []
  var flatScope = _.map(scope, encodeURIComponent).join('+')

  var loginStyle = OAuth._loginStyle('makerpass', config, options)

  var loginUrl =
    'https://auth.makerpass.com/oauth/authorize' +
    '?client_id=' + config.clientId +
    // '&scope=' + flatScope +
    '&redirect_uri=' + OAuth._redirectUri('makerpass', config) +
    '&state=' + OAuth._stateParam(loginStyle, credentialToken) +
    '&response_type=code'

  OAuth.launchLogin({
    loginService: 'makerpass',
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {width: 900, height: 450}
  })
}
