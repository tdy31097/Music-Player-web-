<template>
  <div class="video_module">
    <div class="title">
      <span class="IsMV" v-if="MVDetail.IsMV">MV</span>
      {{ MVDetail.name }}
      <span>{{ MVDetail.artistName }}</span>
    </div>
    <div class="video_body">
      <div class="body_left">
        <div class="video_cover">
          <span>视频简介</span>
        </div>
        <div class="video_time">
          <span>发布时间：{{ MVDetail.publishTime }}</span>
        </div>
        <div class="video_paly">
          <span>播放次数：{{ MVDetail.playCount }}</span>
        </div>
      </div>
      <div class="body_middle">
        <video :src="MVUrl" autoplay controls loop></video>
        <div class="comment">
          <div class="comment_title">
            <span class="_title">评论</span>
            <span class="_titles">精彩评论({{ MVCount.total }})</span>
          </div>
          <div class="comment_count">
            <ul>
              <li v-for="item in MVCount.comments" :key="item.vid">
                <!-- 用户头像 -->
                <div class="count_head">
                  <img :src="item.user.avatarUrl" />
                </div>
                <!-- 评论内容 -->
                <div class="count_body">
                  <div class="body_count">
                    <a class="count_body_user">{{ item.user.nickname }} ：</a>
                    {{ item.content }}
                  </div>
                  <!-- 评论中的评论 -->
                  <div class="body_Replied" v-if="item.beReplied.length">
                    <div
                      class="body_Replied_count"
                      v-for="items in item.beReplied"
                      :key="items.id"
                    >
                      <a class="body_Replied_user"
                        >{{ items.user.nickname }} ：</a
                      >
                      {{ items.content }}
                    </div>
                  </div>
                  <p>{{ ToTime(item.time) }}</p>
                </div>
              </li>
            </ul>
          </div>
          <!-- 评论分页 -->
          <el-pagination
            background
            layout="pager"
            :total="MVCount.total"
            hide-on-single-page
            @size-change="SizeChange"
            @current-change="CurrentChange"
            :pager-count="10"
          >
          </el-pagination>
        </div>
      </div>
      <div class="body_right">
        <div class="right_title">相关推荐</div>
        <!-- MV类相似视频 -->
        <ul v-if="MVDetail.IsMV">
          <li v-for="item in Similar" :key="item.id">
            <img :src="item.cover" @click="MVPlayer(item.id)" />
            <span class="mv_name">{{ item.name }}</span>
            <span class="mv_artist">{{ item.artistName }}</span>
          </li>
        </ul>
        <!-- 综合类相似视频 -->
        <ul v-if="!MVDetail.IsMV">
          <li v-for="item in Similar" :key="item.id">
            <img :src="item.coverUrl" @click="MVPlayer(item.vid)" />
            <span class="mv_name">{{ item.title }}</span>
            <span class="mv_artist">{{ item.creator[0].userName }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="div_bottom"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      MVId: 0,
      MVUrl: '',
      MVDetail: {
        // 歌手
        artistName: '',
        // 视频名称
        name: '',
        // 播放次数
        playCount: 0,
        // 发布时间
        publishTime: '',
        // 视频类型 综合:false,MV:true
        IsMV: true
      },
      MVCount: {
        // 评论数量
        total: '',
        // 最新评论
        comments: [],
        // 发布时间
        time: ''
      },
      // 相似视频
      Similar: []
    }
  },
  watch: {
    MVId: {
      handler (newVal, oldVal) {
        this.axiosMVId()
      }
    }
  },
  mounted () {
    this.MVId = this.$route.params.Id
    this.axiosMVId()
  },
  methods: {
    axiosMVId () {
      const regString = /[a-zA-Z]+/
      if (regString.test(this.MVId)) {
        // 视频是综合类视频
        this.MVDetail.IsMV = false
        // 综合类视频调用
        axios.get(`/video/url?id=${this.MVId}`).then(res => {
          this.MVUrl = res.data.urls[0].url
        })
        // 获取综合类视频相关信息
        axios.get(`/video/detail?id=${this.MVId}`).then(res => {
          // console.log(res);
          this.MVDetail.artistName = res.data.data.artistName
          this.MVDetail.name = res.data.data.title
          // 时间戳转
          this.MVDetail.publishTime = this.ToTime(res.data.data.publishTime)
          // 播放次数
          this.PlayCount(res.data.data.playTime)
        })
        // 获取综合类视频相关评论信息
        axios.get(`/comment/video?id=${this.MVId}`).then(res => {
          // console.log(res.data.comments);
          this.MVCount.total = res.data.total
          this.MVCount.comments = res.data.comments
        })
        // 获取相似综合类视频
        axios.get(`/related/allvideo?id=${this.MVId}`).then(res => {
          console.log(res.data.data)
          this.Similar = res.data.data
        })
      } else {
        // 视频是MV
        this.MVDetail.IsMV = true
        // MV类视频调用
        axios.get(`/mv/url?id=${this.MVId}`).then(res => {
          // console.log(res);
          this.MVUrl = res.data.data.url
        })
        // 获取MV视频相关信息
        axios.get(`/mv/detail?mvid=${this.MVId}`).then(res => {
          // console.log(res);
          this.MVDetail.artistName = res.data.data.artistName
          this.MVDetail.name = res.data.data.name
          this.PlayCount(res.data.data.playCount)
          this.MVDetail.publishTime = res.data.data.publishTime
        })
        // 获取综合类视频相关评论信息
        axios.get(`/comment/mv?id=${this.MVId}`).then(res => {
          // console.log(res.data.comments);
          this.MVCount.total = res.data.total
          this.MVCount.comments = res.data.comments
        })
        // 获取相似MV视频信息
        axios.get(`/simi/mv?mvid=${this.MVId}`).then(res => {
          // console.log(res.data.mvs);
          this.Similar = res.data.mvs
        })
      }
    },
    // 时间戳转换
    ToTime (time) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const date = new Date(time)
      const Y = date.getFullYear() + '-'
      const M =
       (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      const D = date.getDate() + ' '
      const h = date.getHours() + ':'
      const m = date.getMinutes() + ':'
      const s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    // 播放次数
    PlayCount (count) {
      if (count > 9999) {
        this.MVDetail.playCount = (count / 10000).toFixed(1) + '万'
      } else {
        this.MVDetail.playCount = count
      }
    },
    // 跳转至推荐MV播放界面
    MVPlayer (Id) {
      this.MVId = Id
      this.$router.push({
        name: 'VideoMV',
        params: { Id: Id }
      })
    },
    // 评论分页切换，并获取分页评论信息
    CurrentChange (val) {
      // console.log(`当前页: ${val}`);
      const regString = /[a-zA-Z]+/
      if (regString.test(this.MVId)) {
        // 获取综合类视频相关评论信息
        axios.get(`/comment/video?id=${this.MVId}&offset=${val}`).then(res => {
          // console.log(res.data.comments);
          this.MVCount.total = res.data.total
          this.MVCount.comments = res.data.comments
        })
      } else {
        // 获取综合类视频相关评论信息
        axios.get(`/comment/mv?id=${this.MVId}&offset=${val}`).then(res => {
          // console.log(res.data.comments);
          this.MVCount.total = res.data.total
          this.MVCount.comments = res.data.comments
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.video_module {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .title {
    margin-left: 370px;
    font-size: 24px;
    .IsMV {
      font-size: 21px;
      font-weight: 500;
      color: red;
      border: 1px solid red;
      cursor: default;
    }
    span {
      font-size: 13px;
      color: #0c8ed9;
      cursor: pointer; //光标样式
    }
  }
  .video_body {
    width: 1400px;
    margin-left: 150px;
    // border: 1px solid rgb(10, 7, 211);
    .body_left {
      float: left;
      width: 200px;
      .video_cover {
        // margin-left: 10px;
        margin-bottom: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid #ccc;
        span {
          font-size: 20px;
        }
      }
      .video_time {
        margin-bottom: 10px;
        span {
          font-size: 13px;
          font-weight: 200;
        }
      }
      .video_paly {
        span {
          font-size: 13px;
          font-weight: 200;
        }
      }
    }
    .body_middle {
      width: 900px;
      float: left;
      //border: 1px solid rgb(11, 224, 11);
      video {
        width: 860px;
        height: 480px;
        //color: black;
        background-color: black;
      }
      .comment {
        .comment_title {
          height: 100px;
          //border-bottom: 1px solid rgb(205, 9, 223);
          ._title {
            display: block;
            font-size: 20px;
            margin-top: 15px;
            margin-bottom: 18px;
          }
          ._titles {
            font-size: 15px;
            font-weight: 300;
          }
        }
        .comment_count {
          ul {
            display: flex;
            flex-direction: column;
            li {
              //height: 75px;
              padding-top: 15px;
              list-style: none;
              //border-top: 1px solid #ccc;
              padding-top: 15px;
              padding-bottom: 15px;

              .count_head {
                width: 60px;
                float: left;
                img {
                  width: 50px;
                  height: 50px;
                  border-radius: 25px;
                }
              }
              .count_body {
                width: 90%;
                float: left;

                font-size: 14px;
                font-weight: 300;
                .body_count {
                  .count_body_user {
                    font-size: 16px;
                    color: #0c8ed9;
                    margin-bottom: 10px;
                    cursor: pointer; //光标样式
                  }
                }
                .body_Replied {
                  width: 100%;
                  height: 55px;
                  margin-top: 10px;
                  margin-left: 10px;
                  padding: 8px 19px;
                  background-color: #f4f4f4;
                  border: 1px solid #dedede;
                  .body_Replied_count {
                    //width: 90%;
                    //height: 100%;
                    margin-top: -5px;
                    float: left;
                    font-size: 12px;
                    font-weight: 300;
                    .body_Replied_user {
                      cursor: pointer; //光标样式
                      font-size: 14px;
                      color: #0c8ed9;
                      margin-bottom: 10px;
                    }
                  }
                }
                p {
                  margin-top: 10px;
                  font-size: 14px;
                  font-weight: 200;
                  color: #999;
                }
              }
            }
          }
        }
        .el-pagination{
          margin-left: 100px;
        }
      }
    }
    .body_right {
      width: 270px;
      padding-left: 25px;
      float: left;
      border-left: 1px solid #ccc;
      //border-right: 1px solid red;
      //
      .right_title {
        width: 200px;
        font-size: 24px;
        //margin-left: 40px;
        border-bottom: 1px solid #ccc;
      }
      ul {
        margin-top: 20px;
        margin-left: 25px;
        li {
          margin-top: 20px;
          list-style: none;
          img {
            width: 140px;
            height: 100px;
            cursor: pointer; //光标样式
          }
          span {
            display: block;
            &:hover {
              color: #0c8ed9;
              cursor: pointer; //光标样式
            }
          }
          .mv_name {
            width: 140px;
            font-size: 15px;
            overflow: hidden; //超出的文本隐藏
            white-space: nowrap; //溢出用省略号显示
            text-overflow: ellipsis; //溢出不换行
          }
          .mv_artist {
            font-size: 10px;
          }
        }
      }
    }
  }
  .div_bottom {
    height: 200px;
  }
}
</style>
