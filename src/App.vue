<template>
  <v-app>
    <div id="app">
      <div id="header">
        <figure><img src="@/assets/images/hero-background.svg"></figure>
        <h1>
          <span class="logo"></span>
          K8ssandra Configurator
        </h1>
      </div>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "app",
  metaInfo: {
      title: 'K8ssandra Config Builder',
      htmlAttrs: {
        lang: 'en',
      }
    }
};
</script>

<style lang="scss">
// Base styles.
:root {
  --color-brand-light-blue: #0097ff;
  --color-brand-dark-blue: #153d71;
  --color-brand-red: #f9305d;
  --color-brand-yellow: #fcf067;
  --color-brand-black: #02070d;
  --color-grey-light: #f4f6f8;
  --color-grey-medium: #b2becd;
  --color-grey-dark: #6f7a87;
  --color-white: #fff;

  --ff-usual: "usual", sans-serif;
  --ff-museoSans: "museo-sans", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0 8px;
  background: var(--color-brand-light-blue);

  @media screen and (max-width: 768px) {
    margin: 0;
  }
}

// Typography.
@font-face {
  font-family: "museo-sans";
  src: url("assets/fonts/MuseoSans_700-webfont.woff2");
  src: url("assets/fonts/MuseoSans_700-webfont.woff2") format("woff2"),
    url("assets/fonts/MuseoSans_700-webfont.woff") format("woff");
  font-display: swap;
  font-style: normal;
  font-weight: 700;
}

@font-face {
  font-family: "usual";
  src: url("assets/fonts/usual-regular-webfont.woff2");
  src: url("assets/fonts/usual-regular-webfont.woff2") format("woff2"),
    url("assets/fonts/usual-regular-webfont.woff") format("woff");
  font-display: swap;
  font-style: normal;
  font-weight: 400;
}

@font-face {
  font-family: "usual";
  src: url("assets/fonts/usual-bold-webfont.woff2");
  src: url("assets/fonts/usual-bold-webfont.woff2") format("woff2"),
    url("assets/fonts/usual-bold-webfont.woff") format("woff");
  font-display: swap;
  font-style: normal;
  font-weight: 700;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--ff-museoSans);
  font-weight: 700;
  letter-spacing: -1px;
}

h1 {
  font-size: 66px;
  line-height: 1.2;

  @media screen and (max-width: 768px) {
    font-size: 48px;
  }
}

h2 {
  font-size: 36px;
  line-height: 1.2;

  @media screen and (max-width: 768px) {
    font-size: 32px;
  }
}

h3 {
  font-size: 28px;
  line-height: 34px;

  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
}

h4 {
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -1.1px;
}

h5 {
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.9px;
}

// Elements re-used across components.
input[type="submit"],
.landing-page button,
.export .button,
.helm__container button,
.configurl__wrapper button {
  display: inline-block;
  position: relative;
  margin-top: 2px; // match half word-spacing
  margin-bottom: 2px; // match half word-spacing
  padding: 10px 20px;
  color: var(--color-brand-black);
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: 4px 4px 0 0 var(--color-brand-black);
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  line-height: 28px;
  background-color: var(--color-brand-red);
  transition: background-color 0.4s, border-color 0.4s, color 0.4s;

  &:hover {
    background-color: var(--color-brand-yellow);
    text-decoration: underline;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  }
}

.templates,
.helm__container {
  button {
    color: var(--color-white);
    border: 1px solid var(--color-white);
    -webkit-box-shadow: none;
    box-shadow: none;
    background-color: transparent;

    &:not(:last-of-type) {
      margin-right: 10px;
    }

    &:hover {
      background-color: var(--color-brand-yellow);
    }
  }
}

.separator {
  width: 100%;
  height: 32px;
  margin: 40px 0 30px;
  background-image: url('assets/images/light-waves.svg');
  background-repeat: repeat-x;

  .landing-page & {
    margin-bottom: 40px;
  }
}

