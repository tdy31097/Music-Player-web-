<template>
  <!-- audio播放器组件 -->
  <div class="player">
    <audio ref="plays" class="audio" :src="songUrl" autoplay controls loop>
      当前浏览器不支持播放
    </audio>
    <div class="MusicSong">
      <!-- 播放、暂停控制 -->
      <div class="controls">
        <!-- 上一曲 -->
        <a class="img_prev">
          <img class="img_previous" src="../../public/imgs/prev.png" alt="" />
        </a>

        <a class="img_play">
          <!-- 播放中显示暂停图片 -->
          <i v-if="iconShow" class="el-icon-video-pause" @click="MusicPlay"></i>
          <!-- 暂停中显示播放图片 -->
          <i v-else class="el-icon-video-play" @click="MusicPlay"></i>
        </a>
        <!-- 下一曲 -->
        <a class="img_next">
          <img class="img_nexts" src="../../public/imgs/next.png" />
        </a>
        <a>
          <!-- <img src="../../public/imgs/next.png" alt="" /> -->
        </a>
      </div>
      <!-- 专辑封面 -->
      <div class="album_img" @click="toLyics">
        <img :src="songCover" />
      </div>
      <el-col style="position: relative" :span="12" :offset="2">
        <div class="col_div">
          {{songname}}
          <span>
            {{ parseInt(musicDuration / 60) }}:
            {{
              parseInt(musicDuration % 60) > 9
                ? parseInt(musicDuration % 60)
                : "0" + parseInt(musicDuration % 60)
            }}
            / {{ parseInt(totalDuration / 60) }}:{{
              parseInt(totalDuration % 60) > 9
                ? parseInt(totalDuration % 60)
                : "0" + parseInt(totalDuration % 60)
            }}
          </span>
        </div>
        <!--音乐播放进度条-->
        <el-slider
          v-model="musicDuration"
          :max="totalDuration"
          @change="musicDurationChange"
          :show-tooltip="false"
        ></el-slider>
      </el-col>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      // 音乐资源Url
      songUrl: '',
      // 歌曲名称
      songname: '',
      // 歌曲封面
      songCover: '',
      // 是否播放
      iconShow: true,
      // 当前音乐的进度条
      musicDuration: 0,
      // 总进度条
      totalDuration: 0
    }
  },
  computed: {
    ...mapState(['songId'])
  },
  watch: {
    // 监听
    songId: {
      handler (newVal, oldVal) {
        this.Axios()
      }
    },
    // 监听音乐时间进度变化
    musicDuration: {
      handler (newVal, oldVal) {
        this.setDuration(newVal)
      }
    }
  },
  methods: {
    // 发送当前变化的音乐时间进度
    ...mapMutations(['setDuration']),
    // 发送当前音乐总时长
    ...mapMutations(['setTotalDuration']),
    // 获取歌曲相关资源
    Axios () {
      // 获取歌曲url
      axios.get(`/song/url?id=${this.songId}`).then(res => {
        this.songUrl = res.data.data[0].url
        // console.log(res);
        if (this.songUrl != null) {
          this.iconShow = true
        } else {
          alert('该歌曲无法播放')
        }
      })
      // 获取歌曲封面
      axios.get(`/song/detail?ids=${this.songId}`).then(res => {
        // console.log(response)
        // 保存封面
        this.songCover = res.data.songs[0].al.picUrl
        this.songname = res.data.songs[0].name
      })
      this.setAudioTagsInfo()
    },
    // 跳转到歌词详情页面
    toLyics () {
      console.log(this.songId)
      if (this.songId) {
        this.$router.push({
          name: 'SongLyrics',
          params: { Id: this.songId }
        })
      }
    },
    // audio控制播放暂停
    MusicPlay () {
      // audioUrl是否有音频数据
      if (this.songUrl !== '') {
        // 当音乐处于播放是暂停
        if (!this.$refs.plays.paused) {
          this.$refs.plays.pause()
          this.iconShow = false
        } else {
          this.$refs.plays.play()
          this.iconShow = true
        }
      }
    },
    // 设置audio的各种信息
    setAudioTagsInfo () {
      // 监听audio的timeUpdate事件
      this.$refs.plays.addEventListener('timeupdate', () => {
        // 获取歌曲的总长度 example: 257s
        // console.log(this.$refs.plays.duration);
        this.totalDuration = this.$refs.plays.duration
        this.setTotalDuration(this.$refs.plays.duration)
        // 获取歌曲时间
        this.musicDuration = this.$refs.plays.currentTime
      })
    },
    // 音乐进度条值变化的方法
    musicDurationChange () {
      if (this.totalDuration === 0) return
      this.$refs.plays.currentTime = this.musicDuration
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}
.player {
  position: fixed;
  width: 100%;
  background-color: white;
  border-top: 1px solid #ccc;
  //height: 200px;
  bottom: 0;
  //audio标签样式
  .audio {
    width: 0;
    height: 0;
    //height: 200px;
  }
  //audio效果样式
  .MusicSong {
    width: 80%;
    height: 80px;
    margin-left: 10%;
    //border: 1px solid red;
    .controls {
      height: 80px;
      float: left;
      //text-align: center;
      .img_prev {
        .img_previous {
          margin-top: 22px;
          height: 36px;
          cursor: pointer; //光标样式
          &:hover {
            color: red;
          }
        }
      }
      .img_play {
        i {
          margin-top: 10px;
          margin-left: 8px;
          font-size: 60px;
          &:hover {
            color: #0c8ed9;
          }
        }
      }
      .img_next {
        .img_nexts {
          margin-top: 22px;
          margin-left: 8px;
          height: 36px;
          cursor: pointer; //光标样式
        }
      }
    }
    .album_img {
      margin-top: 10px;
      margin-left: 20px;
      float: left;
      //border: 1px solid rgb(41, 192, 21);
      img {
        width: 60px;
        height: 60px;
        //border: 1px solid rgb(41, 192, 21);
      }
    }
    //音乐进度条
    .el-col {
      width: 500px;
      margin-left: 30px;
      margin-top: 10px;
      margin-bottom: -20px;
      .col_div {
        width: 500px;
        height: 20px;
        span {
         float:right;
        }
      }
      .el-slider {
        width: 100%;
        margin-top: 10px;
        &:deep(.el-slider__button) {
          width: 15px;
          height: 15px;
          //border: 2px solid rgb(198, 47, 47) !important;
        }
      }
    }
  }
}
</style>
