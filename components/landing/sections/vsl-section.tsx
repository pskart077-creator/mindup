"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VSL_VIDEO_SRC = "/assets/video/vsl.mp4";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

export function VslSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const allowedTimeRef = useRef(0);
  const isBlockingSeekRef = useRef(false);
  const controlsTimerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [areControlsVisible, setAreControlsVisible] = useState(false);
  const [duration, setDuration] = useState(0);

  function showControlsTemporarily() {
    setAreControlsVisible(true);

    if (controlsTimerRef.current) {
      window.clearTimeout(controlsTimerRef.current);
    }

    controlsTimerRef.current = window.setTimeout(() => {
      setAreControlsVisible(false);
    }, 3200);
  }

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const videoElement = video;

    videoElement.play().catch(() => undefined);

    function handleLoadedMetadata() {
      setDuration(videoElement.duration || 0);
    }

    function handlePlay() {
      setIsPlaying(true);
    }

    function handlePause() {
      setIsPlaying(false);
    }

    function handleTimeUpdate() {
      if (!videoElement.seeking) {
        allowedTimeRef.current = Math.max(
          allowedTimeRef.current,
          videoElement.currentTime
        );
      }

      setCurrentTime(videoElement.currentTime);
      setDuration(videoElement.duration || 0);
    }

    function handleSeeking() {
      if (isBlockingSeekRef.current) {
        return;
      }

      const allowedTime = allowedTimeRef.current;

      if (Math.abs(videoElement.currentTime - allowedTime) <= 0.35) {
        return;
      }

      isBlockingSeekRef.current = true;
      videoElement.currentTime = allowedTime;
      window.setTimeout(() => {
        isBlockingSeekRef.current = false;
      }, 0);
    }

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handlePause);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("seeking", handleSeeking);

    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handlePause);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("seeking", handleSeeking);

      if (controlsTimerRef.current) {
        window.clearTimeout(controlsTimerRef.current);
      }
    };
  }, []);

  async function handleTogglePlayback() {
    const video = videoRef.current;

    if (!video || video.ended) {
      return;
    }

    if (video.paused) {
      await video.play();
      return;
    }

    video.pause();
  }

  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <section
      className="mindup-vsl-section"
      aria-label="Video MindUp"
    >
      <div className="mindup-vsl-section__container">
        <div
          className={`mindup-vsl-section__frame ${
            areControlsVisible ? "is-controls-visible" : ""
          }`}
          onPointerDown={(event) => {
            if (event.pointerType === "touch") {
              showControlsTemporarily();
            }
          }}
        >
          <video
            ref={videoRef}
            className="mindup-vsl-section__video"
            src={VSL_VIDEO_SRC}
            autoPlay
            playsInline
            preload="metadata"
            poster="/assets/image/logo/logo.svg"
            onClick={showControlsTemporarily}
            onContextMenu={(event) => event.preventDefault()}
          >
            Seu navegador nao suporta video.
          </video>

          <div className="mindup-vsl-section__controls">
            <button
              type="button"
              className="mindup-vsl-section__play-button"
              onClick={handleTogglePlayback}
              aria-label={isPlaying ? "Pausar video" : "Reproduzir video"}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>

            <div
              className="mindup-vsl-section__timeline"
              aria-label={`Progresso do video: ${formatTime(currentTime)} de ${formatTime(duration)}`}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={Math.max(Math.round(duration), 1)}
              aria-valuenow={Math.round(currentTime)}
            >
              <span
                className="mindup-vsl-section__timeline-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="mindup-vsl-section__time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
