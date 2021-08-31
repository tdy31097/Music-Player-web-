<template>
  <div class="search">
    <div class="keyword">{{ keyword }}</div>
    <div class="song_header">
      <ul>
        <li>
          <router-link
            class="SongLink"
            :to="{ name: 'SearchSingle', params: { name: this.keyword } }"
          >
            单曲
          </router-link>
        </li>
        <li>
          <router-link
            class="SongLink"
            :to="{ name: 'SearchSinger', params: { name: this.keyword } }"
          >
            歌手
          </router-link>
        </li>
        <li>
          <router-link
            class="SongLink"
            :to="{ name: 'SearchAlbum', params: { name: this.keyword } }"
          >
            专辑
          </router-link>
        </li>
        <li>
          <router-link
            class="SongLink"
            :to="{ name: 'SearchMV', params: { name: this.keyword } }"
          >
            MV
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data () {
    return {
      // 关键字
      keyword: this.$route.params.name,
      keywords: '',
      // 关键字搜索结果
      songname: []
    }
  },
  components: {},
  created () {
    this.Route()
    this.keywords = this.keyword
  },
  watch: {
    // 监听route值的变化
    $route (to, from) {
      this.keyword = this.$route.params.name
      // if (this.keyword != this.keywords) {
      //   this.keywords = this.keyword;
      //   console.log(this.keyword + "与" + this.keywords);
      //   this.Route();
      //   this.Axios();
      // }
    }
  },
  mounted () {
    this.Route()
    this.keywords = this.keyword
  },
  methods: {
    // 从路由获取值并报存到data中
    Route () {
      this.$router.push({
        name: 'SearchSingle',
        params: { name: this.keyword }
      })
    }
    // Axios() {
    //   //console.log("执行");
    //   //获取关键字的搜索数据
    //   axios.get("/search?keywords=" + this.keyword).then(res => {
    //     console.log(res.data.result.songs);
    //     this.songname = res.data.result.songs;
    //   });
    // }
  }
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  display: flex;
  flex-direction: column; //纵向排列
  align-items: center;
  //border: 1px solid rgb(9, 12, 177);
  .song_header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    ul {
      width: 500px;
      display: flex;
      margin-right: -600px;
      justify-content: space-around;
      align-items: center;
      li {
        list-style: none;
        cursor: pointer; //光标样式
        font-size: 18px;
        .SongLink {
          text-decoration: none;
          color: black;
          &:hover {
            color: #0c8ed9;
          }
        }
        .active {
          color: #0c8ed9;
        }
      }
    }
  }
}
</style>
