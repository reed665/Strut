Strut
=======

#### A GUI / Authoring Tool for ImpressJS ####

Don't know what ImpressJS is?  Check out the ImpressJS demo presentation: http://impress.github.io/impress.js/#/bored

### Development/Building ###
To build your own version of Strut you'll need Grunt v0.4.0 or later.

1. Install the latest Grunt: `npm install -g grunt-cli`
2. Clone Strut: `git clone git://github.com/tantaman/Strut.git`
3. `cd Strut`
4. Install Strut's development dependencies: `npm install`
5. Run Strut: `grunt server` (the server runs at localhost:9000)

To make a production build of Strut run `grunt build`.
The resulting build will be located in `Strut/dist`.  

### RELEASE NOTES ###

v0.5.3 - Positioning and transformations of components in edit mode
now exactly match the positioning and transformations of components in the final presentation.

### Contributing ###

`Strut` is composed of several bundles which provide distinct features to `Strut`.  The set of bundles that compose
`Strut` are defined in https://github.com/tantaman/Strut/blob/master/app/scripts/features.js

This design allows features to be added and removed from `Strut` just by adding or removing bundles from the list
 in features.js.  E.g., if you wanted a build of Strut without `RemoteStorage` you can just remove
the `RemoteStorage` bundle from features.js.  If you didn't want any slide components for some reason then you can remove
`strut/slide_components/main` from features.js.

Bundles contribute functionality to `Strut` by registering that functionality with the `ServiceRegistry`.
You can take a look at the `RemoteStorage` bundle for an example: https://github.com/tantaman/Strut/blob/master/app/bundles/common/tantaman.web.remote_storage/main.js

If a service is missing `Strut` continues to run without the functionality provided by that service.

New development that isn't essential to the core of Strut should follow this pattern in order to keep the code 
modular and allow the removal of features that don't pan out or can only exist in specific environments.  For example,
`RemoteStorage` can't be loaded if `Strut` is being served from a `file://` url.

The `ServiceRegistry` also allows for runtime modularity.  I.e., services can be added and removed at runtime and `Strut`
will update to reflect the current set of features & services that are isntalled.  Try to keep in mind the
fact that services won't necessarily be present or if they are present they might go away.  This 
approach allows the user to add and remove plugins from 3rd parties at runtime.

### Acknowledgements ###

* ImpressJS https://github.com/bartaz/impress.js/
* BackboneJS http://documentcloud.github.com/backbone/
* Spectrum https://github.com/bgrins/spectrum
* Etch http://etchjs.com/
* Bootstrap http://twitter.github.io/bootstrap/
* lodash http://lodash.com/
* mousetrap http://craig.is/killing/mice
* RequireJS http://requirejs.org/
* JQuery http://jquery.com/
* HandlebarsJS http://handlebarsjs.com/
* Grunt http://gruntjs.com/