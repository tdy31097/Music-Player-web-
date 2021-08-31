<template>
  <div class="VideoMv">
    <div class="mv">搜索结果：<a>{{keyword}}</a></div>
    <div class="MvList">
      <ul>
        <li v-for="item in MVmessag" :key="item.vid">
          <img :src="item.coverUrl" @click="MVPlayer(item.vid)" />
          <a class="mv_name">{{ item.title }}</a>
          <a class="mv_artist">{{ item.creator[0].userName }}</a>
        </li>
      </ul>
      <div class="comment">
        <el-pagination
          background
          layout="pager"
          :total="videoCount"
          @current-change="CurrentChange"
          :pager-count="10"
        >
        </el-pagination>
      </div>
    </div>

    <!-- :total="MVCount.total" -->
    <!-- 评论分页 -->

    <div class="blank"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      // 关键字
      keyword: '',
      // MV信息
      MVmessag: [],
      videoCount: 0
    }
  },
  created () {},
  mounted () {
    this.keyword = this.$route.params.name
    this.axiosMV()
  },
  methods: {
    // 获取视频搜索结果
    axiosMV () {
      axios.get(`/search?keywords=${this.keyword}&type=1014`).then(res => {
        // console.log(res);
        // console.log(res);
        this.MVmessag = res.data.result.videos
        this.videoCount = res.data.result.videoCount
      })
    },
    // 跳转到MV播放组件
    MVPlayer (Id) {
      this.$router.push({
        name: 'VideoMV',
        params: { Id: Id }
      })
    },
    // 获取分页视频
    CurrentChange (val) {
      axios.get(`/search?keywords=${this.keyword}&offset=${val}&type=1014`).then(res => {
        console.log(res)
        // console.log(res);
        this.MVmessag = res.data.result.videos
        this.videoCount = res.data.result.videoCount
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
.VideoMv {
  //width: 1000px;
  //border: 1px solid rgb(26, 223, 8);
  .mv {
    margin-left:30px;
    width: 100%;
    //border: 1px solid rgb(12, 15, 184);
    a{
      color: #0c8ed9;
    }
  }
  .MvList {
    width: 1200px;
    margin-left: 10%;
    bottom: 100px;
    //border: 1px solid rgb(148, 10, 190);
    ul {
      width: 100%;
      margin-left: -100px;
      //display: flex;
      li {
        width: 180px;
        height: 150px;
        margin-right: 25px;
        float: left;
        list-style: none;
        cursor: pointer; //光标样式
        img {
          width: 180px;
          height: 101px;
        }
        .mv_name {
          width: 180px;
          font-size: 14px;
          display: block;
          overflow: hidden; //超出的文本隐藏
          white-space: nowrap; //溢出用省略号显示
          text-overflow: ellipsis; //溢出不换行
          &:hover {
            color: #0c8ed9;
          }
        }
        .mv_artist {
          font-size: 10px;
          &:hover {
            color: #0c8ed9;
          }
        }
      }
    }
    .comment {
      display: block;
      //width: 500px;
      position: absolute;
      right: 50%;
      bottom: -230px;
      .el-pagination {
      }
    }
  }

  .blank {
    //height: 140px;
    height: 100px;
    width: 100px;
    //border: 1px solid red;
    position: absolute;
    left: 30px;
    bottom: -335px;
  }
}
</style>
