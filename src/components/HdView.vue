<template>
  <div class="header">
    <!-- 导航栏上半部分 -->
    <div class="headerUp">
      <!-- <div class="wy"></div> -->
      <!-- 搜索框 -->
      <div class="search">
        <input
          type="text"
          placeholder="音乐/歌手/歌单/MV"
          v-model="searchData"
          @keyup.enter="toSearchSong"
        />
        <i class="el-icon-search" @click="toSearchSong" />
      </div>
      <!-- 菜单栏 -->
    </div>
    <div class="menu">
      <ul>
        <li>
          <router-link class="routerLink" to="/HomePage">
            首页
          </router-link>
        </li>
        <li>
          <router-link class="routerLink" to="/SingerList">
            歌手
          </router-link>
        </li>
        <li>
          <router-link class="routerLink" to="/MusicChart">
            歌单
          </router-link>
        </li>
        <li>
          <router-link class="routerLink" to="/RankingList">
            排行榜
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchData: ''
    }
  },
  methods: {
    toSearchSong () {
      if (this.searchData.trim() !== '') {
        this.$router.push({
          name: 'SearchSingle',
          params: { name: this.searchData }
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
.header {
  width: 100%;
  height: 128px;
  display: flex;
  flex-direction: column;
  .headerUp {
    height: 78px;
    border-bottom: 1px solid #666;
    display: flex;
    justify-content: center;
    align-items: center;
    .wy {
      height: 78px;
    }
    .search {
      width: 300px;
      height: 35px;
      border: 1px solid #ccc;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        width: 250px;
        border: none;
        outline: none;
        font-size: 18px;
        font-weight: 340; //字体粗细
      }
      i {
        font-size: 18px;
        margin-right: 8px;
        color: #666;
        cursor: pointer; //光标样式
        &:hover {
          color: #0c8ed9;
        }
      }
    }
  }
  .menu {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;background-color: #2c323b;
    ul {
      height: 50px;
      width: 500px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        //height: 50px;
        list-style: none;
        cursor: pointer; //光标样式
        &:hover{
        }
        .routerLink {
          margin-top: 40px;
          top: 10px;
          font-size: 20px;
          text-decoration: none;
          color: #ddd;
          &:hover {
            color: #0c8ed9;
          }
        }
        //使用router实现高亮显示
        .active {
          color: #0c8ed9;
        }
      }
    }
  }
}
</style>
