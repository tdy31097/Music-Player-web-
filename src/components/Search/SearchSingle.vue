<template>
  <div class="Single">
    <div class="header">单曲列表{{ keyword }}</div>
    <div class="songList">
      <ul class="songList_header">
        <li class="songList_header_songname">歌曲</li>
        <li class="songList_header_singer">歌手</li>
        <li class="songList_header_album">专辑</li>
        <li class="songList_header_time">时长</li>
      </ul>
      <ul
        class="songList_content"
        v-for="(item, index) in songmessag"
        :key="item.id"
      >
        <li>
          <div class="content_id">{{ index + 1 }}</div>
          <div class="content_name" @click="setSongId(item.id)">
            {{ item.name }}
          </div>
          <div class="content_singer">{{ item.artists[0].name }}</div>
          <div class="content_album">《{{ item.album.name }}》</div>
          <div class="content_time">
            {{ parseInt(item.duration / 60000) }}:
            {{
              parseInt((item.duration / 1000) % 60) > 9
                ? parseInt((item.duration / 1000) % 60)
                : "0" + parseInt((item.duration/1000)%60)
                }}
          </div>
        </li>
      </ul>
    </div>
    <div class="blank"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      // 关键字
      keyword: '',
      // 保存歌曲信息
      songmessag: []
    }
  },
  computed: {
    ...mapState(['songId'])
  },
  watch: {
    // 监听route值的变化
    $route (to, from) {
      this.keyword = this.$route.params.name
    },
    // 监听事件：当keyword数据发生变化时
    keyword: {
      // data.keyword数据发生变化就会调用这个函数
      handler (newVal, oldVal) {
        this.Axios()
      }
      // immediate: true,//立即处理 进入页面就触发
      // deep: true   //深度监听，监听到更深层级值的变化
    }
  },
  mounted () {
    this.keyword = this.$route.params.name
    // this.Axios();
  },
  methods: {
    // 发送歌曲Id到audio界面
    ...mapMutations(['setSongId']),
    // 获取关键字的搜索数据数据
    Axios () {
      // console.log("执行");
      axios.get(`/search?keywords=${this.keyword}`).then(res => {
        this.songmessag = res.data.result.songs
        // console.log(this.songmessag);
      })
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
.Single {
  width: 100%;
  border: 1px solid rgb(26, 223, 8);
  //歌曲列表导航栏
  .songList {
    width: 80%;
    margin-left: 10%;
    display: flex;
    flex-direction: column; //纵向排列
    justify-content: space-around;
    align-items: center;
    //border: 1px solid red;
    //列表导航栏
    .songList_header {
      width: 100%;
      height: 50px;
      line-height: 50px;
      //border: 1px solid red;
      background-color: rgba(0, 0, 0, 0.01);
      color: #999;
      li {
        list-style: none;
        white-space: normal; //文本不换行
      }
      .songList_header_songname {
        width: 40%;
        margin-left: 4%;
        float: left;
      }
      .songList_header_singer {
        width: 23%;
        float: left;
        // border: 1px solid rgb(132, 12, 212);
      }
      .songList_header_album {
        width: 23%;
        float: left;
      }
      .songList_header_time {
        width: 10%;
        float: right;
      }
    }
  }
  //歌曲列表内容
  .songList_content {
    width: 100%;
    display: flex;
    flex-direction: column; //纵向排列
    justify-content: center;
    align-items: center;
    //border: 1px solid red;
    color: #333;
    //
    &:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.02);
    }
    li {
      width: 100%;
      height: 50px;
      line-height: 50px;
      list-style: none;
      //border: 1px solid rgb(50, 238, 12);
      .content_id {
        width: 4%;
        float: left;
      }
      .content_name {
        width: 40%;
        float: left;
        overflow: hidden;
        &:hover {
          color: #0c8ed9;
          cursor: pointer; //光标样式
        }
      }
      .content_singer {
        width: 23%;
        float: left;
        overflow: hidden;
        &:hover {
          color: #0c8ed9;
          cursor: pointer; //光标样式
        }
      }
      .content_album {
        width: 23%;
        float: left;
        overflow: hidden; //文字长度超出限定宽度，则隐藏超出的内容
        white-space: nowrap; //文字单行显示，不能换行
        &:hover {
          color: #0c8ed9;
          cursor: pointer; //光标样式
        }
      }
      .content_time {
        width: 10%;
        float: right;
        overflow: hidden;
      }
    }
  }
  .blank{
    height: 100px;
  }
}
</style>
