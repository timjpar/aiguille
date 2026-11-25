"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  type Hold,
  HOLD_COLORS,
  MATS,
  ROOMS,
  type Route,
  type Segment,
  segmentFrame,
  segmentHeight,
  surfacePoint,
  type V3,
  type Wall,
  WALLS,
} from "@/data/gym";
import { OVERVIEW } from "./overview";

export type CameraGoal = { position: V3; target: V3; key: number } | null;

type Props = {
  routes: Route[];
  holdsByRoute: Record<string, Hold[]>;
  visible: Set<string>;
  selectedId: string | null;
  sentIds: Set<string>;
  onSelect: (routeId: string | null) => void;
  goal: CameraGoal;
  editing: boolean;
  onWallClick?: (wallId: string, seg: number, p: V3) => void;
};


export default function GymScene(props: Props) {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 2]}
      camera={{ position: OVERVIEW.position, fov: 45, near: 0.5, far: 1200 }}
      onPointerMissed={() => !props.editing && props.onSelect(null)}
    >
      <color attach="background" args={["#e9e6df"]} />
      <hemisphereLight args={["#ffffff", "#b9b4a8", 1.4]} />
      <directionalLight position={[60, 120, 80]} intensity={1.6} />
      <directionalLight position={[-40, 60, -30]} intensity={0.5} />
      <Building />
      {WALLS.map((w) => (
        <WallMesh key={w.id} wall={w} editing={props.editing} onWallClick={props.onWallClick} />
      ))}
      <Holds {...props} />
      <Rig goal={props.goal} />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */

function Rig({ goal }: { goal: CameraGoal }) {
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  const anim = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null);

  useEffect(() => {
    if (!goal) return;
    anim.current = {
      position: new THREE.Vector3(...goal.position),
      target: new THREE.Vector3(...goal.target),
    };
  }, [goal]);

  useEffect(() => {
    controls.current?.target.set(...OVERVIEW.target);
    controls.current?.update();
  }, []);

  useFrame((_, dt) => {
    const a = anim.current;
    const c = controls.current;
    if (!a || !c) return;
    const k = 1 - Math.pow(0.002, dt);
    camera.position.lerp(a.position, k);
    c.target.lerp(a.target, k);
    c.update();
    if (camera.position.distanceTo(a.position) < 0.2 && c.target.distanceTo(a.target) < 0.2) {
      anim.current = null;
    }
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      maxPolarAngle={Math.PI / 2 - 0.03}
      minDistance={6}
      maxDistance={320}
      onStart={() => (anim.current = null)}
    />
  );
}

/* ------------------------------------------------------------------ */

function Building() {
  return (
    <group>
      {/* concrete floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[80, -0.02, 36]}>
        <planeGeometry args={[176, 88]} />
        <meshStandardMaterial color="#cfccc5" />
      </mesh>
      {ROOMS.map((r) => {
        const w = r.x[1] - r.x[0];
        const d = r.z[1] - r.z[0];
        return (
          <group key={r.id}>
            <lineSegments position={[r.x[0] + w / 2, 13, r.z[0] + d / 2]}>
              <edgesGeometry args={[new THREE.BoxGeometry(w, 26, d)]} />
              <lineBasicMaterial color="#9a958b" />
            </lineSegments>
            <Label text={r.name} position={[r.x[0] + 10, 0.6, r.z[1] - 3]} size={1.6} dark={false} />
          </group>
        );
      })}
      {MATS.map(([x0, z0, x1, z1, h, color], i) => (
        <mesh key={i} position={[(x0 + x1) / 2, h / 2, (z0 + z1) / 2]}>
          <boxGeometry args={[x1 - x0, h, z1 - z0]} />
          <meshStandardMaterial color={color} roughness={0.95} />
        </mesh>
      ))}
      <WeightsCorner />
    </group>
  );
}

/** Simple blocks for the weights corner so it reads at a glance. */
function WeightsCorner() {
  const steel = "#3b4046";
  return (
    <group position={[150, 0, 40]}>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[16, 0.1, 14]} />
        <meshStandardMaterial color="#555b62" />
      </mesh>
      {/* power rack */}
      {[
        [-2, -2],
        [2, -2],
        [-2, 2],
        [2, 2],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x + 4, 3.75, z - 2]}>
          <boxGeometry args={[0.25, 7.5, 0.25]} />
          <meshStandardMaterial color="#e8e4da" />
        </mesh>
      ))}
      <mesh position={[4, 4.5, -2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 7]} />
        <meshStandardMaterial color={steel} metalness={0.6} />
      </mesh>
      {/* dumbbell rack */}
      <mesh position={[-5, 1.4, -5.5]}>
        <boxGeometry args={[5, 2.8, 1.6]} />
        <meshStandardMaterial color={steel} />
      </mesh>
      {/* benches */}
      <mesh position={[-3, 1, 1]}>
        <boxGeometry args={[4, 0.5, 1]} />
        <meshStandardMaterial color="#1c1e21" />
      </mesh>
      <mesh position={[-3, 1, 3.5]}>
        <boxGeometry args={[4, 0.5, 1]} />
        <meshStandardMaterial color="#1c1e21" />
      </mesh>
      <Label text="Weights" position={[0, 9, 0]} size={1.6} />
    </group>
  );
}