.logo {
  position: relative;
  display: block;
  width: 50px;
  margin: 0 0 30px;
  background: no-repeat 50% 50% url('assets/images/logo.svg');
  background-size: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-indent: 100%;
  text-decoration: none;
  font-size: 0;

  #header & {
    margin: 0 auto 30px;
    background-image: url('data:image/svg+xml;utf8,<svg width="50" height="46" viewBox="0 0 50 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M45.2746 28.0897C45.4839 27.8913 45.8101 27.8913 46.0194 28.0897L49.8399 31.9707C49.94 32.07 49.9975 32.2049 50.0001 32.3464C49.9939 32.4887 49.934 32.6232 49.8325 32.7221C44.9102 37.5342 38.6281 40.6849 31.8543 41.7389V45.2179C31.8543 45.3631 31.7969 45.5022 31.6948 45.6045C31.5927 45.7067 31.4544 45.7637 31.3106 45.7627H22.072C21.7738 45.7627 21.5321 45.5188 21.5321 45.2179V41.7389C14.7568 40.6859 8.47322 37.5351 3.55011 32.7221C3.44755 32.6192 3.38989 32.4792 3.38989 32.3333C3.38989 32.1873 3.44755 32.0474 3.55011 31.9444L7.39301 28.071C7.60154 27.8706 7.92923 27.8706 8.13776 28.071C9.27033 29.167 10.4965 30.1602 11.8019 31.039C11.9218 31.1213 12.0695 31.1511 12.2115 31.1216C12.3524 31.0919 12.4765 31.0085 12.5578 30.8887L22.6641 15.5038C23.4062 14.3801 23.2105 12.8758 22.2061 11.9835C20.09 10.0987 19.3508 7.08953 20.3494 4.42589C21.348 1.76224 23.8761 0 26.6987 0C29.5214 0 32.0495 1.76224 33.0481 4.42589C34.0467 7.08953 33.3074 10.0987 31.1914 11.9835L31.1281 12.0436C31.0674 12.103 31.0483 12.1935 31.0797 12.2728C31.1096 12.3545 31.187 12.4086 31.2734 12.408H39.3315C39.4632 12.408 39.5699 12.5157 39.5699 12.6485V13.8019C39.5698 13.9353 39.676 14.044 39.8082 14.0461H46.2205C46.3521 14.0461 46.4588 14.1537 46.4588 14.2865V19.2796C46.4588 19.4124 46.3521 19.52 46.2205 19.52H39.8082C39.676 19.5221 39.5698 19.6308 39.5699 19.7642V20.9214C39.5699 21.0542 39.4632 21.1618 39.3315 21.1618H34.4497L40.8583 30.9075C40.9373 31.0279 41.0606 31.1117 41.2009 31.1404C41.3429 31.1703 41.4908 31.1405 41.6105 31.0578C42.9166 30.1799 44.1428 29.1867 45.2746 28.0897ZM30.2418 6.85881C30.2418 4.8897 28.6596 3.29342 26.7079 3.29342C24.7571 3.29549 23.1762 4.89056 23.1741 6.85881C23.1741 8.82793 24.7563 10.4242 26.7079 10.4242C28.6596 10.4242 30.2418 8.82793 30.2418 6.85881ZM15.3991 32.8686C15.3549 32.7144 15.3794 32.5485 15.4661 32.414L24.0791 19.2983C24.2122 19.0994 24.458 19.0109 24.6858 19.0798C24.9136 19.1486 25.0706 19.3589 25.0734 19.5989V35.5398C21.8345 35.3414 18.6579 34.5535 15.697 33.2142C15.5519 33.1492 15.4428 33.0226 15.3991 32.8686ZM37.7004 33.2143C37.8458 33.1485 37.9557 33.0224 38.0021 32.8687C38.0467 32.714 38.0208 32.5474 37.9313 32.4141L30.7072 21.406C30.6059 21.255 30.4375 21.1637 30.2567 21.1618H28.8677C28.7239 21.1618 28.586 21.2197 28.4846 21.3227C28.3832 21.4257 28.3268 21.5652 28.3278 21.7103V35.5399C31.5654 35.3414 34.7408 34.5535 37.7004 33.2143Z" fill="%23000"/><path d="M7.65364 8.00211C7.67271 7.7891 7.84838 7.62632 8.0582 7.6272C8.26736 7.62807 8.44204 7.78995 8.46277 8.00211L9.04387 13.1496C9.05881 13.2915 9.14524 13.4151 9.27189 13.4758C9.39802 13.5383 9.54694 13.5298 9.66542 13.4533L13.9759 10.709C14.1566 10.5671 14.416 10.6015 14.5551 10.7858C14.6943 10.9701 14.6605 11.2345 14.4797 11.3763L10.8938 15.0504C10.797 15.1481 10.7566 15.2899 10.7872 15.4253C10.8168 15.5649 10.9158 15.6787 11.0483 15.7252L15.8295 17.4498C16.0249 17.5202 16.1375 17.7287 16.0914 17.9346C16.0454 18.1406 15.8553 18.2787 15.6493 18.2559L10.6106 17.6748C10.4703 17.6583 10.3315 17.7163 10.2428 17.8285C10.1544 17.9402 10.1294 18.0907 10.1766 18.2259L11.8427 23.1222C11.9443 23.3292 11.8619 23.581 11.6588 23.6846C11.4557 23.7881 11.2087 23.7042 11.1071 23.4971L8.40024 19.0957C8.32639 18.9759 8.197 18.9035 8.0582 18.9045C7.91845 18.9037 7.78802 18.9758 7.71248 19.0957L4.99823 23.4784C4.89667 23.6854 4.64968 23.7693 4.44656 23.6658C4.24344 23.5623 4.1611 23.3105 4.26267 23.1034L5.93241 18.2259C5.97619 18.0904 5.9514 17.9416 5.86621 17.8285C5.77715 17.7169 5.63867 17.659 5.49842 17.6748L0.452417 18.2446C0.246414 18.2675 0.0563123 18.1293 0.0102669 17.9234C-0.0357784 17.7174 0.0768404 17.509 0.272202 17.4386L5.0534 15.714C5.18429 15.665 5.28236 15.5524 5.31453 15.4141C5.34198 15.2781 5.30051 15.1372 5.20419 15.0392L1.63301 11.3763C1.49257 11.2258 1.48254 10.9927 1.6095 10.8302C1.73647 10.6677 1.96153 10.6256 2.13687 10.7314L6.45098 13.4758C6.56947 13.5523 6.71838 13.5608 6.84451 13.4983C6.97023 13.4364 7.05623 13.3134 7.07254 13.1721L7.65364 8.00211Z" fill="%23000"/></svg>');

    @media screen and (max-width: 768px) {
      margin-bottom: 15px;
    }
  }

  &::before {
    content: '';
    display: block;
    padding-top: (100% * 46 / 50); // proportional based on width
  }
}

