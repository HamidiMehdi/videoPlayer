'use strict';
let videoPlayerFunc = {
    playVideo: function (el) {
        let video = videoPlayerFunc.findVideoElement(el);
        video.play();
        $(video).next('.video-player-controls').find('i.play-video').css('display', 'none');
        $(video).next('.video-player-controls').find('i.pause-video').css('display', 'block');
    },
    pauseVideo: function (el) {
        let video = videoPlayerFunc.findVideoElement(el);
        video.pause();
        $(video).next('.video-player-controls').find('i.play-video').css('display', 'block');
        $(video).next('.video-player-controls').find('i.pause-video').css('display', 'none');
    },
    updateProgessBarVideo: function (video) {
        let progressBarPosition = video.currentTime / video.duration;
        let progressBarDiv = $(video).next('.video-player-controls').find('.progess-bar-video-player');
        progressBarDiv.css("width", progressBarPosition * 100 + "%");
        videoPlayerFunc.updateTimerVideo(video);

        if (video.ended) {
            videoPlayerFunc.pauseVideo(video);
        }
    },
    updateTimerVideo: function (video) {
        let currentTimeSpan = $(video).next('.video-player-controls').find('.current-time-video');
        let durationTimeSpan = $(video).next('.video-player-controls').find('.duration-time-video');

        let currentHour = Math.floor(video.currentTime / 3600);
        let currentMinute = Math.floor((video.currentTime / 60) % 60);
        let currentSecond = Math.floor(video.currentTime % 60);
        currentTimeSpan.text(currentHour > 0 ? currentHour + ":" : "" + currentMinute + ":" + currentSecond);

        let durationHour = Math.floor(video.duration / 3600);
        let durationMinute = Math.floor((video.duration / 60) % 60);
        let durationSecond = Math.floor(video.duration % 60);
        durationTimeSpan.text(durationHour > 0 ? durationHour + ":" : "" + durationMinute + ":" + durationSecond);
    },
    openVolume: function (el) {
        let video = videoPlayerFunc.findVideoElement(el);
        video.volume = 1;
        $(video).next('.video-player-controls').find('i.volume-close').css('display', 'none');
        $(video).next('.video-player-controls').find('i.volume-open').css('display', 'block');
    },
    closeVolume: function (el) {
        let video = videoPlayerFunc.findVideoElement(el);
        video.volume = 0;
        $(video).next('.video-player-controls').find('i.volume-close').css('display', 'block');
        $(video).next('.video-player-controls').find('i.volume-open').css('display', 'none');
    },
    openFullScreen: function (el) {
        let container = $(el).parents('.container-video')[0];

        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }

        $(container).find('i.open-full-screen').css('display', 'none');
        $(container).find('i.close-full-screen').css('display', 'block');
    },
    closeFullScreen: function (el) {
        let container = $(el).parents('.container-video')[0];
        console.log(container.requestFullscreen);
        if (container.exitFullscreen) {
            container.exitFullscreen();
        } else if (container.webkitExitFullscreen) {
            container.webkitExitFullscreen();
        } else if (container.mozCancelFullScreen) {
            container.mozCancelFullScreen();
        } else if (container.msExitFullscreen) {
            container.msExitFullscreen();
        }

        // revoir pk ca marche pas le close full screen
        $(container).find('i.open-full-screen').css('display', 'block');
        $(container).find('i.close-full-screen').css('display', 'none');
    },


    findVideoElement(el) {
        let container = $(el).parents('.container-video')[0];
        return $(container).find('.video')[0];
    }
};

let videoPlayerListener = {
    onLoad: function () {
        videoPlayerListener.onClick();
        videoPlayerListener.onTimeUpdate();
    },
    onClick: function () {
        $('i.play-video').unbind().click(function () {
            videoPlayerFunc.playVideo(this);
        });
        $('i.pause-video').unbind().click(function () {
            videoPlayerFunc.pauseVideo(this);
        });
        $('i.volume-open').unbind().click(function () {
            videoPlayerFunc.closeVolume(this);
        });
        $('i.volume-close').unbind().click(function () {
            videoPlayerFunc.openVolume(this);
        });
        $('i.open-full-screen').unbind().click(function () {
            videoPlayerFunc.openFullScreen(this);
        });
        $('i.close-full-screen').unbind().click(function () {
            videoPlayerFunc.closeFullScreen(this);
        });


    },
    onTimeUpdate: function () {
        $('video.video').bind('timeupdate', function () {
            videoPlayerFunc.updateProgessBarVideo(this);
        })
    }
};

$(document).ready(function () {
    videoPlayerListener.onLoad();
});