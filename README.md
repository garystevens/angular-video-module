# angular-video-module

> An Angular module to inject the YouTube API and embed a video

## Installation

```
$ npm install --save angular-video-module
```

or the simple way, by including ``/dist/angular-video-module.min.js`` and ``/dist/angular-video-module.css`` into the head of your HTML.


## Usage

### Adding to your Angular project


### HTML

```
<video-player
    src="ScMzIvxBSi4"
    posterframe="https://placeholdit.imgix.net/~text?txtsize=33&txt=Click-to-play&w=560&h=315"
    autoplay="0"
    loading-message="Loading..."
    additional-class="myClass myOtherClass">
</video-player>
```

### Calling events on the video player




## Styling
As this requires some CSS to handle the responsiveness of the module, some CSS has been included. As everyone has their own take on SASS/pre-processors/post-processors/etc, this module does not dictate a specific CSS build tool, instead allowing you to integrate the existing CSS into your own environment.

For that reason, the CSS in the project is supplied un-minified to allow you to read and amend where requried for faster development, without the need to trawl the uncompiled source.

The default styling here uses a [BEM](https://en.bem.info/) pattern for styling.

## Support

This module has been developed to support versions of Angular from ``1.2.2`` up to ``1.4.5`` - If IE8 support is required please make sure to use Angular 1.2.

## Browser Support
This module has been developed to support all modern browsers will providing legacy support for IE8 and up.

## Development
If you wish to contribute or amend the source files and recompile you can do so by running the local development tasks.

You will need to install the dependencies by running ```npm install``` then run the default gulp task by running ```gulp```. This will create a local server and run the uncompiled version of the assets. The files are then visible at: ```http://localhost:8001```

Unit tests are still to be added.

## Roadmap

* Unit tests
* Add Vimeo support
* Add Native HTML5 Video support
