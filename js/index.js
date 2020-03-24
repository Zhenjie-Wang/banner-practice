window.onload = function() {
  /* 为#imgList设置宽度 */
  //获取#imgList
  var imgList = document.getElementById("imgList");
  //获取img
  var imgArr = document.getElementsByTagName("img");
  //设置width
  imgList.style.width = 520 * imgArr.length + "px";

  /* 为#imgNav设置left */
  //获取#imgNav
  var imgNav = document.getElementById("imgNav");
  //获取#outer
  var outer = document.getElementById("outer");
  //设置left
  imgNav.style.left = (outer.offsetWidth - imgNav.offsetWidth) / 2 + "px";

  /* 设置当前图片默认选中状态 */
  //设置索引
  var index = 0;
  //获取所有a标签
  var allA = document.getElementsByTagName("a");
  //将默认显示的第一张图片的导航设置为选中状态
  allA[index].style.backgroundColor = "black";

  /* 设置点击切换图片 */
  for (var i = 0; i < allA.length; i++) {
    //给allA添加num属性
    allA[i].num = i;
    //绑定单击响应函数
    allA[i].onclick = function() {
      //停止自动播放
      clearInterval(timer);
      //将当前图片的索引赋值给index
      index = this.num;
      // //根据图片索引，改变#imgList的left,从而更改图片
      // imgList.style.left = -520 * index + "px";
      //调用move函数，设置图片切换动画
      move(imgList, "left", -520 * index, 60, function() {
        //点击后，重新调用自动切换
        autoChange();
      });
      //调用setA函数，设置选中的a的状态
      setA();
    };
  }

  /* 调用自动切换 */
  autoChange();

  /* 设置选中的a的状态 */
  function setA() {
    //判断当前索引是否是最后一张图片
    if (index >= imgArr.length - 1) {
      //则将index设置为0
      index = 0;
      //此时显示的最后一张图片，而最后一张图片和第一张是一摸一样
      //通过CSS将最后一张切换成第一张
      imgList.style.left = 0;
    }
    //将当前索引默认选中状态
    for (var j = 0; j < allA.length; j++) {
      //先将所有设置为红色
      allA[j].style.backgroundColor = "";
    }
    //再将当前选中图片设置为黑色
    allA[index].style.backgroundColor = "black";
  }

  /* 设置图片自动切换 */
  var timer;
  function autoChange() {
    timer = setInterval(function() {
      //使index自增
      index++;
      //判断index
      index = index % imgArr.length;
      //调用move函数，设置图片切换动画
      move(imgList, "left", -520 * index, 60, function() {
        //设置导航
        setA();
      });
    }, 3000);
  }
};
