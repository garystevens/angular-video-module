(function() {
    'use strict';

    angular
        .module('angular-video-module', [])
        .directive('videoPlayer', videoPlayer)
        .service('YouTubeService', YouTubeService);

        function videoPlayer(YouTubeService, $timeout){

            var directive = {
                link: link,
                restrict: 'E',
                transclude: true,
                scope: {
                    videoUrl: '@src',
                    autoplay: '@autoplay',
                    posterframe: '@posterframe',
                    loadingMessage: '@loadingMessage',
                    additionalClass: '@additionalClass'
                },
                template: '<div class="video-player__root"><div class="video-player"><div class="video-container"></div><div class="video-poster"  ng-class="{ \'video-poster--active\': !hidePoster }"  ng-if="!videoPlaying"><img ng-src="{{ posterframe }}" alt="" class="video-player__poster-frame" /><div class="video-poster__clickable-layer" ng-click="playVideo()"  ng-if="videoLoaded"><i class="icon  icon-play  video-poster__playbtn"></i></div><div ng-if="!videoLoaded" class="video-player__loading-panel"><span class="heading-gamma">{{ loadingMessage }}</span></div></div></div><div class="video-overlay" ng-class="{ \'video-overlay--active  {{additionalClass}}\': !hidePoster }" ng-transclude ></div></div>'
            };

            function link($scope, elm, attrs){

                console.log('module loaded')

                $scope.player = null;

                var height = 390;
                var width = 640;
                var autoplay = $scope.autoplay || 0;

                $scope.videoLoaded = false;
                $scope.videoPlaying = false;
                $scope.hidePoster = false;
                $scope.youtube = YouTubeService;

                function createPlayer(){
                    var videoElement = elm.find('div').children().children()[0];

                    $scope.player = new YT.Player(videoElement, {
                        height: height,
                        width: width,
                        videoId: $scope.videoUrl,
                        playerVars: {
                            autoplay: autoplay
                        },
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }

                function onPlayerReady() {
                    $scope.videoLoaded = true;
                    $scope.$apply();
                }

                function onPlayerStateChange(event) {

                    if(event.data === YT.PlayerState.PLAYING) {
                        $scope.videoPlaying = true;
                        $scope.hidePoster = true;

                        $scope.$emit("video.playing", YT);

                    } else if(event.data === YT.PlayerState.ENDED){
                        $scope.videoPlaying = false;
                        $scope.hidePoster = false;

                        $scope.$emit("video.ended", YT);

                    } else if((event.data === YT.PlayerState.UNSTARTED) && $scope.videoPlaying){
                        $scope.videoPlaying = false;
                        $scope.hidePoster = false;

                        $scope.$emit("video.ended", YT);
                    } else if(event.data === YT.PlayerState.PAUSED){
                        $scope.$emit("video.paused", YT);
                    }

                    $scope.$apply();
                }

                $scope.playVideo = function(){
                    $scope.hidePoster = true;

                    $timeout(function(){
                        $scope.player.playVideo();
                        $scope.$apply();
                    }, 600);
                };

                $scope.$watch(
                    function() {
                        return $scope.youtube.ready;
                    },
                    function(newValue, oldValue) {
                        if ( newValue !== oldValue ) {
                            createPlayer();
                        }
                    }
                );
            }

            return directive;
        }

    	function YouTubeService($window, $rootScope) {

            var Service = {};

            // Inject YouTube's iFrame API
            var tag = document.createElement('script');
            var firstScriptTag = document.getElementsByTagName('script')[0];

            tag.src = 'https://www.youtube.com/iframe_api';
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            Service.ready = false;

            // Youtube callback when API is ready
            $window.onYouTubeIframeAPIReady = function () {
                $rootScope.$apply(function () {
                    Service.ready = true;
                });
            };

            return Service;
        }

})();