.v-tooltip + .v-icon.v-icon {
  margin-left: 5px;
  color: var(--color-brand-black);
  font-size: 14px;

  h3 &,
  h4 & {
    font-size: 14px;
    width: 25px;
    height: 25px;
    background: var(--color-brand-yellow);
    border-radius: 50%;

    @media screen and (max-width: 768px) {
      margin-left: 0;
    }
  }
}

.auth,
.provider__secure {
  display: flex;
  align-items: center;
  background: var(--color-grey-light);
  padding: 25px 20px;
  font-size: 14px;
  font-weight: 700;

  .v-input {
    margin-left: auto;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 20px;

    .v-input {
      margin-left: 0;
    }
  }
}

// App.
#app {
  font-family: var(--ff-usual);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-brand-light-blue);
  color: var(--color-brand-black);

  .v-tooltip__content {
    max-width: 290px;
    padding: 20px;
    background: var(--color-white);
    box-shadow: 10px 10px 20px rgb(0 0 0 / 20%);
    border-radius: 5px;
    font-size: 12px;
    line-height: 1.5;
    opacity: 1 !important;

    span {
      color: var(--color-brand-black);
    }
  }

  .v-menu__content {
    border-radius: 0;
  }
}

#header {
  position: fixed;
  background-color: var(--color-brand-light-blue);
  width:100%;
  text-align: center;
  padding: 74px 15px 46px;
  z-index: 2;

  @media screen and (max-width: 768px) {
    padding: 40px 15px 20px;
  }

  figure {
    position: absolute;
    top: 80px;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
}
</style>
