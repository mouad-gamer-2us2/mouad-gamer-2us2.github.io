// Independent GPU effect using only the two local portraits. No reference-site code or assets.
const vertex = `attribute vec2 position; varying vec2 uv; void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
const fragment = `
precision mediump float;
varying vec2 uv;
uniform sampler2D originalImage, cyberImage;
uniform vec2 resolution, pointer, tail;
uniform float amount, full, phase, sceneTime;
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
vec3 photo(sampler2D image, vec2 p, vec3 bg){
  float scale=resolution.x<600.?1.42:1.62;
  float top=resolution.x<600.?-.12:-.16;
  vec2 size=vec2(resolution.y*scale*.75,resolution.y*scale);
  vec2 q=(p*resolution-vec2((resolution.x-size.x)*.5,top*resolution.y))/size;
  vec3 color=texture2D(image,clamp(q,0.,1.)).rgb;
  float edge=smoothstep(0.,.13,q.x)*(1.-smoothstep(.87,1.,q.x));
  edge*=step(0.,q.y)*step(q.y,1.);
  vec3 composed=mix(bg,color,edge);
  // Contour lines appear only in the neutral photographic background.
  float neutral=1.-smoothstep(.045,.10,max(composed.r,max(composed.g,composed.b))-min(composed.r,min(composed.g,composed.b)));
  float background=neutral*smoothstep(.55,.72,dot(composed,vec3(.299,.587,.114)));
  vec2 grid=p*vec2(resolution.x/resolution.y,1.);
  float waveA=grid.x*4.+grid.y*5.+sceneTime*.12;
  float waveB=grid.y*7.-grid.x*2.-sceneTime*.09;
  float field=grid.x*5.+grid.y*3.+sin(waveA)*1.4+cos(waveB)*.7+sceneTime*.025;
  float slope=length(vec2(5.+5.6*cos(waveA)+1.4*sin(waveB),3.+7.*cos(waveA)-4.9*sin(waveB)));
  float line=1.-smoothstep(.0009,.0022,abs(fract(field)-.5)/max(slope,1.));
  composed=mix(composed,vec3(.30,.43,.41),line*background*.22);
  return composed;
}
void main(){
  vec2 p=vec2(uv.x,1.-uv.y);
  float unit=min(resolution.x,resolution.y);
  vec2 delta=(p-pointer)*resolution/unit;
  vec2 trail=(p-tail)*resolution/unit;
  float angle=atan(delta.y,delta.x);
  float radius=.235*amount;
  float organic=sin(angle*3.+phase)*.025+sin(angle*5.-phase*.6)*.012;
  float head=length(delta)-radius-organic*amount;
  float follow=length(trail)-radius*.66;
  float field=smin(head,follow,.12*max(amount,.01));
  float reveal=(1.-smoothstep(-.008,.008,field))*smoothstep(.01,.08,amount);
  reveal=mix(reveal,amount,full);
  // A small displacement along the moving boundary gives a liquid, lens-like edge.
  float edge=exp(-abs(field)*65.)*amount*(1.-full);
  vec2 direction=delta/(length(delta)+.001);
  vec2 warp=direction*edge*.018*unit/resolution;
  vec3 a=photo(originalImage,p+warp,vec3(.8314,.8353,.8431));
  vec3 b=photo(cyberImage,p-warp*.7,vec3(.0627,.098,.1176));
  vec3 color=mix(a,b,reveal);
  color+=vec3(.018,.035,.03)*edge;
  gl_FragColor=vec4(color,1.);
}`;

export function createPortraitRenderer(canvas, sources, onUnavailable) {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
  });
  if (!gl) {
    onUnavailable();
    return null;
  }
  const shaders = [];
  let program,
    buffer,
    disposed = false,
    frame = 0,
    ready = 0,
    visible = true,
    idleTimer = 0;
  const textures = [];
  const state = {
    x: 0.5,
    y: 0.45,
    active: false,
    pinned: false,
    full: false,
    paused: false,
    lastInput: performance.now(),
  };
  let x = 0.5,
    y = 0.45,
    tx = 0.5,
    ty = 0.45,
    amount = 0,
    phase = 0,
    previous = 0,
    sceneTime = 0;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  try {
    for (const [type, source] of [
      [gl.VERTEX_SHADER, vertex],
      [gl.FRAGMENT_SHADER, fragment],
    ]) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      shaders.push(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error("Portrait shader unavailable");
    }
    program = gl.createProgram();
    shaders.forEach((s) => gl.attachShader(program, s));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error("Portrait renderer unavailable");
    gl.useProgram(program);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  } catch {
    shaders.forEach((s) => gl.deleteShader(s));
    if (program) gl.deleteProgram(program);
    onUnavailable();
    return null;
  }
  const uniforms = Object.fromEntries(
    [
      "resolution",
      "pointer",
      "tail",
      "amount",
      "full",
      "phase",
      "sceneTime",
      "originalImage",
      "cyberImage",
    ].map((n) => [n, gl.getUniformLocation(program, n)]),
  );
  gl.uniform1i(uniforms.originalImage, 0);
  gl.uniform1i(uniforms.cyberImage, 1);
  const images = sources.map((source, index) => {
    const image = new Image();
    image.onload = () => {
      if (disposed) return;
      const texture = gl.createTexture();
      textures.push(texture);
      gl.activeTexture(gl.TEXTURE0 + index);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image,
      );
      ready++;
      schedule();
    };
    image.onerror = onUnavailable;
    image.src = source;
    return image;
  });
  function schedule() {
    clearTimeout(idleTimer);
    if (!frame && !disposed && visible && !document.hidden)
      frame = requestAnimationFrame(render);
  }
  function render(time) {
    frame = 0;
    if (disposed || ready < 2 || !visible || document.hidden) return;
    // Resizing clears WebGL's buffer: resize and redraw in the same frame.
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
    const automatic =
      !state.suspended && !state.paused && !state.pinned && !motion.matches;
    const idle = automatic && time - state.lastInput >= 1500;
    const destinationX = idle
      ? 0.5 +
        Math.sin(time / 1900) *
          Math.min(0.18, (canvas.clientHeight / canvas.clientWidth) * 0.19)
      : state.x;
    const destinationY = idle
      ? 0.43 + Math.sin(time / 2400 + 0.8) * 0.2
      : state.y;
    canvas.dataset.motion = idle
      ? "automatic"
      : state.paused
        ? "paused"
        : "interactive";
    const target =
      !state.suspended && (idle || state.active || state.pinned) ? 1 : 0;
    const elapsed = Math.min(time - previous || 16, 40);
    previous = time;
    const animateBackground = !state.paused && !motion.matches;
    if (animateBackground) sceneTime += elapsed / 1000;
    const ease = motion.matches ? 1 : 1 - Math.exp(-elapsed / 85);
    x += (destinationX - x) * ease;
    y += (destinationY - y) * ease;
    tx += (x - tx) * ease * 0.5;
    ty += (y - ty) * ease * 0.5;
    amount += (target - amount) * ease;
    phase += (Math.abs(destinationX - x) + Math.abs(destinationY - y)) * 0.2;
    gl.uniform2f(uniforms.resolution, canvas.clientWidth, canvas.clientHeight);
    gl.uniform2f(uniforms.pointer, x, y);
    gl.uniform2f(uniforms.tail, tx, ty);
    gl.uniform1f(uniforms.amount, amount);
    gl.uniform1f(
      uniforms.full,
      (!idle && state.full) || motion.matches ? 1 : 0,
    );
    gl.uniform1f(uniforms.phase, phase);
    gl.uniform1f(uniforms.sceneTime, sceneTime);
    canvas.dataset.backgroundMotion = animateBackground ? "running" : "paused";
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    canvas.style.opacity = "1";
    if (
      animateBackground ||
      idle ||
      Math.abs(target - amount) > 0.002 ||
      Math.abs(destinationX - x) +
        Math.abs(destinationY - y) +
        Math.abs(x - tx) +
        Math.abs(y - ty) >
        0.0006
    )
      schedule();
    else if (automatic)
      idleTimer = setTimeout(
        schedule,
        Math.max(30, 1500 - (time - state.lastInput)),
      );
  }
  function resize() {
    schedule();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
      clearTimeout(idleTimer);
    }
  });
  visibilityObserver.observe(canvas);
  document.addEventListener("visibilitychange", schedule);
  motion.addEventListener("change", schedule);
  function lost(event) {
    event.preventDefault();
    onUnavailable();
  }
  canvas.addEventListener("webglcontextlost", lost);
  resize();
  return {
    state,
    draw: schedule,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibilityObserver.disconnect();
      clearTimeout(idleTimer);
      document.removeEventListener("visibilitychange", schedule);
      motion.removeEventListener("change", schedule);
      canvas.removeEventListener("webglcontextlost", lost);
      images.forEach((i) => {
        i.onload = null;
        i.onerror = null;
      });
      textures.forEach((t) => gl.deleteTexture(t));
      shaders.forEach((s) => gl.deleteShader(s));
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}
