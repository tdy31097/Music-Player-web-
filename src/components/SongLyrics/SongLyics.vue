<template>
  <div class="songLyics" ref="cover">
    <div class="vague">
      歌词效果
      <div class="songLyics_count">
        <div class="songLyics_count_left">
          <div class="img">
            <img :src="songdetails.imgUrl" />
          </div>
          <span class="songname">{{ songdetails.songname }}</span>
          <span class="songsinger"
            >歌手：<a>{{ songdetails.songsinger }}</a></span
          >
          <span class="songalbum"
            >专辑：<a>{{ songdetails.songalbum }}</a></span
          >
        </div>
        <div class="songLyics_count_Lyics">
          <div class="lyics_list">
          <div class="song_title">{{ Duration/totalDuration }}:::{{topindex}}</div>
            <ul ref="uls" :scrollTop="topindex">
              <li v-for="item in lyric" :key="item.id">
                {{ lyricSplit(item) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 歌曲Id
      songId: 0,
      // 歌词
      lyric: [],
      // 歌曲详情
      songdetails: {
        // 歌曲封面Url
        imgUrl: '',
        // 歌曲名称
        songname: '',
        // 歌曲歌手
        songsinger: '',
        // 歌曲专辑
        songalbum: '',
        topindex: 0
      }
    }
  },
  watch: {
    // 监听route值的变化
    $route (to, from) {
      this.songId = this.$route.params.Id
      this.axios()
    },
    Duration: {
      handler (newVal, oldVal) {
        this.topindex = (this.$refs.uls.scrollHeight) * (newVal / this.totalDuration)
        // console.log(this.$refs.uls.scrollHeight);
        // console.log(newVal/this.totalDuration);
      }
    }
  },
  computed: {
    ...mapState(['Duration']),
    ...mapState(['totalDuration'])
  },
  mounted () {
    this.songId = this.$route.params.Id
    this.axios()
  },
  methods: {
    axios () {
      axios.get(`/song/detail?ids=${this.songId}`).then(res => {
        console.log(res.data.songs[0])
        this.songdetails.imgUrl = res.data.songs[0].al.picUrl
        this.$refs.cover.style.backgroundImage = `Url(${res.data.songs[0].al.picUrl})`
        this.songdetails.songname = res.data.songs[0].name
        this.songdetails.songsinger = res.data.songs[0].ar[0].name
        this.songdetails.songalbum = res.data.songs[0].al.name
      })
      axios.get(`/lyric?id=${this.songId}`).then(res => {
        // console.log(res.data.lrc.lyric);
        this.lyric = res.data.lrc.lyric.split('\n')
      })
    },
    // 裁剪歌词
    lyricSplit (lrc) {
      return lrc.toString().substring(lrc.indexOf(']') + 1)
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
.songLyics {
  width: 100%;
  height: 700px;
  position: relative;

  //background-repeat: no-repeat;
  //图片填满屏幕
  background-size: cover;
  .vague {
    width: 100%;
    height: 100%;
    background: rgba(61, 59, 59, 0.35);
    z-index: 10;
    .songLyics_count {
      width: 70%;
      height: 100%;
      margin-left: 15%;
      display: flex;
      // border: 1px solid red;

      .songLyics_count_left {
        width: 400px;
        .img {
          img {
            width: 300px;
            height: 300px;
          }
        }
        span {
          color: white;
          display: block;
        }
        .songname {
          font-size: 28px;
          margin-top: 10px;
        }
        .songsinger {
          font-size: 16px;
          margin-top: 10px;
          a {
            cursor: pointer;
            &:hover {
              color: #0c8ed9;
            }
          }
        }
        .songalbum {
          font-size: 16px;
          margin-top: 10px;
          a {
            cursor: pointer;
            &:hover {
              color: #0c8ed9;
            }
          }
        }
      }
      .lyics_list {
        ul {
          height: 700px;
          width: 300px;
          //overflow: hidden;
          overflow: auto; /*显示滚动效果*/
          //border: 1px solid red;
          //
          &::-webkit-scrollbar {
            width: 5px;
            //cursor: pointer; //光标样式
          }
          &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2);
          } /* 滑块颜色 */
          li {
            margin-top: 20px;
            font-size: 15px;
            list-style: none;
            color: rgb(236, 229, 229);
          }
        }
      }
    }
  }
}
</style>
