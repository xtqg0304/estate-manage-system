<template>
  <div class="login-container">
    <el-row style="text-align:left;background-color:#fff;">
      <img src="../../assets/images/homeSysLogo.png"
           alt="">
    </el-row>
    <el-row>
      <section class="demo">
        <nav class="nav">
          <ul>
            <li>
              <a href="http://www.17sucai.com/"><span>
              <svg-icon icon-class="vehicle" /></span></a>
              <span>车辆系统</span>
            </li>
            <li>
              <a href="http://www.17sucai.com/"><span>
              <svg-icon icon-class="door" /></span></a>
              <span>门禁系统</span>
            </li>
            <li>
              <a href="http://www.17sucai.com/"><span>
              <svg-icon icon-class="build" /></span></a>
              <span>宿舍系统</span>
            </li>
            <li>
              <a href="http://www.17sucai.com/"><span>
              <svg-icon icon-class="field1" /></span></a>
              <span>场地系统</span>
            </li>
            <li>
              <a href="http://www.17sucai.com/"><span>
              <svg-icon icon-class="bigData" /></span></a>
              <span>大数据系统</span>
            </li>
          </ul>
        </nav>
      </section>
    </el-row>
    <footer id="footer">
      <p>© 2019 福建星网锐捷通讯股份有限公司 v3.5.2</p>
    </footer>
  </div>
</template>

<script>

</script>

<style rel="stylesheet/scss" lang="scss">
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url("../../assets/images/bgLogin.jpg");
}
/* 效果CSS开始 */
body {
  -webkit-backface-visibility: hidden;
}
.demo {
  margin: 150px auto 0;
  text-align: center;
}
.nav li {
  position: relative;
  display: inline-block;
  margin: 20px;
  -webkit-transition: all 0.4s linear;
  -moz-transition: all 0.4s linear;
  -o-transition: all 0.4s linear;
  -ms-transition: all 0.4s linear;
  transition: all 0.4s linear;
}
.nav li a {
  display: inline-block;
  width: 160px;
  height: 160px;
  padding: 30px;
  border-radius: 50%;
  border-width: 8px;
  border-style: solid;
  //   color: #fff;
  //   text-shadow: 0 1px 0 #141c6b;
  //   border-color: #fff;
  //   background-color: #141c6b;
}
.nav li > span {
  color: #ffffff;
  font-size: 1.5rem;
  margin: 20px 0;
}
.nav li:hover {
  z-index: 11;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}
.nav li:hover a {
  text-decoration: none;
}
.nav li:hover span {
  -webkit-transition: all 0.4s linear;
  -moz-transition: all 0.4s linear;
  -o-transition: all 0.4s linear;
  -ms-transition: all 0.4s linear;
  transition: all 0.4s linear;
  -webkit-animation: moveFromBottom 0.3s ease;
  -moz-animation: moveFromBottom 0.3s ease;
  -o-animation: moveFromBottom 0.3s ease;
  -ms-animation: moveFromBottom 0.3s ease;
  animation: moveFromBottom 0.3s ease;
}
.nav li:nth-child(1) a {
  color: #4d9683;
  text-shadow: 0 1px 0 #9de3cf;
  border-color: #549e89;
  background-color: #51c9a7;
}
.nav li:nth-child(2) a {
  color: #be607e;
  text-shadow: 0 1px 0 #de8ba5;
  border-color: #e499b0;
  background-color: #e67b9c;
}
.nav li:nth-child(3) a {
  color: #5e9eb4;
  text-shadow: 0 1px 0 #adddec;
  border-color: #a2cfde;
  background-color: #7ec9e3;
}
.nav li:nth-child(4) a {
  color: #ba9d5e;
  text-shadow: 0 1px 0 #f5e0ad;
  border-color: #dcc999;
  background-color: #f0cd78;
}
.nav li:nth-child(5) a {
  color: #b468a2;
  text-shadow: 0 1px 0 #e8acd8;
  border-color: #d8abcd;
  background-color: #dd91cb;
}
.nav li:nth-child(1):hover a {
  color: #0f775c;
  text-shadow: 0 1px 0 #81e6c9;
  border-color: #0a8462;
  background-color: #00c18c;
}
.nav li:nth-child(2):hover a {
  color: #b12a55;
  text-shadow: 0 1px 0 #ff95b7;
  border-color: #ba335c;
  background-color: #ea5180;
}
.nav li:nth-child(3):hover a {
  color: #2883a2;
  text-shadow: 0 1px 0 #9cdef2;
  border-color: #4397b3;
  background-color: #55c1e5;
}
.nav li:nth-child(4):hover a {
  color: #ab8228;
  text-shadow: 0 1px 0 #ffe199;
  border-color: #b08f3e;
  background-color: #f8c64d;
}
.nav li:nth-child(5):hover a {
  color: #a33689;
  text-shadow: 0 1px 0 #ec97d6;
  border-color: #b7569f;
  background-color: #dd70c3;
}
.nav span {
  display: block;
  width: 100%;
  height: 100%;
}
.nav span .svg-icon {
  display: block;
  width: 100%;
  height: 100%;
}
// .nav li:nth-child(1) span .svg-icon {
//   content: "home";
// }
// .nav li:nth-child(2) span:before {
//   content: "phone";
// }
// .nav li:nth-child(3) span:before {
//   content: "wifi";
// }
// .nav li:nth-child(4) span:before {
//   content: "setting";
// }
// .nav li:nth-child(5) span:before {
//   content: "twitter";
// }
@-webkit-keyframes moveFromBottom {
  from {
    -webkit-transform: translateY(120%) scale(0.5);
    opacity: 0;
  }
  to {
    -webkit-transform: translateY(0%) scale(1);
    opacity: 1;
  }
}
@-moz-keyframes moveFromBottom {
  from {
    -moz-transform: translateY(120%) scale(0.5);
    opacity: 0;
  }
  to {
    -moz-transform: translateY(0%) scale(1);
    opacity: 1;
  }
}
@-ms-keyframes moveFromBottom {
  from {
    -ms-transform: translateY(120%) scale(0.5);
    opacity: 0;
  }
  to {
    -ms-transform: translateY(0%) scale(1);
    opacity: 1;
  }
}
@-o-keyframes moveFromBottom {
  from {
    -o-transform: translateY(120%) scale(0.5);
    opacity: 0;
  }
  to {
    -o-transform: translateY(0%) scale(1);
    opacity: 1;
  }
}
@keyframes moveFromBottom {
  from {
    transform: translateY(120%) scale(0.5);
    opacity: 0;
  }
  to {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }
}
.nav span:before {
  font-family: "LigatureSymbols";
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -ms-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  font-smoothing: antialiased;
  -webkit-font-feature-settings: "liga" 1, "dlig" 1;
  -moz-font-feature-settings: "liga=1, dlig=1";
  -ms-font-feature-settings: "liga" 1, "dlig" 1;
  font-feature-settings: "liga" 1, "dlig" 1;
  font-size: 80px;
}
/* 效果CSS结束 */
#footer {
  position: absolute;
  bottom: 5px;
  color: #efefef;
  text-align: center;
  width: 100%;
}
</style>