/* ------------------------------------------------------------------ */

/** Quad for each tier of each segment of a wall. */
function tierQuads(s: Segment) {
  const total = segmentHeight(s);
  const quads: { geom: THREE.BufferGeometry; v0: number; v1: number }[] = [];
  let acc = 0;
  for (const t of s.tiers) {
    const v0 = acc / total;
    const v1 = (acc + t.h) / total;
    acc += t.h;
    const bl = surfacePoint(s, 0, v0).p;
    const br = surfacePoint(s, 1, v0).p;
    const tl = surfacePoint(s, 0, v1 - 1e-4).p;
    const tr = surfacePoint(s, 1, v1 - 1e-4).p;
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([...bl, ...br, ...tr, ...bl, ...tr, ...tl], 3),
    );
    g.computeVertexNormals();
    quads.push({ geom: g, v0, v1 });
  }
  return quads;
}

function WallMesh({
  wall,
  editing,
  onWallClick,
}: {
  wall: Wall;
  editing: boolean;
  onWallClick?: Props["onWallClick"];
}) {
  const segs = useMemo(() => wall.segments.map((s) => tierQuads(s)), [wall]);
  const tint = wall.tint ?? "#80868c";
  const labelSeg = wall.segments[0];
  const label = surfacePoint(labelSeg, 0.5, 1).p;

  return (
    <group>
      {segs.map((quads, si) =>
        quads.map((q, qi) => (
          <mesh
            key={`${si}-${qi}`}
            geometry={q.geom}
            onClick={
              editing && onWallClick
                ? (e: ThreeEvent<MouseEvent>) => {
                    e.stopPropagation();
                    onWallClick(wall.id, si, [e.point.x, e.point.y, e.point.z]);
                  }
                : undefined
            }
          >
            <meshStandardMaterial
              color={qi % 2 ? shade(tint, -0.12) : tint}
              roughness={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        )),
      )}
      {wall.volumes?.map((v, i) => <VolumeMesh key={i} seg={wall.segments[v.seg]} v={v} />)}
      {wall.pattern && <Pattern wall={wall} />}
      <Label text={wall.name} position={[label[0], label[1] + 2.4, label[2]]} size={1.8} />
    </group>
  );
}

function VolumeMesh({ seg, v }: { seg: Segment; v: { u: number; v: number; s: number } }) {
  const ref = useRef<THREE.Mesh>(null);
  const { p, normal } = surfacePoint(seg, v.u, v.v);
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    m.position.set(...p);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(...normal));
    m.rotateY(Math.PI / 4 + v.u);
    m.translateY(v.s * 0.32);
  });
  return (
    <mesh ref={ref}>
      <coneGeometry args={[v.s, v.s * 0.65, 4]} />
      <meshStandardMaterial color="#a6acb1" roughness={0.7} flatShading />
    </mesh>
  );
}

/** Dense "all holds on" boards. */
function Pattern({ wall }: { wall: Wall }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const seg = wall.segments[wall.segments.length - 1];
  const pts = useMemo(() => {
    const out: { u: number; v: number; s: number }[] = [];
    const rows = wall.pattern === "campus" ? 12 : 16;
    const cols = wall.pattern === "campus" ? 1 : 14;
    const vStart = 1 - seg.tiers[seg.tiers.length - 1].h / segmentHeight(seg);
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const jitter = wall.pattern === "spray" ? ((r * 7 + c * 13) % 10) / 40 - 0.12 : 0;
        out.push({
          u: wall.pattern === "campus" ? 0.5 : (c + 0.5 + jitter) / cols,
          v: vStart + ((r + 0.5 + jitter) / rows) * (1 - vStart) * 0.98,
          s: wall.pattern === "campus" ? 1 : wall.pattern === "spray" ? 0.25 + ((r + c) % 3) * 0.08 : 0.2,
        });
      }
    return out;
  }, [wall, seg]);

  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    const obj = new THREE.Object3D();
    const { t } = segmentFrame(seg);
    pts.forEach((h, i) => {
      const { p, normal } = surfacePoint(seg, h.u, h.v);
      orient(obj, p, normal, t, wall.pattern === "campus" ? [8, 0.25, 0.3] : [h.s, h.s * 0.8, h.s * 0.5]);
      m.setMatrixAt(i, obj.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  }, [pts, seg, wall.pattern]);

  const color = wall.pattern === "campus" ? "#d9c59b" : wall.pattern === "led" ? "#e7e1d2" : "#2b2c2e";
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, pts.length]}>
      {wall.pattern === "campus" ? <boxGeometry args={[1, 1, 1]} /> : <icosahedronGeometry args={[1, 1]} />}
      <meshStandardMaterial color={color} roughness={0.8} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */

