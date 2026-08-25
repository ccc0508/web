<template>
  <div class="complaint-page">
    <nav class="complaint-page__breadcrumb" aria-label="当前位置">
      <div class="site-container complaint-page__breadcrumb-inner">
        <span class="complaint-page__location" aria-hidden="true"></span>
        <span>当前位置</span>
        <RouterLink to="/">首页</RouterLink>
        <span>/</span>
        <span>监督投诉</span>
      </div>
    </nav>

    <main class="site-container complaint-page__main">
      <article class="complaint-article">
        <h1>监督投诉</h1>
        <div class="complaint-article__meta">
          <span>来源：本网</span>
          <span>时间：2023-08-21 11:11:12</span>
        </div>

        <div class="complaint-article__content">
          <section>
            <h2>一、政务咨询</h2>
            <p>咨询电话：0757-12345</p>
            <p>
              网上咨询：
              <a href="http://www.foshan.gov.cn/hdjlpt/zixun" rel="noopener noreferrer" target="_blank">
                http://www.foshan.gov.cn/hdjlpt/zixun
              </a>
            </p>
            <p>联系地址：佛山市禅城区岭南大道北12号11号楼，邮编：528000</p>
          </section>

          <section>
            <h2>二、政务投诉</h2>
            <p>对党组织、党员违反党的纪律行为以及监察对象职务违法、职务犯罪行为请向佛山市纪委监委反映。</p>
            <p>举报电话：0757-12388</p>
            <p>
              网上举报：
              <a href="https://guangdong.12388.gov.cn/foshanshi/" rel="noopener noreferrer" target="_blank">
                https://guangdong.12388.gov.cn/foshanshi/
              </a>
            </p>
          </section>
        </div>
      </article>
    </main>
  </div>
</template>

<style scoped lang="scss">
.complaint-page {
  min-height: 100vh;
  background: #f7f4f3;
  border-top: 3px solid #c9141d;

  &__breadcrumb {
    height: 52px;
    color: #3d3936;
    background: #fff;
    border-bottom: 1px solid #e4e8eb;
    font-size: 14px;
  }

  &__breadcrumb-inner {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 100%;
  }

  &__breadcrumb a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: var(--brand-red);
    }
  }

  &__location {
    position: relative;
    width: 12px;
    height: 12px;
    margin-right: 3px;
    background: #161616;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);

    &::after {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 4px;
      height: 4px;
      content: '';
      background: #fff;
      border-radius: 50%;
    }
  }

  &__main {
    padding: 0 0 26px;
    background: #fff;
  }
}

.complaint-article {
  min-height: 545px;
  padding: 58px 68px 66px;

  h1 {
    margin: 0;
    color: #111;
    font-size: 25px;
    line-height: 1.4;
    text-align: center;
  }

  &__meta {
    display: flex;
    gap: 72px;
    justify-content: center;
    margin-top: 17px;
    color: #111;
    font-size: 15px;
  }

  &__content {
    margin-top: 32px;
    color: #080808;
    font-size: 18px;
    line-height: 1.9;

    section + section {
      margin-top: 5px;
    }

    h2 {
      margin: 0 0 5px;
      font-size: 19px;
      font-weight: 700;
    }

    p {
      margin: 2px 0;
      text-indent: 2em;
    }

    a {
      color: #0000ee;
      text-decoration: underline;
      text-indent: 0;
    }
  }
}
</style>
