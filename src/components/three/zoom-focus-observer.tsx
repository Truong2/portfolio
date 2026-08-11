"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useSpatialCv } from "@/components/spatial-cv-context";

const ENTER_FOCUS_DISTANCE = 9.85;
const EXIT_FOCUS_DISTANCE = 10.45;
const BOOK_TARGET = new THREE.Vector3(0, 0.1, 0);

export function ZoomFocusObserver() {
  const { currentSpread, readingFocus, setReadingFocus } = useSpatialCv();
  const forcedFocus = React.useRef(
    typeof window !== "undefined" && new URLSearchParams(window.location.search).get("focus") === "1",
  ).current;

  useFrame(({ camera }) => {
    if (currentSpread === 0) {
      if (readingFocus) setReadingFocus(false);
      return;
    }

    if (forcedFocus) {
      if (!readingFocus) setReadingFocus(true);
      return;
    }

    const distance = camera.position.distanceTo(BOOK_TARGET);
    if (!readingFocus && distance <= ENTER_FOCUS_DISTANCE) setReadingFocus(true);
    else if (readingFocus && distance >= EXIT_FOCUS_DISTANCE) setReadingFocus(false);
  });

  return null;
}
