import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/HomePage/HomePage.vue'
import SingerList from '../components/SingerList/SingerList.vue'
import MusicChart from '../components/MusicChart/MusicChart.vue'
import RangkingList from '../components/RankingList/RankingList.vue'
import SongLyrics from '../components/SongLyrics/SongLyics.vue'
import Search from '../components/Search/SearchPage.vue'
import SearchSingle from '../components/Search/SearchSingle.vue'
import SearchSinger from '../components/Search/SearchSinger.vue'
import SearchAlbum from '../components/Search/SearchAlbum.vue'
import SearchMV from '../components/Search/SearchMV.vue'
import VideoMV from '../components/VideoMV/VideoMV.vue'
const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  //首页模块
  {
    path:'/HomePage',
    name:'Homepage',
    component: HomePage
  },
  //歌手模块
  {
    path:'/SingerList',
    name:'SingerList', 
    component: SingerList
  },
  //歌单模块
  {
    path:'/MusicChart',
    name:'MusicChart',
    component:MusicChart
  },
  //排行榜模块
  {
    path:'/RankingList',
    name:'RangkingList',
    component:RangkingList
  },
  //搜索模块
  {
    path:'/Search/:name',
    name:'Search',
    component:Search,
    //redirect:'/SearchSingle/:name',
    children:[
      //单曲搜索模块
      {path:'/SearchSingle/:name',name:'SearchSingle',component:SearchSingle},
      //歌手搜索模块
      {path:'/SearchSinger/:name',name:'SearchSinger',component:SearchSinger},
      //专辑搜索模块
      {path:'/SearchAlbum/:name',name:'SearchAlbum',component:SearchAlbum},
      //MV搜索模块
      {path:'/SearchMV/:name',name:'SearchMV',component:SearchMV}
    ]
  },
  //歌词模块
  {
    path:'/SongLyrics/:Id',
    name:'SongLyrics',
    component:SongLyrics
  },
  //MV模块
  {
    path:'/VideoMV/:Id',
    name:'VideoMV',
    component:VideoMV
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
