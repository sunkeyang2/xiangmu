

class Banner {
    constructor (select) {
      // 范围元素
      this.ele = document.querySelector('.banner')
      // imgBox
      this.imgBox = this.ele.querySelector('.imgBox')
      // pointBox
      this.pointBox = this.ele.querySelector('.pointBox')
      // 接受定时器返回值
      this.timer = 0
      // 表示索引的属性
      this.index = 1
      // 开关
      this.flag = true
      // 可视窗口的宽度
      this.banner_width = this.ele.clientWidth

      this.init()
    }

    init () {
      this.setPoint()
      this.copyEle()
      this.autoPlay()
      this.overOut()
      this.pointEvent()
      this.tabChange()
    }

    

    setPoint () {
        const num = this.imgBox.children.length
        console.log(num)
    
        const frg = document.createDocumentFragment()
        for (let i = 0; i < num; i++) {
          const li = document.createElement('li')
          if (i === 0) li.classList.add('active')
          li.dataset.page = i
          frg.appendChild(li)
        }
        this.pointBox.appendChild(frg)
        this.pointBox.style.width = num * (10 + 10) + 'px'
      }

      copyEle () { 
        const { imgBox: box, banner_width: bw } = this
        const first = box.firstElementChild.cloneNode(true)
        const last = box.lastElementChild.cloneNode(true)
        box.appendChild(first)
        box.insertBefore(last, box.firstElementChild)
        box.style.width = box.children.length * 100 + '%'
        box.style.left = -bw + 'px'
       
       
      }

      autoPlay () {
        
        this.timer = setInterval(() => {
          this.index++
          move(this.imgBox, { left: -this.index * this.banner_width }, () => this.moveEnd())
        }, 2000)
      }

      moveEnd () {
        const { index, imgBox: box, banner_width: bw, pointBox: pBox } = this

        if (index === box.children.length - 1) {
          this.index = 1
          box.style.left = -this.index * bw + 'px'
        }

        if (index === 0) {
          this.index = box.children.length - 2
          box.style.left = -this.index * bw + 'px'
        }

        for (let i = 0; i < pBox.children.length; i++) {
          pBox.children[i].classList.remove('active')
        }
        pBox.children[this.index - 1].classList.add('active')

        this.flag = true
      }



      overOut () {
        this.ele.addEventListener('mouseover', () => clearInterval(this.timer))

        this.ele.addEventListener('mouseout', () => this.autoPlay())
      }

      pointEvent () {
        this.pointBox.addEventListener('click', e => {
          e = e || window.event
          const target = e.target || e.srcElement
    
          if (target.nodeName === 'LI') {
            if (!this.flag) return
            this.flag = false
            this.index = target.dataset.page - 0 + 1
            move(this.imgBox, { left: -this.index * this.banner_width }, this.moveEnd.bind(this))
          }
        })
      }
      tabChange () {
        document.addEventListener('visibilitychange', () => {
          const state = document.visibilityState
    
          if (state === 'hidden') clearInterval(this.timer)
          if (state === 'visible') this.autoPlay()
        })
      }
    }

    const b = new Banner('.banner')


    
    const ul = document.querySelector('.ab')

    // 1. 给 input 绑定一个 input 事件
    const inp = document.querySelector('input')
    inp.addEventListener('input', function () {
      // 2. 拿到用户输入的内容
      const text = this.value.trim()

      // 3. 通过动态创建 script 标签的方式来发送请求
      const script = document.createElement('script')
      // 添加 src 属性
      // 原生属性, 直接元素.属性名 = 属性值
      script.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,33222,33306,33259,33235,32973,33351,33313,33312,33311,33310,33309,33308,33307,33145,22159,33389&wd=${ text }&req=2&csor=4&pwd=aiq&cb=bindHtml&_=1608775410035`
      // 插入到 body 内部
      document.body.appendChild(script)
      // 卸磨杀驴
      // 使用完毕以后偶, 直接删除 script 标签
      // remove() 直接把自己干掉
      script.remove()
    })


    // 4. 准备一个请求回来的函数
    function bindHtml(res) {
      // console.log(res)
      // 4-2. 判断是否有 g 的存在
      if (!res.g) {
        // 表示 g 不存在
        ul.style.display = 'none'
        return
      }

      // 能来到这里, 表示 res.g 存在, 那么就循环遍历 res.g 渲染页面
      let str = ''
      res.g.forEach(item => {
        str += `
          <li>${ item.q }</li>
        `
      })
      // 渲染完毕以后, 插入到 ul 内部
      ul.innerHTML = str
      // 让 ul 显示出来
      ul.style.display = 'block'
    }
  

  
//瀑布流
$(function() {
  
  const uls = document.querySelectorAll('.content>ul');
  let start = 0;
  // console.log(uls);

  //准备一个开关
  let flag = true;

  function getMinUl() {
      //找到最短的ul返回
      let minUl = uls[0];
      for (let i = 0; i < uls.length; i++) {
          if (uls[i].offsetHeight < minUl.offsetHeight) {
              //比我假设的高度段
              minUl = uls[i]
          }
      }
      return minUl;
  }

  //请求第一页的数据，把每一条渲染成一个li
  //找到最短的ul放进去
  getList()

  function getList() {
    
      if (!flag) return;
      flag = false;
      ajax({
          url: '/dt',
          data: {
              include_fields: 'top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count',
              filter_id: '旅行',
              start: start,
              _: 1608791577892
          },
          success: res => {
              console.log(res);
              start = res.data.object_list;
              // console.log(start);
              bindHtml(res.data.object_list);

              //表示渲染页面完毕了
              flag = true;
          }

      })
  }

  // 渲染页面的函数

  function bindHtml(list) {
      // console.log(list);
      //循环遍历list
      list.forEach(item => {

          //计算每一个图片显示的高度
          const height = item.photo.height * 340 / item.photo.width
              //每一个item就是一个li
      
          const str = `
              <li>
                  <div class="top" style="height: ${ height }px">
                      <img src="${ item.photo.path }" alt="">
                  </div>
                  <div class="bottom">
                      <div class="title">${ item.msg }</div>
                      <div class="author">
                      <div class="avatar">
                          <img src="${ item.sender.avatar }" alt="">
                      </div>
                      <div class="name">
                          ${ item.sender.username }
                      </div>
                      </div>
                  </div>
              </li>
        `
              //每次都要找到最短的ul
          const min = getMinUl();
          //把本次组装的str添加到ul里面
          min.innerHTML += str;
      })
  }
  
  // 加载第二页
  window.onscroll = function() {
      //卷曲高度
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          //可是窗口高
      const windowHeight = document.documentElement.clientHeight;
      //最短ul
      const minUl = getMinUl();
      //最短ul的高度
      const ulHeight = minUl.offsetHeight;
      //最短ul的上方偏移量
      const ulTop = minUl.offsetTop;
      //条件判断
      if (ulHeight + ulTop <= windowHeight + scrollTop) {
          // console.log('底边进来了')
          getList();
      }
  }
});

