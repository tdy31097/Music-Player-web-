export default {
  setSongId(state, songId) {
    state.songId = songId;
  },
  setDuration(state, Duration) {
    state.Duration = Duration;
  },
  //修改当前音乐总时长
  setTotalDuration(state, totalDuration) {
    state.totalDuration = totalDuration;
  }
}
