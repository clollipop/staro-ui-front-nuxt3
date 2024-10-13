<template>
  <el-dialog
    v-model="centerDialogVisible"
    class="login-dialog"
    :width="isMobile? '90%' : '50%'"
    center
  >
    <!--  PC端登录注册弹窗  -->
    <div
      v-if="!isMobile"
      id="dowebok"
      :class="`dowebok ${activeTab === 'login' ? '' : 'right-panel-active'} `"
    >
      <div class="form-container sign-up-container">
        <el-form
          ref="loginFormRef"
          :rules="formRules"
          :model="form"
        >
          <h1>注册</h1>
          <div class="social-container" />
          <span />
          <el-form-item prop="email">
            <el-input
              v-model="form.email"
              type="text"
              placeholder="电子邮箱"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model="form.code"
            >
              <template #append>
                <el-button
                  style="padding: 5px;border-radius: 0 5px 5px 0;"
                  :class="codeActive ? '' : 'code_active'"
                  @click="sendCodeHandler"
                >
                  {{ codeActive ? countdown + "秒后重试" : "发送验证码" }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-button @click="submitForm">
            注册
          </el-button>
        </el-form>
      </div>
      <div class="form-container sign-in-container">
        <el-form
          ref="loginFormRef"
          :rules="formRules"
          :model="form"
        >
          <h1>登录</h1>
          <div class="social-container" />
          <span />
          <el-form-item prop="email">
            <el-input
              v-model="form.email"
              type="text"
              placeholder="电子邮箱"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
            />
          </el-form-item>
          <a href="#">忘记密码</a>
          <el-button @click="submitForm">
            登录
          </el-button>
        </el-form>
      </div>
      <div class="overlay-container">
        <div class="overlay-login">
          <div class="overlay-panel overlay-left">
            <h1>已有帐号？</h1>
            <p>请使用您的帐号进行登录</p>
            <button
              id="signIn"
              class="ghost"
              @click="toggleTab('login')"
            >
              登录
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有帐号？</h1>
            <p>立即注册加入我们，和我们一起开始旅程吧</p>
            <button
              id="signUp"
              class="ghost"
              @click="toggleTab('register')"
            >
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 移动端登录注册弹窗    -->
    <template #header>
      <div
        v-if="isMobile"
        class="my-header"
      >
        <div
          style="margin-left: 4rem;"
          :class="{ active: activeTab === 'login' }"
          @click="toggleTab('login')"
        >
          登录
        </div>
        <div
          :class="{ active: activeTab === 'register' }"
          @click="toggleTab('register')"
        >
          注册
        </div>
      </div>
      <div
        v-if="isMobile"
        class="underline"
      /> <!-- 底部横线 -->
    </template>
    <div
      v-if="isMobile"
      class="dialog-body"
    >
      <el-form
        ref="loginFormRef"
        :rules="formRules"
        :model="form"
        label-width="100px"
        style="max-width: 600px"
      >
        <el-form-item
          label="邮箱："
          prop="email"
        >
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item
          label="密码："
          prop="password"
        >
          <el-input
            v-model="form.password"
            type="password"
          />
        </el-form-item>
        <el-form-item
          v-if="!(activeTab === 'login')"
          label="验证码："
          prop="code"
        >
          <el-input
            v-model="form.code"
          >
            <template #append>
              <el-button
                style="padding: 5px;border-radius: 0 5px 5px 0;"
                :class="codeActive ? '' : 'code_active'"
                @click="sendCodeHandler"
              >
                {{ codeActive ? countdown + "秒后重试" : "发送验证码" }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div
        v-if="isMobile"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="submitForm"
        >
          {{ activeTab === "login" ? "登录" : "注册" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import {loginMailCode, loginMailPassword, MailSceneEnum, sendCode} from "@/api/user/auth";
import {useTokenStore} from "@/store/tokenStore";
import {getUserInfo} from "@/api/user/user";
import {useUserStore} from "@/store/userStore";
const tokenStore = useTokenStore();
const userStore = useUserStore();
const loginFormRef = ref();
// 是否是移动端
const isMobile =useNuxtApp().$viewport.isLessThan("tablet");
// 表单的校验规则
const formRules = reactive({
  email: [
    {required: true, message: "请输入邮箱", trigger: "blur"},
    {type: "email", message: "请输入正确的邮箱格式", trigger: "blur"}
  ],
  password: [
    {required: true, message: "请输入密码", trigger: "blur"},
    {min: 6,max: 16, message: "密码长度不能少于6位大于16位", trigger: "blur"}
  ],
  code: {required: true, message: "请输入验证码", trigger: "blur"}
});
const form = reactive({
  email: "1792945133@qq.com",
  password: "admin123",
  code: ""
});
// 登录注册选项
const activeTab = ref("login"); // 默认激活的选项
const toggleTab = (tab: any) => {
  activeTab.value = tab;
};
// 弹窗开关
const centerDialogVisible = ref(false);
const open = async () => {
  centerDialogVisible.value = !centerDialogVisible.value;
};
defineExpose({open});
// 提交表单
const submitForm = async () => {
  // 校验表单
  if (!loginFormRef.value) return;
  const valid = await loginFormRef.value.validate();
  if (!valid) return;
  // 登录
  let data;
  if (activeTab.value === "login") {
    // 邮箱密码登录
    data = await loginMailPassword({mail: form.email, password: form.password});
  }else {
    // 注册
    data =  await loginMailCode({mail: form.email,password: form.password, code: form.code});
  }
  if (data) {
    // 保存token
    tokenStore.seTokenStore(data);
    // 获取用户信息
    const user = await getUserInfo();
    if (user) {
      userStore.setUserStore(user);
      // 发送操作成功的事件
      emit("success");
      centerDialogVisible.value = false;
      // 保存用户信息
      ElMessage.success("登录成功");
    }
  }
};
/** 提交表单 */
const emit = defineEmits(["success"]); // 定义 success 事件，用于操作成功后的回调

const codeActive = ref(false); // 是否发送验证码 默认没有发送
const countdown = ref(60); // 倒计时的秒数
// 发送验证码
const sendCodeHandler = async () => {
  if (codeActive.value) {return;}
  codeActive.value = true;
  // 开始倒计时
  const timer = setInterval(() => {
    countdown.value--; // 每秒减1
    if (countdown.value <= 0) {
      clearInterval(timer); // 清除计时器
      codeActive.value = false; // 将按钮设为可用
      countdown.value = 60; // 重置倒计时
    }
  }, 1000);
  // 发送验证码
  await sendCode({mail: form.email, scene: MailSceneEnum.MEMBER_REGISTER_LOGIN});
  ElMessage.success("验证码发送成功，请注意查收");
};
</script>
<style lang="scss" scoped>
@import "@/static/css/elementPlus";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css";

.login-dialog {
  background: rgba(var(--z-common-dialog-bg), .9);
  width: 25vw;
  min-width: 800px;
  padding: 0;

  .dialog-body {
    width: 80%;
    margin: 1.5vw 1.5vw 0 1.5vw;
  }

  input {
    padding: 0 !important;
    background-color: transparent;
    border: none;
    outline: none;
  }

  /*头部*/
  .my-header {
    display: flex;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    color: var(--z-action-color);

    div {
      padding: 10px;
    }
  }

  .underline {
    width: 105%;
    height: 1px; /* 横线的高度 */
    background-color: blue; /* 横线的颜色 */
    transition: all 0.7s; /* 动画效果 */
  }

  .active {
    color: blue; /* 激活状态下字体颜色 */
  }

  .active::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: blue; /* 激活状态下的横线 */
  }

  .dialog-footer {
    padding-bottom: 20px;
  }

}

.code_active {
  background: #ff4b2b !important;
  color: #fff !important;
}
/* 登录注册 */
h1 {
  font-weight: bold;
  font-size: 2em;
  margin: 0;
}

p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  display: block;
  margin: 15px 0;
}

.dowebok {
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container form {
  background: #fff;
  transform: translateY(45%);
  flex-direction: column;
  padding:  0 50px;
  text-align: center;
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container a:hover {
  background-color: #eee;
}

.form-container input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  outline: none;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:active {
  transform: scale(.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all .6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform .6s ease-in-out;
  z-index: 100;
}

.overlay-login {
  background: #ff416c;
  background: linear-gradient(to right, #ff4b2b, #ff416c) no-repeat 0 0 / cover;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);
}

.overlay-left {
  transform: translateY(-20%);
}

/* Move signin to right */
.dowebok.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

/* Move overlay to left */
.dowebok.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

/* Bring signup over signin */
.dowebok.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

/* Move overlay back to right */
.dowebok.right-panel-active .overlay-login {
  transform: translateX(50%);
}

/* Bring back the text to center */
.dowebok.right-panel-active .overlay-left {
  transform: translateY(0);
}

/* Same effect for right */
.dowebok.right-panel-active .overlay-right {
  transform: translateY(20%);
}
</style>