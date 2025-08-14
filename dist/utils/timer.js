// src/utils/timer.ts
const timers = new Map();
function nowMs() {
    return Date.now();
}
function genId() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
export function startTimer({ groupId, participantId, }) {
    const id = genId();
    timers.set(id, {
        groupId,
        participantId,
        start: nowMs(),
        end: null,
        elapsedSec: null,
    });
    return id;
}
export function stopTimer(id) {
    const t = timers.get(id);
    if (!t || t.end)
        throw Object.assign(new Error('Invalid timerId'), { status: 400 });
    t.end = nowMs();
    const sec = Math.max(1, Math.round((t.end - t.start) / 1000));
    t.elapsedSec = sec;
    return {
        elapsedSeconds: sec,
        meta: { groupId: t.groupId, participantId: t.participantId },
    };
}
export function readStopped(id) {
    const t = timers.get(id);
    if (!t || t.elapsedSec == null)
        return null; // stop 이후만 유효
    return t;
}
export function consume(id) {
    // 1회 사용 후 폐기
    timers.delete(id);
}