const DIM = new THREE.Color("#b9bbbd");

function Holds({ routes, holdsByRoute, visible, selectedId, sentIds, onSelect, editing }: Props) {
  const ref = useRef<THREE.InstancedMesh>(null);

  const flat = useMemo(() => {
    const out: { routeId: string; seg: Segment; t: V3; hold: Hold; color: string }[] = [];
    for (const r of routes) {
      const wall = WALLS.find((w) => w.id === r.wallId)!;
      const seg = wall.segments[r.seg];
      const { t } = segmentFrame(seg);
      for (const hold of holdsByRoute[r.id] ?? [])
        out.push({ routeId: r.id, seg, t, hold, color: HOLD_COLORS[r.color] });
    }
    return out;
  }, [routes, holdsByRoute]);

  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    const obj = new THREE.Object3D();
    const c = new THREE.Color();
    flat.forEach((f, i) => {
      const show = visible.has(f.routeId);
      const isSel = selectedId === f.routeId;
      const { p, normal } = surfacePoint(f.seg, f.hold.u, f.hold.v);
      const s = show ? f.hold.s * (isSel ? 1.25 : 1) : 0.0001;
      orient(obj, p, normal, f.t, [s, s * 0.78, s * 0.5]);
      m.setMatrixAt(i, obj.matrix);
      c.set(f.color);
      if (selectedId && !isSel) c.lerp(DIM, 0.82);
      else if (!selectedId && sentIds.has(f.routeId)) c.lerp(DIM, 0.35);
      m.setColorAt(i, c);
    });
    m.count = flat.length;
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    m.computeBoundingSphere();
  }, [flat, visible, selectedId, sentIds]);

  return (
    <instancedMesh
      key={flat.length}
      ref={ref}
      args={[undefined, undefined, Math.max(1, flat.length)]}
      onClick={(e) => {
        if (editing) return;
        e.stopPropagation();
        const f = e.instanceId != null ? flat[e.instanceId] : null;
        if (f && visible.has(f.routeId)) onSelect(f.routeId);
      }}
      onPointerOver={(e) => {
        const f = e.instanceId != null ? flat[e.instanceId] : null;
        if (f && visible.has(f.routeId)) document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial roughness={0.55} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */

const _x = new THREE.Vector3();
const _y = new THREE.Vector3();
const _z = new THREE.Vector3();
const _m = new THREE.Matrix4();

/** Place an object on the wall surface: local x along the wall, z out of it. */
function orient(obj: THREE.Object3D, p: V3, normal: V3, t: V3, scale: V3) {
  _z.set(...normal).normalize();
  _x.set(...t).normalize();
  _y.crossVectors(_z, _x).normalize();
  _m.makeBasis(_x, _y, _z);
  obj.quaternion.setFromRotationMatrix(_m);
  obj.position.set(p[0] + _z.x * scale[2] * 0.4, p[1] + _z.y * scale[2] * 0.4, p[2] + _z.z * scale[2] * 0.4);
  obj.scale.set(...scale);
  obj.updateMatrix();
}

function shade(hex: string, amt: number) {
  const c = new THREE.Color(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  c.getHSL(hsl);
  c.setHSL(hsl.h, hsl.s, Math.min(1, Math.max(0, hsl.l + amt)));
  return `#${c.getHexString()}`;
}

/** Text label as a camera-facing sprite (no DOM, no extra React root). */
function Label({
  text,
  position,
  size = 1.6,
  dark = true,
}: {
  text: string;
  position: V3;
  size?: number;
  dark?: boolean;
}) {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d")!;
    const font = "600 44px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.font = font;
    const label = text.toUpperCase();
    const w = Math.ceil(ctx.measureText(label).width) + 40;
    c.width = w;
    c.height = 72;
    ctx.font = font;
    if (dark) {
      ctx.fillStyle = "rgba(22,25,29,0.85)";
      ctx.fillRect(0, 0, w, 72);
    }
    ctx.fillStyle = dark ? "#faf9f5" : "#4a5159";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 20, 38);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return { t, aspect: w / 72 };
  }, [text, dark]);
  useEffect(() => () => texture.t.dispose(), [texture]);
  return (
    <sprite position={position} scale={[size * texture.aspect, size, 1]} renderOrder={10}>
      <spriteMaterial map={texture.t} transparent />
    </sprite>
  );
}
