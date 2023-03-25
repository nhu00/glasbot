window.onload = function() {
            var videosContainer = document.getElementsByClassName("videos")[0];
            var menu = document.getElementsByClassName("menu")[0];
            var menuOptions = menu.getElementsByClassName("options")[0];

            var playButton = document.getElementsByClassName("play")[0];
            playButton.onclick = function() {
                playButton.style.display = "none";
                playInitialMenu();
            }

            var catPersonLink = document.getElementById("cat-person");
            catPersonLink.onclick = function() {
                showVideos(0, videosContainer.getElementsByClassName("cat"));
            }

            var dogPersonLink = document.getElementById("dog-person");
            dogPersonLink.onclick = function() {
                showVideos(0, videosContainer.getElementsByClassName("dog"));
            }

            function playInitialMenu() {
                playVideo(videosContainer.getElementsByClassName("initial")[0], loop=false);

                setTimeout (function () {
                    menu.style.display = "block";
                    menu.getElementsByClassName("initial")[0].style.display = "block";
                    menuOptions.style.display = "block";
                }, 1000);
            };

            function playClosingMenu() {
                playVideo(videosContainer.getElementsByClassName("closing")[0], loop=false);

                menu.getElementsByClassName("initial")[0].style.display = "none";

                setTimeout (function () {
                    menu.style.display = "block";
                    menu.getElementsByClassName("closing")[0].style.display = "block";
                    menuOptions.style.display = "block";
                }, 1000);
            };

            function playVideo(videoContainer, loop=false) {
                var lastVideoContainer = videosContainer.getElementsByClassName("active")[0];
                lastVideoContainer.classList.remove("active");
                lastVideoContainer.style.display = "none";

                videoContainer.style.display = "block";
                videoContainer.classList.add("active");

                var video = videoContainer.getElementsByTagName("video")[0];
                video.preload = "auto";
                video.load();
                video.play();

                return video;
            }

            function showVideos(index, videos) {
                if (index < (videos.length - 1)) {
                    hasNextVideo = true;
                } else {
                    hasNextVideo = false;
                }

                menu.style.display = "none";

                var video = playVideo(videos[index]);

                video.addEventListener("timeupdate", function() {
                    var currentTime = (this.currentTime / this.duration) * 100;

                    if (hasNextVideo && currentTime > 70) {
                        nextVideo = videos[index + 1];
                        nextVideoTag = nextVideo.getElementsByTagName("video")[0];
                        nextVideoTag.preload = "auto";
                    }
                })

                video.onended = function() {
                    if (hasNextVideo) {
                        showVideos(index+1, videos);
                    } else {
                        playClosingMenu();
                    }
                }
            }
        }