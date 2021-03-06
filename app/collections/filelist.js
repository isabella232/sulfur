define([
	'jquery',
	'underscore',
	'backbone',
	'models/file'
], function( $, _, Backbone ) {
	app.filelistCollection = Backbone.Collection.extend( {
		model: app.fileModel,
		found: 0,

		url: function () {
			return 'https://public-api.wordpress.com/rest/v1/sites/' + app.auth.siteID + '/media/?number=50';
		},

		initialize: function () {
			this.fetch( { remove: false } ).done( _.bind( function() {
				this.trigger( 'fetched' );
			}, this ) );
		},

		parse: function ( response ) {
			this.found = response.found;
			return response.media;
		}
	} );

	return app.filelistCollection;
});