<template>
  <div class="footer-nav">
    <span @click="handleNavClick('prev')" class="footer-nav-link footer-nav-left" v-if="leftNav">
      <i class="el-icon-arrow-left"></i>
      {{ leftNav.title || leftNav.name }}
    </span>
    <span @click="handleNavClick('next')" class="footer-nav-link footer-nav-right" v-if="rightNav">
      {{ rightNav.title || rightNav.name }}
      <i class="el-icon-arrow-right"></i>
    </span>
  </div>
</template>

<style lang="scss">
.footer-nav {
  padding: 40px 0;
  color: #333;
  font-size: 14px;

  &::after {
    content: '';
    display: block;
    clear: both;
  }

  & i {
    transition: 0.3s;
    color: #999;
    vertical-align: baseline;
  }
}

.footer-nav-link {
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #409eff;

    & i {
      color: #409eff;
    }
  }
}

.footer-nav-left {
  float: left;
  margin-left: -4px;
}

.footer-nav-right {
  float: right;
  margin-right: -4px;
}
</style>

<script>
import navConfig from '../nav.config.json';

export default {
  data() {
    return {
      currentComponent: null,
      nav: [],
      currentIndex: -1,
      leftNav: null,
      rightNav: null
    };
  },

  computed: {
    lang() {
      return this.$route.meta.lang;
    }
  },

  watch: {
    '$route.path'() {
      this.setNav();
      this.updateNav();
    }
  },

  methods: {
    setNav() {
      let navs = navConfig[this.lang];
      let navsArray = [];
      navs.forEach(nav => {
        if (nav.children) {
          navsArray = navsArray.concat(nav.children);
        } else if (nav.groups) {
          nav.groups
            .map(group => group.list)
            .forEach(list => {
              navsArray = navsArray.concat(list);
            });
        }
      });
      this.nav = navsArray;
    },

    updateNav() {
      this.currentComponent = '/' + this.$route.path.split('/')[3];
      for (let i = 0, len = this.nav.length; i < len; i++) {
        if (this.nav[i].path === this.currentComponent) {
          this.currentIndex = i;
          break;
        }
      }
      this.leftNav = this.nav[this.currentIndex - 1];
      this.rightNav = this.nav[this.currentIndex + 1];
    },

    handleNavClick(direction) {
      this.$router.push(
        `/${this.lang}/component${
          direction === 'prev' ? this.leftNav.path : this.rightNav.path
        }`
      );
    }
  },

  created() {
    this.setNav();
    this.updateNav();
  }
};
</script>
