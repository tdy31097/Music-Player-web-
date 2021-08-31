<template>
  <!-- 首页模块 -->
  <div class="banner">
    <ul class="ulList">
      <li class="item active" style="background: url(../../imgs/1.jpg);"></li>
      <li class="item" style="background: url(../../imgs/2.jpg);"></li>
      <li class="item" style="background: url(../../imgs/3.jpg);"></li>
      <li class="item" style="background: url(../../imgs/4.jpg);"></li>
      <li class="item" style="background: url(../../imgs/5.jpg);"></li>
      <li class="item" style="background: url(../../imgs/6.jpg);"></li>
      <li class="item" style="background: url(../../imgs/7.jpg);"></li>
    </ul>
    <div class="btn-left">
      {{ left }}
    </div>
    <div class="btn-right">
      {{ right }}
    </div>
    <ul class="ulCircle">
      <li class="liCircle white"></li>
      <li class="liCircle"></li>
      <li class="liCircle"></li>
      <li class="liCircle"></li>
      <li class="liCircle"></li>
      <li class="liCircle"></li>
      <li class="liCircle"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      left: '<',
      right: '>',
      load: 1// 判断是否继续执行轮播图
    }
  },
  mounted () {
    const items = document.getElementsByClassName('item')
    const circles = document.getElementsByClassName('liCircle')
    const leftBtn = document.getElementsByClassName('btn-left')[0]
    const rightBtn = document.getElementsByClassName('btn-right')[0]
    const content = document.querySelector('.banner')
    let index = 0
    let timer = null
    const that = this
    // 清空class
    const clearclass = function () {
      for (let i = 0; i < items.length; i++) {
        items[i].className = 'item'
        circles[i].className = 'liCircle'
        circles[i].setAttribute('num', i)
      }
    }
    /* 只显示一个class */
    function move () {
      // 切换组件后防止继续执行并报错
      if (that.load === 1) {
        clearclass()
        items[index].className = 'item active'
        circles[index].className = 'liCircle white'
      }
    }
    // 点击右边按钮切换下一张图片
    rightBtn.onclick = function () {
      if (index < items.length - 1) {
        index++
      } else {
        index = 0
      }
      move()
    }
    // 点击左边按钮切换上一张图片
    leftBtn.onclick = function () {
      if (index > 0) {
        index--
      } else {
        index = items.length - 1
      }
      move()
    }
    // 开始定时器，点击右边按钮，实现轮播
    timer = setInterval(() => {
      rightBtn.onclick()
    }, 1500)
    // 点击圆点时，跳转到对应图片
    for (var i = 0; i < circles.length; i++) {
      circles[i].addEventListener('click', function () {
        index = this.getAttribute('num')
        move()
      })
    }
    // 鼠标移入清除定时器，并开启一个三秒的定时器，使慢慢转动
    content.onmouseover = function () {
      clearInterval(timer)
      timer = setInterval(function () {
        rightBtn.onclick()
      }, 3000)
    }
    // 鼠标移出又开启定时器
    content.onmouseleave = function () {
      clearInterval(timer)
      timer = setInterval(function () {
        rightBtn.onclick()
      }, 1500)
    }
  },
  methods: {},
  // 组件切换后~销毁之前被调用
  beforeUnmount () {
    this.load = 0
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  width: 100%;
  list-style: none;
}
.banner {
  width: 100%;
  height: 445px;
  position: relative;
  &:hover .btn-left {
    /*鼠标滑入，显示图标*/
    opacity: 1;
  }
  &:hover .btn-right {
    /*鼠标滑入，显示图标*/
    opacity: 1;
  }
  .ulList {
    width: 100%;
    height: 100%;
    // border: 1px solrgb(52, 184, 96)88);
    .item {
      width: 100%;
      height: 445px;
      position: absolute;
      opacity: 0;
      transition: all 1s;
    }
    .item.active {
      opacity: 1;
    }
  }
  .btn-left {
    width: 60px;
    height: 120px;
    font-size: 100px;
    font-weight: 100;
    color: rgba(241, 238, 238, 0.5);
    background-color: rgba(0, 0, 0, 0.2);
    line-height: 100px;
    z-index: 10;
    /*始终显示在图片的上层*/
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-60%);
    /*使按钮向上偏移居中对齐*/
    cursor: pointer;
    opacity: 0;
    /*平时隐藏*/
    &:hover {
      color: rgba(241, 238, 238, 0.7);
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  .btn-right {
    width: 60px;
    height: 120px;
    font-size: 100px;
    font-weight: 100;
    color: rgba(241, 238, 238, 0.5);
    background-color: rgba(0, 0, 0, 0.2);
    line-height: 100px;
    z-index: 10;
    /*始终显示在图片的上层*/
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-60%);
    /*使按钮向上偏移居中对齐*/
    cursor: pointer;
    opacity: 0;
    /*平时隐藏*/
    &:hover {
      color: rgba(241, 238, 238, 0.7);
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  .ulCircle {
    width: 200px;
    height: 20px;
    display: flex;
    position: absolute;
    bottom: 20px;
    right: 45%;
    .liCircle {
      width: 15px;
      height: 15px;
      border-radius: 15px;
      justify-content: space-around;
      background: rgba(245, 243, 243, 0.4);
      cursor: pointer;
      margin: 5px;
      &:hover {
        background: #ffffff;
      }
    }
    .white {
      background-color: #ffffff;
    }
  }
}
</style>
