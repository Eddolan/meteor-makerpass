Template.configureLoginServiceDialogForMakerpass.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl()
  }
})

Template.configureLoginServiceDialogForMakerpass.fields = function () {
  return [
    {property: 'clientId', label: 'Client ID'},
    {property: 'secret', label: 'Client Secret'}
  ]
}
