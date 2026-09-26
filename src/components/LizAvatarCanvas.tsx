"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, type ThreeEvent, useFrame } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { LizAnimation } from "@/components/InteractiveLiz3D";

const MODEL_PATH = "/models/interactive-liz.glb?v=13";
const DRACO_PATH = "/draco/";
const WAVE_TIME_SCALE = 0.95;
const WAVE_RESET_DELAY_MS = 5900;

function setClampWhenFinished(action: THREE.AnimationAction, clamp: boolean) {
  action.clampWhenFinished = clamp;
}

function Avatar({
  animation,
  replayToken,
  onWave,
  onReady,
}: {
  animation: LizAnimation;
  replayToken: number;
  onWave: () => void;
  onReady: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const { scene, animations } = useGLTF(MODEL_PATH, { draco: DRACO_PATH });
  const { actions, mixer } = useAnimations(animations, group);
  const head = scene.getObjectByName("mixamorig:Head") as THREE.Bone | undefined;
  const upperSpine = scene.getObjectByName("mixamorig:Spine2") as THREE.Bone | undefined;
  const idleMotion = useRef({
    time: 0,
    nextGestureAt: 2.4,
    gestureEndsAt: 0,
    active: false,
    targetYaw: 0,
    targetTilt: 0,
    targetSway: 0,
    yaw: 0,
    tilt: 0,
    sway: 0,
  });
  const idleHeadRotation = useRef(new THREE.Quaternion());
  const idleSpineRotation = useRef(new THREE.Quaternion());
  const idleEuler = useRef(new THREE.Euler());

  useEffect(() => {
    const helper = scene.getObjectByName("Icosphere");
    if (helper) helper.visible = false;
    onReady();
  }, [onReady, scene]);

  useEffect(() => {
    const action = actions[animation];
    if (!action) return;

    action.reset().fadeIn(0.08);
    if (animation === "Idle") {
      setClampWhenFinished(action, false);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.setEffectiveTimeScale(1);
    } else {
      setClampWhenFinished(action, true);
      action.setLoop(THREE.LoopOnce, 1);
      action.setEffectiveTimeScale(animation === "Wave" ? WAVE_TIME_SCALE : 1.65);
    }
    action.play();

    function returnToIdle(event: THREE.Event & { action?: THREE.AnimationAction }) {
      if (animation === "Idle" || event.action !== action) return;
      const idle = actions.Idle;
      if (!idle) return;

      setClampWhenFinished(idle, false);
      idle.reset();
      idle.setLoop(THREE.LoopRepeat, Infinity);
      idle.setEffectiveTimeScale(1);
      idle.play();
      action.crossFadeTo(idle, 0.18, false);
    }

    mixer.addEventListener("finished", returnToIdle);
    return () => {
      mixer.removeEventListener("finished", returnToIdle);
      action.fadeOut(0.08);
    };
  }, [actions, animation, mixer, replayToken]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const idle = idleMotion.current;
    idle.time += delta;

    if (animation === "Idle") {
      if (!idle.active && idle.time >= idle.nextGestureAt) {
        const direction = Math.random() < 0.5 ? -1 : 1;
        idle.active = true;
        idle.gestureEndsAt = idle.time + 0.9 + Math.random() * 0.9;
        idle.targetYaw = THREE.MathUtils.degToRad(direction * (2.5 + Math.random() * 3));
        idle.targetTilt = THREE.MathUtils.degToRad(-direction * (0.5 + Math.random() * 1.25));
        idle.targetSway = THREE.MathUtils.degToRad(direction * (0.5 + Math.random()));
      } else if (idle.active && idle.time >= idle.gestureEndsAt) {
        idle.active = false;
        idle.targetYaw = 0;
        idle.targetTilt = 0;
        idle.targetSway = 0;
        idle.nextGestureAt = idle.time + 2.2 + Math.random() * 3.2;
      }
    } else {
      idle.active = false;
      idle.targetYaw = 0;
      idle.targetTilt = 0;
      idle.targetSway = 0;
      idle.nextGestureAt = idle.time + 2.2;
    }

    idle.yaw = THREE.MathUtils.damp(idle.yaw, idle.targetYaw, 2.8, delta);
    idle.tilt = THREE.MathUtils.damp(idle.tilt, idle.targetTilt, 2.8, delta);
    idle.sway = THREE.MathUtils.damp(idle.sway, idle.targetSway, 2.2, delta);

    const centeredX = animation === "Idle" || animation === "Wave" ? -0.23 : 0;
    group.current.position.x = THREE.MathUtils.damp(
      group.current.position.x,
      centeredX,
      8,
      delta,
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointerTarget.current.x,
      5,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      0,
      5,
      delta,
    );
    if (head) {
      idleEuler.current.set(0, idle.yaw, idle.tilt);
      idleHeadRotation.current.setFromEuler(idleEuler.current);
      head.quaternion.multiply(idleHeadRotation.current);
    }
    if (upperSpine) {
      idleEuler.current.set(0, 0, idle.sway);
      idleSpineRotation.current.setFromEuler(idleEuler.current);
      upperSpine.quaternion.multiply(idleSpineRotation.current);
    }
  });

  function handlePointerMove(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    pointerTarget.current = {
      x: THREE.MathUtils.clamp(event.pointer.x * 0.16, -0.14, 0.14),
      y: 0,
    };
  }

  function resetPointer() {
    pointerTarget.current = { x: 0, y: 0 };
  }

  return (
    <group
      ref={group}
      position={[-0.23, -0.84, 0]}
      onClick={(event) => {
        event.stopPropagation();
        onWave();
      }}
      onPointerMove={handlePointerMove}
      onPointerOut={resetPointer}
    >
      <primitive object={scene} />
    </group>
  );
}

export default function LizAvatarCanvas({
  animation,
  onTemporaryAnimationChange,
}: {
  animation: LizAnimation;
  onTemporaryAnimationChange?: (animation: LizAnimation | null) => void;
}) {
  const [temporaryAnimation, setTemporaryAnimation] = useState<LizAnimation | null>(null);
  const [replayToken, setReplayToken] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const resetTimer = useRef<number | null>(null);
  const activeAnimation = temporaryAnimation ?? animation;
  const handleReady = useCallback(() => setIsReady(true), []);

  function triggerWave() {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    setTemporaryAnimation("Wave");
    onTemporaryAnimationChange?.("Wave");
    setReplayToken((current) => current + 1);
    resetTimer.current = window.setTimeout(() => {
      setTemporaryAnimation(null);
      onTemporaryAnimationChange?.(null);
      resetTimer.current = null;
    }, WAVE_RESET_DELAY_MS);
  }

  return (
    <div
      className={`absolute inset-0 z-10 transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        isReady ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-[0.985] opacity-0"
      }`}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 24, position: [0, 0, 4.2] }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        fallback={
          <div className="flex h-full items-center justify-center text-sm text-[rgb(var(--muted))]">
            Interactive avatar unavailable in this browser.
          </div>
        }
        className="cursor-pointer"
        aria-label="Interactive 3D avatar of Elizabeth Mutisya"
        onPointerMissed={triggerWave}
      >
        <ambientLight intensity={1.7} />
        <directionalLight position={[-4, 7, 5]} intensity={3.2} color="#fff1e6" />
        <directionalLight position={[5, 4, -2]} intensity={2.4} color="#a855f7" />
        <pointLight position={[0, 2, 4]} intensity={1.8} color="#f5d0fe" />
        <Suspense fallback={null}>
          <Avatar
            animation={activeAnimation}
            replayToken={replayToken}
            onWave={triggerWave}
            onReady={handleReady}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH, { draco: DRACO_PATH });
